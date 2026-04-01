export function scrollToNextSection() {
  const root = document.getElementById('root')

  if (!root) {
    return
  }

  root.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

export function wrapIndex(value: number, length: number) {
  if (length === 0) {
    return 0
  }

  return ((value % length) + length) % length
}
