// data/mockData.js

export const DEMO_USER = {
  id: 'u1',
  name: 'Динара',
  email: 'demo@veya.app',
  password: 'demo123',
  avatar: null,
  role: 'owner'
}

export const DEMO_FAMILY = {
  id: 'f1',
  name: 'Семья Сейткали',
  createdAt: '2024-01-01'
}

export const DEMO_MEMBERS = [
  { id: 'u1', name: 'Динара',  role: 'owner',  avatar: null, status: 'active', email: 'dinara@veya.app' },
  { id: 'u2', name: 'Алдияр', role: 'parent', avatar: null, status: 'active', email: 'aldiyar@veya.app' },
  { id: 'u3', name: 'Мама',   role: 'member', avatar: null, status: 'active', email: 'mama@veya.app' },
  { id: 'u4', name: 'Тётя',   role: 'member', avatar: null, status: 'active', email: 'tetya@veya.app' },
  { id: 'u5', name: 'Бабушка',role: 'member', avatar: null, status: 'active', email: 'babushka@veya.app' }
]

export const DEMO_TASKS = [
  {
    id: 't1',
    title: 'Прийти в 19:00 посидеть с детьми',
    description: 'Тётя просит прийти на вечер, пока она на встрече.',
    creatorId: 'u4',
    assigneeId: 'u2',
    status: 'pending',
    priority: 'high',
    dueDate: getTodayStr(),
    dueTime: '19:00',
    repeat: null,
    createdAt: getDateStr(-1),
    history: [
      { date: getDateStr(-1), action: 'Задача создана', userId: 'u4' }
    ]
  },
  {
    id: 't2',
    title: 'Купить продукты',
    description: 'Молоко, хлеб, яйца, рис, фрукты.',
    creatorId: 'u1',
    assigneeId: 'u2',
    status: 'accepted',
    priority: 'medium',
    dueDate: getTodayStr(),
    dueTime: '18:00',
    repeat: null,
    createdAt: getDateStr(-2),
    history: [
      { date: getDateStr(-2), action: 'Задача создана', userId: 'u1' },
      { date: getDateStr(-1), action: 'Принята', userId: 'u2' }
    ]
  },
  {
    id: 't3',
    title: 'Записать маму к врачу',
    description: 'Позвонить в клинику и записаться на ближайшее время.',
    creatorId: 'u1',
    assigneeId: 'u3',
    status: 'done',
    priority: 'high',
    dueDate: getDateStr(-1),
    dueTime: '10:00',
    repeat: null,
    createdAt: getDateStr(-3),
    history: [
      { date: getDateStr(-3), action: 'Задача создана', userId: 'u1' },
      { date: getDateStr(-1), action: 'Выполнена', userId: 'u3' }
    ]
  },
  {
    id: 't4',
    title: 'Напомнить бабушке о лекарстве',
    description: 'Каждый день в 20:00.',
    creatorId: 'u1',
    assigneeId: 'u5',
    status: 'pending',
    priority: 'high',
    dueDate: getTodayStr(),
    dueTime: '20:00',
    repeat: 'daily',
    createdAt: getDateStr(-5),
    history: [
      { date: getDateStr(-5), action: 'Задача создана', userId: 'u1' }
    ]
  },
  {
    id: 't5',
    title: 'Оплатить коммуналку',
    description: 'Квартплата за текущий месяц.',
    creatorId: 'u1',
    assigneeId: 'u1',
    status: 'pending',
    priority: 'medium',
    dueDate: getDateStr(3),
    dueTime: null,
    repeat: 'monthly',
    createdAt: getDateStr(-1),
    history: [
      { date: getDateStr(-1), action: 'Задача создана', userId: 'u1' }
    ]
  },
  {
    id: 't6',
    title: 'Забрать заказ из магазина',
    description: 'Заказ №4821, адрес — пр. Абая 12.',
    creatorId: 'u2',
    assigneeId: 'u1',
    status: 'declined',
    priority: 'low',
    dueDate: getDateStr(-2),
    dueTime: '16:00',
    repeat: null,
    createdAt: getDateStr(-4),
    history: [
      { date: getDateStr(-4), action: 'Задача создана', userId: 'u2' },
      { date: getDateStr(-2), action: 'Отклонена', userId: 'u1' }
    ]
  },
  {
    id: 't7',
    title: 'Подготовить документы',
    description: 'Паспорт, справка с работы, копия ИИН.',
    creatorId: 'u1',
    assigneeId: 'u1',
    status: 'pending',
    priority: 'medium',
    dueDate: getDateStr(5),
    dueTime: null,
    repeat: null,
    createdAt: getDateStr(0),
    history: [
      { date: getDateStr(0), action: 'Задача создана', userId: 'u1' }
    ]
  },
  {
    id: 't8',
    title: 'Позвонить в клинику',
    description: 'Уточнить результаты анализов мамы.',
    creatorId: 'u1',
    assigneeId: 'u3',
    status: 'later',
    priority: 'high',
    dueDate: getTodayStr(),
    dueTime: '11:00',
    repeat: null,
    createdAt: getDateStr(0),
    history: [
      { date: getDateStr(0), action: 'Задача создана', userId: 'u1' },
      { date: getDateStr(0), action: 'Отложена', userId: 'u3' }
    ]
  }
]

export const DEMO_SHOPPING = [
  { id: 's1', name: 'Молоко',   qty: '2 л',    category: 'Молочное',   addedBy: 'u1', done: false },
  { id: 's2', name: 'Хлеб',    qty: '1 шт',   category: 'Выпечка',    addedBy: 'u2', done: false },
  { id: 's3', name: 'Яйца',    qty: '10 шт',  category: 'Молочное',   addedBy: 'u1', done: true  },
  { id: 's4', name: 'Рис',     qty: '1 кг',   category: 'Крупы',      addedBy: 'u3', done: false },
  { id: 's5', name: 'Фрукты',  qty: '2 кг',   category: 'Фрукты',     addedBy: 'u1', done: false },
  { id: 's6', name: 'Лекарства', qty: null,   category: 'Аптека',     addedBy: 'u1', done: false }
]

export const DEMO_REMINDERS = [
  {
    id: 'r1',
    title: 'Лекарство бабушки',
    time: '20:00',
    repeat: 'daily',
    assigneeId: 'u5',
    creatorId: 'u1',
    active: true
  },
  {
    id: 'r2',
    title: 'Оплата коммуналки',
    time: '10:00',
    repeat: 'monthly',
    assigneeId: 'u1',
    creatorId: 'u1',
    active: true
  },
  {
    id: 'r3',
    title: 'Тренировка Алдияра',
    time: '18:00',
    repeat: 'weekly',
    assigneeId: 'u2',
    creatorId: 'u1',
    active: true
  }
]

// ── Helpers ───────────────────────────────────────────────────────
function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}
function getDateStr(offsetDays) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}