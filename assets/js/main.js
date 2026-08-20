(function(){
  const nav=document.querySelector('.site-header .nav');
  const menu=document.querySelector('.menu-btn');
  if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
  const back=document.querySelector('.back-top');
  if(back){window.addEventListener('scroll',()=>back.classList.toggle('show',window.scrollY>500));back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
  document.querySelectorAll('[data-current]').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()|| (a.getAttribute('href')==='index.html'&&(!location.pathname.split('/').pop()||location.pathname.endsWith('/')))) a.classList.add('active');});
  const forms=document.querySelectorAll('form[data-mailto]');
  forms.forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const lines=[];for(const [k,v] of data.entries())lines.push(`${k}: ${v}`);const subject=encodeURIComponent(form.dataset.subject||'AVIVET Website Enquiry');const body=encodeURIComponent(lines.join('\n'));window.location.href=`mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;}));
})();
