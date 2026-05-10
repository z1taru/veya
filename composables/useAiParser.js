// composables/useAiParser.js
import { useFamilyStore } from '~/stores/family'

const PRODUCT_KEYWORDS = [
  'молоко','хлеб','яйца','рис','гречка','сахар','масло','соль','мука',
  'фрукты','овощи','мясо','курица','рыба','лекарства','шампунь','мыло',
  'картошка','морковь','лук','чеснок','кофе','чай','сок','вода'
]

const REPEAT_MAP = {
  'каждый день': 'daily', 'ежедневно': 'daily',
  'каждую неделю': 'weekly', 'еженедельно': 'weekly',
  'каждую пятницу': 'weekly', 'каждый понедельник': 'weekly',
  'каждый месяц': 'monthly', 'ежемесячно': 'monthly'
}

const PRIORITY_WORDS = { 'срочно': 'high', 'важно': 'high', 'срочный': 'high' }

function extractTime(text) {
  const m = text.match(/\b(\d{1,2})[:\s]?(\d{2})?\s*(утра|вечера|ночи|дня)?\b/)
  if (!m) {
    const shortM = text.match(/в\s+(\d{1,2})[:\s]?(\d{2})?/)
    if (shortM) {
      const h = shortM[1].padStart(2, '0')
      const min = (shortM[2] || '00')
      return `${h}:${min}`
    }
    return null
  }
  let h = parseInt(m[1])
  if (m[3] === 'вечера' && h < 12) h += 12
  if (m[3] === 'ночи' && h < 12) h += 12
  return `${String(h).padStart(2, '0')}:${m[2] || '00'}`
}

function extractDate(text) {
  const today = new Date()
  if (text.includes('завтра')) {
    const d = new Date(today); d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }
  if (text.includes('послезавтра')) {
    const d = new Date(today); d.setDate(d.getDate() + 2)
    return d.toISOString().split('T')[0]
  }
  return today.toISOString().split('T')[0]
}

function extractRepeat(text) {
  for (const [kw, val] of Object.entries(REPEAT_MAP)) {
    if (text.toLowerCase().includes(kw)) return val
  }
  return null
}

function extractProducts(text) {
  const lower = text.toLowerCase()
  const found = []
  for (const p of PRODUCT_KEYWORDS) {
    if (lower.includes(p)) found.push(p.charAt(0).toUpperCase() + p.slice(1))
  }
  // also grab "и X, и Y" patterns rudimentarily
  const listMatch = text.match(/добавь?\s+(.+?)(?:\s+в\s+покупки|$)/i)
  if (listMatch) {
    const parts = listMatch[1].split(/,\s*|\s+и\s+/)
    parts.forEach(p => {
      const clean = p.trim().replace(/[.,!?]/g, '')
      if (clean && !found.includes(clean)) found.push(clean)
    })
  }
  return [...new Set(found)]
}

function findAssignee(text, members) {
  if (!members) return null
  for (const m of members) {
    if (text.toLowerCase().includes(m.name.toLowerCase())) return m
  }
  return null
}

export function useAiParser() {
  function parse(text) {
    if (!text || text.trim().length < 3) return null
    const lower = text.toLowerCase()
    const family = useFamilyStore()
    const members = family.members || []

    // SHOPPING intent
    const isShopping =
      lower.includes('добавь') && (
        lower.includes('в покупки') ||
        lower.includes('купи') ||
        lower.includes('список') ||
        extractProducts(text).length > 0
      )

    if (isShopping) {
      const products = extractProducts(text)
      return {
        type: 'shopping',
        summary: products.length
          ? `Добавить в список покупок: ${products.join(', ')}`
          : 'Добавить товар в список покупок',
        items: products.length ? products : ['Товар'],
        raw: text
      }
    }

    // TASK / REMINDER intent
    const isTask = lower.includes('напомни') || lower.includes('задач') ||
                   lower.includes('попроси') || lower.includes('скажи')

    if (isTask) {
      const assignee = findAssignee(text, members)
      const time     = extractTime(text)
      const date     = extractDate(text)
      const repeat   = extractRepeat(text)
      const priority = Object.entries(PRIORITY_WORDS).find(([k]) => lower.includes(k))?.[1] || 'medium'

      // Build title: strip command word + name
      let title = text
        .replace(/^напомни\s+/i, '')
        .replace(/^попроси\s+/i, '')
      if (assignee) title = title.replace(new RegExp(assignee.name, 'i'), '').trim()
      title = title.replace(/\s+/g, ' ').trim()
      if (title.length > 60) title = title.slice(0, 60) + '…'

      return {
        type: 'task',
        summary: `Создать задачу: «${title}»`,
        title,
        assignee,
        dueDate: date,
        dueTime: time,
        repeat,
        priority,
        raw: text
      }
    }

    // Fallback — generic task
    return {
      type: 'task',
      summary: `Создать задачу: «${text.slice(0, 50)}»`,
      title: text.slice(0, 80),
      assignee: null,
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: null,
      repeat: null,
      priority: 'medium',
      raw: text
    }
  }

  return { parse }
}