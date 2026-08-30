// Advanced features for AVIVET website
(function() {
  console.log('Advanced.js loading...');

  // Particle system
  function createParticles() {
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(particle);
    }
  }

  // Aurora background
  function createAurora() {
    const aurora = document.createElement('div');
    aurora.className = 'aurora-bg';
    document.body.prepend(aurora);
  }

  // Dark mode toggle
  function createThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) {
      console.log('Theme toggle not found in HTML');
      return;
    }

    const sunIcon = toggle.querySelector('.sun');
    const moonIcon = toggle.querySelector('.moon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (sunIcon && moonIcon) {
        if (newTheme === 'dark') {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        } else {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        }
      }
    });
  }

  // Smart search functionality
  function createSmartSearch() {
    const searchTrigger = document.getElementById('searchTrigger');
    const searchPanel = document.getElementById('searchPanel');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const voiceSearch = document.getElementById('voiceSearch');
    const closeBtn = document.getElementById('searchClose');

    if (!searchTrigger || !searchPanel) {
      console.log('Search elements not found in HTML');
      return;
    }

    console.log('Search elements found, setting up functionality...');

    // Toggle search panel
    searchTrigger.addEventListener('click', () => {
      searchPanel.style.right = '0';
      searchInput.focus();
    });

    closeBtn.addEventListener('click', () => {
      searchPanel.style.right = '-400px';
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchPanel.contains(e.target) && !searchTrigger.contains(e.target)) {
        searchPanel.style.right = '-400px';
      }
    });

    // Load products for search
    let products = [];
    fetch('assets/data/products.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        console.log('Products loaded for search:', products.length);
      })
      .catch(error => {
        console.log('Error loading products:', error);
      });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        searchResults.innerHTML = filtered.map(p => `
          <div class="search-result-item" data-product="${p.name}">
            <strong>${p.name}</strong>
            <small>${p.category} - ${p.audience}</small>
          </div>
        `).join('');

        // Add click handlers
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const productName = item.dataset.product;
            window.location.href = `products.html?search=${encodeURIComponent(productName)}`;
          });
        });
      } else {
        searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
      }
    });

    // Voice search
    if (voiceSearch && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      voiceSearch.addEventListener('click', () => {
        recognition.start();
        voiceSearch.classList.add('listening');
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        searchInput.dispatchEvent(new Event('input'));
        voiceSearch.classList.remove('listening');
      };

      recognition.onerror = () => {
        voiceSearch.classList.remove('listening');
      };

      recognition.onend = () => {
        voiceSearch.classList.remove('listening');
      };
    } else if (voiceSearch) {
      voiceSearch.style.display = 'none';
    }
  }

  // Chat widget with WhatsApp integration
  function createChatWidget() {
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.innerHTML = `
      <button class="chat-button" aria-label="Open chat">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
      <div class="chat-window">
        <div class="chat-header">
          <h3>Chat with AVIVET</h3>
          <button class="chat-close">&times;</button>
        </div>
        <div class="chat-messages">
          <div class="chat-message bot">
            Hello! How can I help you with animal health products today?
          </div>
        </div>
        <div class="chat-input">
          <input type="text" placeholder="Type your message..." aria-label="Chat message">
          <button class="chat-send">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div class="chat-whatsapp">
          <a href="https://wa.me/918367455559" target="_blank" rel="noopener" class="btn btn-primary">
            Continue on WhatsApp
          </a>
        </div>
      </div>
    `;

    // Add chat widget styles
    const chatStyles = document.createElement('style');
    chatStyles.textContent = `
      .chat-header {
        padding: 20px;
        background: linear-gradient(135deg, #08783f 0%, #2f704d 100%);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .chat-header h3 {
        margin: 0;
        font-size: 1.1rem;
      }
      .chat-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
      }
      .chat-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }
      .chat-message {
        padding: 12px 16px;
        border-radius: 12px;
        margin-bottom: 12px;
        max-width: 80%;
      }
      .chat-message.bot {
        background: rgba(8, 120, 63, 0.1);
        color: var(--text);
      }
      .chat-message.user {
        background: var(--gradient-1);
        color: white;
        margin-left: auto;
      }
      .chat-input {
        padding: 15px;
        border-top: 1px solid var(--glass-border);
        display: flex;
        gap: 10px;
      }
      .chat-input input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: var(--glass-bg);
        color: var(--text);
      }
      .chat-input input:focus {
        outline: none;
        border-color: var(--primary);
      }
      .chat-send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--gradient-1);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .chat-whatsapp {
        padding: 15px;
        border-top: 1px solid var(--glass-border);
      }
      .chat-whatsapp .btn {
        width: 100%;
        border-radius: 10px;
      }
    `;
    document.head.appendChild(chatStyles);

    document.body.appendChild(widget);

    const chatButton = widget.querySelector('.chat-button');
    const chatWindow = widget.querySelector('.chat-window');
    const chatClose = widget.querySelector('.chat-close');
    const chatInput = widget.querySelector('.chat-input input');
    const chatSend = widget.querySelector('.chat-send');
    const chatMessages = widget.querySelector('.chat-messages');

    chatButton.addEventListener('click', () => {
      chatWindow.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });

    function sendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.textContent = message;
      chatMessages.appendChild(userMsg);
      chatInput.value = '';

      // Simulate bot response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        
        // Simple AI responses
        const responses = [
          "Thank you for your message! Our team will get back to you shortly.",
          "I'd be happy to help you with our poultry and cattle products. Would you like more information about any specific product?",
          "For detailed product information, please click the WhatsApp button below to chat with our team directly.",
          "Our products include feed supplements, vitamins, and medicines for poultry and cattle. What are you looking for?"
        ];
        
        botMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Scroll reveal animation
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.card, .section-head, .cta-box');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal', 'active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // Magnetic button effect
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }

  // 3D card effect
  function init3DCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // Product recommendation system
  function initRecommendations() {
    // Simple recommendation based on page content
    const pageContent = document.body.textContent.toLowerCase();
    let recommendations = [];

    fetch('assets/data/products.json')
      .then(response => response.json())
      .then(products => {
        if (pageContent.includes('poultry') || pageContent.includes('chicken')) {
          recommendations = products.filter(p => p.audience === 'Poultry').slice(0, 3);
        } else if (pageContent.includes('cattle') || pageContent.includes('livestock')) {
          recommendations = products.filter(p => p.audience === 'Cattle').slice(0, 3);
        } else {
          recommendations = products.slice(0, 3);
        }

        if (recommendations.length > 0 && !document.querySelector('.recommendation-section')) {
          const section = document.createElement('section');
          section.className = 'recommendation-section';
          section.innerHTML = `
            <div class="container">
              <div class="section-head">
                <span class="eyebrow">Recommended for you</span>
                <h2>Based on your interests</h2>
              </div>
              <div class="grid-3">
                ${recommendations.map(p => `
                  <a class="card" href="products.html?search=${encodeURIComponent(p.name)}">
                    <div class="product-art">
                      <img src="${p.image}" alt="${p.name}" style="width:100%;height:200px;object-fit:cover;border-radius:10px;">
                    </div>
                    <h3>${p.name}</h3>
                    <p>${p.description.substring(0, 100)}...</p>
                  </a>
                `).join('')}
              </div>
            </div>
          `;
          
          const ctaStrip = document.querySelector('.cta-strip');
          if (ctaStrip) {
            ctaStrip.before(section);
          }
        }
      })
      .catch(() => {});
  }

  // Animal health calculator
  function createHealthCalculator() {
    const calculatorSection = document.createElement('section');
    calculatorSection.className = 'health-calculator';
    calculatorSection.innerHTML = `
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Farming Tools</span>
          <h2>Animal Health Calculator</h2>
          <p>Calculate feed requirements and supplement dosages for your animals.</p>
        </div>
        <div class="calculator-grid">
          <div class="calculator-card glass">
            <h3>Feed Calculator</h3>
            <div class="form-group">
              <label>Animal Type</label>
              <select id="animalType">
                <option value="poultry">Poultry (Chicken)</option>
                <option value="cattle">Cattle</option>
                <option value="goat">Goat</option>
              </select>
            </div>
            <div class="form-group">
              <label>Number of Animals</label>
              <input type="number" id="animalCount" value="100" min="1">
            </div>
            <div class="form-group">
              <label>Age (days/months)</label>
              <input type="number" id="animalAge" value="30" min="1">
            </div>
            <button class="btn btn-primary" id="calculateFeed">Calculate</button>
            <div id="feedResult" class="calculator-result"></div>
          </div>
          <div class="calculator-card glass">
            <h3>Supplement Dosage</h3>
            <div class="form-group">
              <label>Product Type</label>
              <select id="supplementType">
                <option value="vitamins">Vitamins</option>
                <option value="minerals">Minerals</option>
                <option value="probiotics">Probiotics</option>
              </select>
            </div>
            <div class="form-group">
              <label>Body Weight (kg)</label>
              <input type="number" id="bodyWeight" value="50" min="1">
            </div>
            <div class="form-group">
              <label>Duration (days)</label>
              <input type="number" id="duration" value="7" min="1">
            </div>
            <button class="btn btn-primary" id="calculateDosage">Calculate</button>
            <div id="dosageResult" class="calculator-result"></div>
          </div>
        </div>
      </div>
    `;

    // Add calculator styles
    const calcStyles = document.createElement('style');
    calcStyles.textContent = `
      .health-calculator {
        padding: 80px 0;
        background: linear-gradient(135deg, rgba(8, 120, 63, 0.05) 0%, rgba(47, 112, 77, 0.05) 100%);
      }
      .calculator-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-top: 40px;
      }
      .calculator-card {
        padding: 30px;
      }
      .calculator-card h3 {
        margin-top: 0;
        color: var(--primary);
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--text);
      }
      .form-group select,
      .form-group input {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid var(--line);
        border-radius: 10px;
        background: var(--glass-bg);
        color: var(--text);
        font-size: 1rem;
      }
      .form-group select:focus,
      .form-group input:focus {
        outline: none;
        border-color: var(--primary);
      }
      .calculator-result {
        margin-top: 20px;
        padding: 15px;
        background: rgba(8, 120, 63, 0.1);
        border-radius: 10px;
        display: none;
      }
      .calculator-result.active {
        display: block;
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(calcStyles);

    const ctaStrip = document.querySelector('.cta-strip');
    if (ctaStrip) {
      ctaStrip.before(calculatorSection);
    }

    // Calculator functionality
    document.getElementById('calculateFeed').addEventListener('click', () => {
      const animalType = document.getElementById('animalType').value;
      const count = parseInt(document.getElementById('animalCount').value);
      const age = parseInt(document.getElementById('animalAge').value);
      
      let dailyFeedPerAnimal;
      switch(animalType) {
        case 'poultry':
          dailyFeedPerAnimal = age < 30 ? 0.05 : 0.12;
          break;
        case 'cattle':
          dailyFeedPerAnimal = age < 180 ? 2.5 : 5;
          break;
        case 'goat':
          dailyFeedPerAnimal = age < 90 ? 0.5 : 1.2;
          break;
      }
      
      const totalDailyFeed = (dailyFeedPerAnimal * count).toFixed(2);
      const monthlyFeed = (totalDailyFeed * 30).toFixed(2);
      
      const result = document.getElementById('feedResult');
      result.innerHTML = `
        <strong>Daily Feed Required:</strong> ${totalDailyFeed} kg<br>
        <strong>Monthly Feed Required:</strong> ${monthlyFeed} kg<br>
        <small>Recommendation: Use AVIVET feed supplements for optimal results.</small>
      `;
      result.classList.add('active');
    });

    document.getElementById('calculateDosage').addEventListener('click', () => {
      const supplementType = document.getElementById('supplementType').value;
      const weight = parseInt(document.getElementById('bodyWeight').value);
      const duration = parseInt(document.getElementById('duration').value);
      
      let dosagePerKg;
      switch(supplementType) {
        case 'vitamins':
          dosagePerKg = 0.1;
          break;
        case 'minerals':
          dosagePerKg = 0.05;
          break;
        case 'probiotics':
          dosagePerKg = 0.2;
          break;
      }
      
      const dailyDosage = (dosagePerKg * weight).toFixed(2);
      const totalDosage = (dailyDosage * duration).toFixed(2);
      
      const result = document.getElementById('dosageResult');
      result.innerHTML = `
        <strong>Daily Dosage:</strong> ${dailyDosage} g<br>
        <strong>Total Course Dosage:</strong> ${totalDosage} g<br>
        <small>Consult a veterinarian for precise dosing recommendations.</small>
      `;
      result.classList.add('active');
    });
  }

  // Register Service Worker for PWA
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }

  // Initialize all features
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing advanced features...');
    createParticles();
    createAurora();
    createThemeToggle();
    createSmartSearch();
    createChatWidget();
    initScrollReveal();
    initMagneticButtons();
    init3DCards();
    initRecommendations();
    registerServiceWorker();
    console.log('Advanced features initialized');
    
    // Only add calculator on main pages
    if (document.body.classList.contains('home-page') || location.pathname.endsWith('index.html')) {
      createHealthCalculator();
    }
  });

})();
