export function getInitials(value) {
  const name = String(value || 'User').trim() || 'User'
  return name.slice(0, 1).toUpperCase()
}

export function getUserDisplayName(user) {
  return user?.fullName || user?.name || user?.email || 'User'
}

export function getMemberDisplayName(member) {
  return member?.fullName || member?.user?.fullName || member?.name || member?.email || member?.user?.email || 'Member'
}

export function getMemberEmail(member) {
  return member?.email || member?.user?.email || ''
}

export function getFamilyDisplayName(family) {
  return family?.name || family?.familyName || 'Семья'
}
