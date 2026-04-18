const nodes = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.15});
nodes.forEach((n)=>io.observe(n));

const bg = document.querySelector('.parallax-bg');
function updateParallax(){
  if(!bg) return;
  const y = window.scrollY * 0.2;
  bg.style.transform = `translateY(${y}px) scale(1.08)`;
}
window.addEventListener('scroll', updateParallax, {passive:true});
updateParallax();
