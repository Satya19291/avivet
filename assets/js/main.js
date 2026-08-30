/**
 * AVIVET ANIMAL HEALTH - MAIN CONTROLLER
 * Core UI, Theme Toggle, Responsive Navigation & Global Modals
 */

(function() {
  'use strict';

  // --- Theme Management (Default Dark Mode) ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('avivet_theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('avivet_theme', nextTheme);
        updateThemeIcons(nextTheme);
      });
    });
  };

  const updateThemeIcons = (theme) => {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (sun && moon) {
        if (theme === 'dark') {
          sun.style.display = 'block';
          moon.style.display = 'none';
        } else {
          sun.style.display = 'none';
          moon.style.display = 'block';
        }
      }
    });
  };

  // --- Mobile Navigation Drawer ---
  const initNavigation = () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('open');
        menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
      });

      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
          navLinks.classList.remove('open');
          menuBtn.textContent = '☰';
        }
      });

      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navLinks.classList.remove('open');
          menuBtn.textContent = '☰';
        });
      });
    }

    // Active Link Highlighting
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // --- Back to Top Button ---
  const initBackToTop = () => {
    const backBtn = document.querySelector('.back-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // --- Contact & Enquiry Form Handlers ---
  const initForms = () => {
    document.querySelectorAll('form[data-mailto]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const lines = [];
        for (const [key, value] of formData.entries()) {
          if (value.trim()) {
            lines.push(`${key}: ${value}`);
          }
        }
        const subject = encodeURIComponent(form.dataset.subject || 'AVIVET Website Enquiry');
        const body = encodeURIComponent(lines.join('\n\n'));
        const mailtoUrl = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
        
        // Show success notification & redirect to email
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.textContent;
        submitBtn.textContent = 'Opening Email Client...';
        submitBtn.disabled = true;

        setTimeout(() => {
          window.location.href = mailtoUrl;
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
        }, 600);
      });
    });
  };

  // --- Request Details Modal Handler ---
  const initRequestModal = () => {
    let modal = document.querySelector('.request-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'request-modal';
      modal.innerHTML = `
        <div class="request-modal-box" role="dialog" aria-modal="true" aria-labelledby="requestModalTitle">
          <button class="request-close" type="button" aria-label="Close modal">&times;</button>
          <span class="eyebrow">Product Enquiry</span>
          <h2 id="requestModalTitle">Request Product Details</h2>
          <p class="request-product"></p>
          <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px;">
            Connect directly with an AVIVET veterinary specialist or distributor coordinator:
          </p>
          <div class="request-actions">
            <a class="btn btn-primary request-whatsapp" href="#" target="_blank" rel="noopener">
              💬 Instant WhatsApp
            </a>
            <a class="btn btn-outline request-email" href="#">
              ✉ Email Enquiry
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const closeModal = () => modal.classList.remove('open');
    modal.querySelector('.request-close')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.request-details');
      if (!btn) return;
      
      const productName = btn.dataset.product || 'AVIVET Product';
      const cleanName = encodeURIComponent(productName);
      const subject = encodeURIComponent(`Product Inquiry: ${productName}`);
      const body = encodeURIComponent(`Hello AVIVET Team,\n\nI am interested in receiving technical literature, bulk pricing, and availability details for "${productName}".\n\nPlease share the catalogue.\n\nThank you.`);

      modal.querySelector('.request-product').textContent = productName;
      modal.querySelector('.request-email').href = `mailto:avivetanimanlhealth@gmail.com?subject=${subject}&body=${body}`;
      modal.querySelector('.request-whatsapp').href = `https://wa.me/918367455559?text=${body}`;
      modal.classList.add('open');
    });
  };

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initBackToTop();
    initForms();
    initRequestModal();
  });
})();
