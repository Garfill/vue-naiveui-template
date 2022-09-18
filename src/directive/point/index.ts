// 元素上鼠标光标移动追踪
// 模仿 Fleet(https://www.jetbrains.com/fleet/) 官网效果

const posMap = new Map()

function caculatePos(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
  }
}

function cachePos(el: HTMLElement) {
  const pos = caculatePos(el)
  posMap.set(el, pos)
  return pos
}

function getPos(el:HTMLElement) {
  let pos = posMap.get(el)
  if (!pos) {
    pos = cachePos(el)
  }
  return pos
}


export default {
  mounted(el: HTMLElement) {
    cachePos(el)
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mousemove', handleMouseMove)
    el.removeEventListener('mouseleave', handleMouseLeave)
  },
}

function handleMouseEnter(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  cachePos(el)
  handleMouseMove(e)
}


function handleMouseMove(e: MouseEvent) {
  const x = e.clientX
  const y = e.clientY
  const el = e.currentTarget as HTMLElement
  const pos = getPos(el)
  const renderX = x - pos.x
  const renderY = y - pos.y
  const radius = el.getAttribute('gradient-radius') || 50
  setStyle(
    el,
    'background-image',
    `radial-gradient(circle at ${renderX}px ${renderY}px, rgba(230, 100, 101, 1) 0%, rgba(230, 100, 101, 0) calc(0% + ${radius}px))`
  )
}

function handleMouseLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.cssText = ''
}


function setStyle(el: HTMLElement, prop: string, value: string) {
  el.style.setProperty(prop, value)
}
