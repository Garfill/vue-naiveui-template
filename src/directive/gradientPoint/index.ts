// 仿 jetbrain/fleet 官网的移动
export default {
  mounted(el: HTMLElement) {
    el.addEventListener('mousemove', (e) => handleMouseMove(e, el));
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mousemove', (e) => handleMouseMove(e, el));
  },
};


function handleMouseMove(e: MouseEvent, el: HTMLElement) {
  const { clientX: x, clientY: y} = e;
  setStyle(
    el, 
    'background', 
    `radial-gradient(circle at ${x}px ${y}px, rgba(230, 100, 101, 1) 0%, rgba(230, 100, 101, 0) calc(0% + 30px)) no-repeat border-box border-box`);
}

function setStyle(el: HTMLElement, prop: string, value: string) {
  el.style.background = value;
}
