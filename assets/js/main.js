(function(){
  const premiumStyles=document.createElement('link');
  premiumStyles.rel='stylesheet';
  premiumStyles.href='assets/css/premium.css';
  document.head.appendChild(premiumStyles);

  const poultryPhoto='https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=85';
  const cattlePhoto='https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=85';
  document.querySelectorAll('img[src*="hero-animals"],img[src*="category-poultry"],img[src*="poultry-vitamins"]').forEach(image=>{
    image.src=poultryPhoto;
    image.alt='Chickens on a farm';
  });
  document.querySelectorAll('img[src*="category-cattle"],img[src*="livestock-tonic"]').forEach(image=>{
    image.src=cattlePhoto;
    image.alt='Cattle in a field';
  });

  const productGrid=document.querySelector('.product-card')?.parentElement;
  if(productGrid){
    const filterBar=document.createElement('div');
    filterBar.className='product-filters';
    filterBar.innerHTML='<button class="product-filter active" data-filter="all">All Products</button><button class="product-filter" data-filter="Poultry">Poultry Products</button><button class="product-filter" data-filter="Cattle">Veterinary Products</button>';
    productGrid.parentElement.insertBefore(filterBar,productGrid);
    fetch('assets/data/products.json')
      .then(response=>response.json())
      .then(products=>{
        const renderProducts=filter=>{
          const visibleProducts=filter==='all'?products:products.filter(product=>product.audience===filter);
          productGrid.innerHTML=visibleProducts.map(product=>{const images=product.images||[product.image]; return `<article class="card product-card"><div class="product-art product-image-gallery">${images.map((image,index)=>`<button class="product-image-button" type="button" data-image="${image}" data-name="${product.name}"><img src="${image}" alt="View ${product.name} image ${index+1}"></button>`).join('')}</div><div class="product-meta"><span>${product.audience}</span><span>${product.category}</span></div><h3>${product.name}</h3><p>${product.description}</p><button class="btn btn-outline request-details" type="button" data-product="${product.name}">Request Details</button></article>`;}).join('');
        };
        const requestedFilter=new URLSearchParams(location.search).get('category');
        const initialFilter=products.some(product=>product.audience===requestedFilter)?requestedFilter:'all';
        renderProducts(initialFilter);
        filterBar.querySelectorAll('.product-filter').forEach(button=>{
          if(button.dataset.filter===initialFilter){
            filterBar.querySelector('.active').classList.remove('active');
            button.classList.add('active');
          }
          button.addEventListener('click',()=>{
            filterBar.querySelectorAll('.product-filter').forEach(item=>item.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
          });
        });
      })
      .catch(()=>{});
  }

  const requestModal=document.createElement('div');
  requestModal.className='request-modal';
  requestModal.innerHTML='<div class="request-modal-box" role="dialog" aria-modal="true" aria-labelledby="request-title"><button class="request-close" type="button" aria-label="Close request options">&times;</button><span class="eyebrow">Product enquiry</span><h2 id="request-title">Request product details</h2><p class="request-product"></p><div class="request-actions"><a class="btn btn-primary request-email" href="#">Request by Gmail</a><a class="btn btn-outline request-whatsapp" href="#" target="_blank" rel="noopener">Request by WhatsApp</a></div></div>';
  document.body.appendChild(requestModal);
  const closeRequestModal=()=>requestModal.classList.remove('open');
  requestModal.querySelector('.request-close').addEventListener('click',closeRequestModal);
  requestModal.addEventListener('click',event=>{if(event.target===requestModal)closeRequestModal();});
  document.addEventListener('click',event=>{
    const requestButton=event.target.closest('.request-details');
    if(!requestButton)return;
    const product=requestButton.dataset.product;
    const subject=encodeURIComponent(`Product enquiry: ${product}`);
    const message=encodeURIComponent(`Hello AVIVET, I would like details about ${product}.`);
    requestModal.querySelector('.request-product').textContent=product;
    requestModal.querySelector('.request-email').href=`mailto:avivetanimanlhealth@gmail.com?subject=${subject}&body=${message}`;
    requestModal.querySelector('.request-whatsapp').href=`https://wa.me/918367455559?text=${message}`;
    requestModal.classList.add('open');
  });

  const imageModal=document.createElement('div');
  imageModal.className='image-modal';
  imageModal.innerHTML='<div class="image-modal-box" role="dialog" aria-modal="true"><button class="image-back" type="button">← Back</button><img class="image-modal-preview" alt=""><h2 class="image-modal-title"></h2></div>';
  document.body.appendChild(imageModal);
  const closeImageModal=()=>imageModal.classList.remove('open');
  imageModal.querySelector('.image-back').addEventListener('click',closeImageModal);
  imageModal.addEventListener('click',event=>{if(event.target===imageModal)closeImageModal();});
  document.addEventListener('click',event=>{
    const imageButton=event.target.closest('.product-image-button');
    if(!imageButton)return;
    const preview=imageModal.querySelector('.image-modal-preview');
    preview.src=imageButton.dataset.image;
    preview.alt=imageButton.dataset.name;
    imageModal.querySelector('.image-modal-title').textContent=imageButton.dataset.name;
    imageModal.classList.add('open');
  });

  if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){
    fetch('assets/data/products.json')
      .then(response=>response.json())
      .then(products=>{
        const section=document.createElement('section');
        section.className='home-products';
        section.innerHTML=`<div class="container"><div class="section-head"><span class="eyebrow">From the catalogue</span><h2>Explore our products</h2></div><div class="product-rail">${products.map(product=>`<a class="mini-product" href="products.html?category=${product.audience}"><img src="${product.image}" alt="${product.name}"><span>${product.name}</span><small>${product.audience}</small></a>`).join('')}</div></div>`;
        document.querySelector('.cta-strip')?.before(section);
      })
      .catch(()=>{});
  }

  const nav=document.querySelector('.site-header .nav');
  const menu=document.querySelector('.menu-btn');
  if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
  const back=document.querySelector('.back-top');
  if(back){window.addEventListener('scroll',()=>back.classList.toggle('show',window.scrollY>500));back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
  document.querySelectorAll('[data-current]').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()|| (a.getAttribute('href')==='index.html'&&(!location.pathname.split('/').pop()||location.pathname.endsWith('/')))) a.classList.add('active');});
  const forms=document.querySelectorAll('form[data-mailto]');
  forms.forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const lines=[];for(const [k,v] of data.entries())lines.push(`${k}: ${v}`);const subject=encodeURIComponent(form.dataset.subject||'AVIVET Website Enquiry');const body=encodeURIComponent(lines.join('\n'));window.location.href=`mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;}));
})();
