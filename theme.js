const nodes = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
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

function syncCartCount(){
  const countNode = document.getElementById('cartCount');
  if(!countNode) return;
  try{
    const cart = JSON.parse(localStorage.getItem('zaiqaCart') || '[]');
    const total = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    countNode.textContent = String(total);
  }catch(_err){
    countNode.textContent = '0';
  }
}

function goToHomeCart(){
  window.location.href = 'index.html#menu';
}

const mainNav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');

function closeNavMenu(){
  if(!mainNav || !navToggle) return;
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function setupNavToggle(){
  if(!mainNav || !navToggle) return;
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeNavMenu);
  });

  window.addEventListener('resize', () => {
    if(window.innerWidth > 720){
      closeNavMenu();
    }
  });
}

function updateNavState(){
  if(!mainNav) return;
  if(window.scrollY > 8){
    mainNav.classList.add('scrolled');
  }else{
    mainNav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavState, {passive:true});
updateNavState();
setupNavToggle();
syncCartCount();
