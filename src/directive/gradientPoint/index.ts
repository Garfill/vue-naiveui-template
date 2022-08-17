// 元素上鼠标光标移动追踪

let isMoving = false;
const posMap = new Map();

export default {
  mounted(el: HTMLElement) {
    const pos = getPos(el);
    posMap.set(el, pos);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mousemove', handleMouseMove);
    el.removeEventListener('mouseleave', handleMouseLeave);
  },
};


function handleMouseMove(e: MouseEvent) {
  isMoving = true;
  const el = e.currentTarget as HTMLElement;
  const radius = el.getAttribute('gradient-radius') || 50;
  const { pageX, pageY } = e;
  const { x, y } = posMap.get(el);
  const renderX = pageX - x;
  const renderY = pageY - y;
  setStyle(
    el,
    'background-image',
    `radial-gradient(circle at ${renderX}px ${renderY}px, rgba(230, 100, 101, 1) 0%, rgba(230, 100, 101, 0) calc(0% + ${radius}px))`
  );
}

function handleMouseLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  el.style.cssText = '';
  isMoving = false;
}


function setStyle(el: HTMLElement, prop: string, value: string) {
  el.style.setProperty(prop, value);
}

function getPos(el: HTMLElement) {
  let x = 0, y = 0;

  while (el !== document.documentElement) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.parentElement as HTMLElement;
  }


  return { x, y };
}