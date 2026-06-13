document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile navigation menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking nav link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }

  // 3. Homepage Crop Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
        accItem.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion item by default
  const firstAccordion = document.querySelector('.accordion-item');
  if (firstAccordion) {
    firstAccordion.classList.add('active');
    const firstContent = firstAccordion.querySelector('.accordion-content');
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  // 4. Products Filter Logic (on products.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-grid .product-card');
  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Contact Form Simulation (on contact.html)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const statusDiv = document.querySelector('.form-status');

      if (!name || !email || !subject || !message) {
        statusDiv.className = 'form-status error';
        statusDiv.textContent = 'Please fill out all required fields.';
        return;
      }

      // Simulate network request
      statusDiv.className = 'form-status success';
      statusDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
      contactForm.reset();
    });
  }

  // 6. Newsletter Form Simulation (on footer/homepage)
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing! We have added ${emailInput.value} to our newsletter list.`);
        form.reset();
      }
    });
  });

  // 7. Dynamic Sliders Generation (on gallery.html)
  // We dynamically load placeholders and real agricultural images to avoid 75 long manual lines
  const meetingsContainer = document.getElementById('meetings-slides');
  const activitiesContainer = document.getElementById('activities-slides');
  
  const categoriesInfo = {
    meetings: {
      count: 40,
      title: "Meetings & Training Session",
      images: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595841696660-1d8f74a8a65f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop"
      ]
    },
    activities: {
      count: 35,
      title: "Agricultural Activity",
      images: [
        "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=600&auto=format&fit=crop"
      ]
    }
  };

  const createSlides = (container, type) => {
    if (!container) return;
    const info = categoriesInfo[type];
    
    // We will render items as a grid of gallery items
    for (let i = 1; i <= info.count; i++) {
      // Rotate the 4 high quality images for mockup
      const imgUrl = info.images[(i - 1) % info.images.length];
      const col = document.createElement('div');
      col.className = 'gallery-item';
      col.setAttribute('data-category', type);
      col.setAttribute('data-index', i);
      col.innerHTML = `
        <img src="${imgUrl}" alt="${info.title} ${i}">
        <div class="gallery-item-overlay">
          <i class="fas fa-search-plus"></i>
          <h4>${info.title} #${i}</h4>
          <p>Click to view larger image</p>
        </div>
      `;
      container.appendChild(col);
    }
  };

  createSlides(meetingsContainer, 'meetings');
  createSlides(activitiesContainer, 'activities');

  // 8. Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryItems = [];
  let currentActiveIndex = 0;

  if (lightbox) {
    document.body.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        const category = item.getAttribute('data-category');
        currentGalleryItems = Array.from(document.querySelectorAll(`.gallery-item[data-category="${category}"]`));
        currentActiveIndex = currentGalleryItems.indexOf(item);
        
        openLightbox();
        updateLightboxContent();
      }
    });

    const openLightbox = () => {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    const updateLightboxContent = () => {
      if (currentGalleryItems.length === 0) return;
      const activeItem = currentGalleryItems[currentActiveIndex];
      const img = activeItem.querySelector('img');
      const caption = activeItem.querySelector('h4').textContent;
      
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption;
    };

    const showPrev = () => {
      currentActiveIndex = (currentActiveIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
      updateLightboxContent();
    };

    const showNext = () => {
      currentActiveIndex = (currentActiveIndex + 1) % currentGalleryItems.length;
      updateLightboxContent();
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Close on clicking backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
});
