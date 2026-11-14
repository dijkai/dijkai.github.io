// particle network
(()=>{
  const c=document.getElementById('net'),x=c.getContext('2d');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let w,h,P=[],mouse={x:-9999,y:-9999};
  function size(){const d=devicePixelRatio||1;w=innerWidth;h=innerHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);
    P=Array.from({length:Math.min(90,Math.floor(w*h/16000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,a:Math.random()<.12}))}
  addEventListener('resize',size);
  addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
  function draw(){
    x.clearRect(0,0,w,h);
    for(const p of P){
      if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1}
      x.beginPath();x.arc(p.x,p.y,p.a?2.2:1.4,0,6.283);x.fillStyle=p.a?'#F28C28':'#5FA8D3';x.fill();
    }
    for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){
      const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<140){x.strokeStyle=`rgba(95,168,211,${.22*(1-d/140)})`;x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}
    }
    for(const p of P){const d=Math.hypot(p.x-mouse.x,p.y-mouse.y);
      if(d<180){x.strokeStyle=`rgba(242,140,40,${.5*(1-d/180)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(mouse.x,mouse.y);x.stroke()}}
    if(!reduce)requestAnimationFrame(draw)
  }
  size();draw();
})();
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// count-up
document.querySelectorAll('[data-n]').forEach(el=>{
  const t=+el.dataset.n,s=el.dataset.s||'',t0=performance.now();
  (function f(n){const k=Math.min(1,(n-t0)/1400);el.textContent=Math.round(t*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0);
});
// card spotlight
document.querySelectorAll('.card').forEach(c=>c.addEventListener('pointermove',e=>{
  const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
