// Pre-loader and Initial Load
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('loaded');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }, 1000);
  }
});

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const interactables = document.querySelectorAll('a, button, .product-card, .brand-item');
  interactables.forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// Magnetic Effect for Buttons
const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .btn-secondary, .mobile-toggle');
magneticElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = `translate(0, 0)`;
  });
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-list a');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (nav) nav.classList.remove('active');
  });
});

// Header Scroll Logic
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Page Transition (Fade Out)
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !link.target) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  });
});

// URL Parameter for Product Pre-fill
const urlParams = new URLSearchParams(window.location.search);
const productParam = urlParams.get('product');
const messageArea = document.querySelector('textarea');
if (productParam && messageArea) {
  messageArea.value = `Hola, estoy interesado en recibir más información y una cotización sobre: ${productParam}.`;
}

// Contact Form functionality
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    
    submitBtn.classList.add('loading');
    submitBtn.innerText = 'Enviando...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        successModal.classList.add('active');
        contactForm.reset();
      } else {
        alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.innerText = 'Enviar Mensaje';
    }
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => successModal.classList.remove('active'));
}

if (successModal) {
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) successModal.classList.remove('active');
  });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.product-card, .brand-item, .testimonial-card, .section-header');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach((el, index) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(index % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// Subtle Parallax Effect for Section Images
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const parallaxImages = document.querySelectorAll('.about-img img, .hero-bg img');
  parallaxImages.forEach(img => {
    const speed = 0.2;
    img.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Specialized Modules Modal Logic
const initModules = () => {
  const moduleModal = document.getElementById('moduleModal');
  const closeModuleModal = document.getElementById('closeModuleModal');
  const moduleItems = document.querySelectorAll('.module-item');
  
  if (!moduleModal || moduleItems.length === 0) return;

  const moduleData = {
    denture: {
      title: 'Denture Module',
      desc: 'La solución definitiva para la fabricación automatizada de prótesis totales. Este módulo simplifica los flujos de trabajo complejos, permitiendo una producción masiva con calidad constante.',
      features: [
        'Posicionamiento automático de arcadas dentales',
        'Gestión de materiales específicos para bases y dientes',
        'Reducción de hasta un 60% en tiempo de fresado',
        'Integración total con cualquier escáner de laboratorio'
      ],
      icon: '<svg viewBox="0 0 24 24" class="module-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
    },
    model: {
      title: 'Model Module',
      desc: 'Transforma tus impresiones digitales en modelos físicos de alta precisión. Ideal para laboratorios que requieren validación física con muñones desmontables y ajuste perfecto.',
      features: [
        'Creación de modelos con muñones desmontables (Geller)',
        'Ajuste micrométrico de parámetros de impresión/fresado',
        'Soporte para bases articuladas',
        'Optimización de material para modelos huecos'
      ],
      icon: '<svg viewBox="0 0 24 24" class="module-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H8v-2h4V7h2v4h4v2h-4v4z"/></svg>'
    },
    splint: {
      title: 'Splint Module',
      desc: 'Diseñado específicamente para la fabricación de dispositivos removibles. Garantiza un ajuste pasivo y una durabilidad excepcional en cada pieza fabricada.',
      features: [
        'Cálculo automático de la zona de socavado',
        'Estrategias de fresado de alta velocidad para resinas claras',
        'Diseño optimizado para protectores deportivos y quirúrgicos',
        'Compensación automática de la herramienta de fresado'
      ],
      icon: '<svg viewBox="0 0 24 24" class="module-icon"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v4h2v-4h4V9h-4V5h-2v4H7v2h4z"/></svg>'
    }
  };

  const openModal = (key) => {
    const data = moduleData[key];
    if (!data) return;

    const titleEl = document.getElementById('moduleModalTitle');
    const descEl = document.getElementById('moduleModalDesc');
    const iconEl = document.getElementById('moduleModalIcon');
    const featuresUl = document.getElementById('moduleModalFeatures');
    const contactLink = document.getElementById('moduleContactLink');

    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.desc;
    if (iconEl) iconEl.innerHTML = data.icon;
    
    if (featuresUl) {
      featuresUl.innerHTML = '';
      data.features.forEach(f => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>•</strong> ${f}`;
        featuresUl.appendChild(li);
      });
    }
    
    if (contactLink) {
      contactLink.href = `index.html?product=MillBox+${data.title.replace(/ /g, '+')}#contacto_form`;
    }
    
    moduleModal.classList.add('active');
  };

  moduleItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const key = item.getAttribute('data-module');
      openModal(key);
    });
  });

  if (closeModuleModal) {
    closeModuleModal.addEventListener('click', (e) => {
      e.stopPropagation();
      moduleModal.classList.remove('active');
    });
  }

  moduleModal.addEventListener('click', (e) => {
    if (e.target === moduleModal) moduleModal.classList.remove('active');
  });
};

initModules();

// FAQ Accordion Logic
const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others for a clean look
        faqItems.forEach(other => other.classList.remove('active'));
        // Toggle current
        if (!isActive) item.classList.add('active');
      });
    }
  });
};

initFAQ();

// Re-initialize hover effects for new elements
const initNewInteractables = () => {
  const newInteractables = document.querySelectorAll('.faq-item, .whatsapp-float');
  newInteractables.forEach(item => {
    item.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
    item.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
  });
};

initNewInteractables();

