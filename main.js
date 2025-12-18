// ============================================
// BeeKind Wrap - Main JavaScript
// ============================================



// Mobile Navigation Toggle
// document.addEventListener('DOMContentLoaded', function() {
//   const navToggle = document.querySelector('.nav-toggle');
//   const navLinks = document.querySelector('.nav-links');

//   if (navToggle) {
//     navToggle.addEventListener('click', function() {
//       navToggle.classList.toggle('active');
//       navLinks.classList.toggle('active');
//     });

//     // Close menu when a link is clicked
//     const links = navLinks.querySelectorAll('a');
//     links.forEach(link => {
//       link.addEventListener('click', function() {
//         navToggle.classList.remove('active');
//         navLinks.classList.remove('active');
//       });
//     });

    
//   }

//   // Smooth scroll for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//       const href = this.getAttribute('href');
//       if (href !== '#') {
//         e.preventDefault();
//         const target = document.querySelector(href);
//         if (target) {
//           target.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//           });
//         }
//       }
//     });
//   });


//   document.querySelectorAll('.has-dropdown > a').forEach(link => {
//     link.addEventListener('click', function (e) {
//       if (window.innerWidth <= 768) {
//         e.preventDefault();
//         this.parentElement.classList.toggle('active');
//       }
//     });
//   });



//   // Add to Cart functionality
//   const addToCartButtons = document.querySelectorAll('.add-to-cart');
//   addToCartButtons.forEach(button => {
//     button.addEventListener('click', function(e) {
//       e.preventDefault();
//       const productName = this.getAttribute('data-product');
//       const productPrice = this.getAttribute('data-price');
      
//       // Show success message
//       showNotification(`${productName} added to cart!`, 'success');
      
//       // Add to cart (localStorage)
//       addToCart(productName, productPrice);
      
//       // Update cart count
//       updateCartCount();
//     });
//   });

//   // Initialize animations on scroll
//   initializeScrollAnimations();

//   // Newsletter form
//   const newsletterForm = document.querySelector('.newsletter-form');
//   if (newsletterForm) {
//     newsletterForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       const email = this.querySelector('input[type="email"]').value;
//       if (email) {
//         showNotification('Thank you for subscribing!', 'success');
//         this.reset();
//       }
//     });
//   }

//   // Contact form
//   const contactForm = document.querySelector('.contact-form');
//   if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       const name = this.querySelector('input[name="name"]').value;
//       if (name) {
//         showNotification('Thank you! We\'ll get back to you soon.', 'success');
//         this.reset();
//       }
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Toggle main menu on mobile
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Dropdown links
  const dropdownLinks = document.querySelectorAll('.has-dropdown > a');

  dropdownLinks.forEach(link => {
    const parentLi = link.parentElement;

    // Hover: show dropdown
    link.addEventListener('mouseenter', function() {
      parentLi.classList.add('active');
    });
    link.addEventListener('mouseleave', function() {
      parentLi.classList.remove('active');
    });

    // Click: navigate مباشرة (لا تمنع)
    link.addEventListener('click', function() {
      // لا شيء هنا، الضغط يذهب مباشرة للرابط
    });
  });
});


// Shopping Cart Functions
function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.querySelector('.cart-count');
  
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    if (cartCount > 0) {
      cartBadge.style.display = 'inline-block';
    }
  }
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Create styles for notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 300px;
  `;
  
  if (type === 'success') {
    notification.style.backgroundColor = '#27ae60';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#e74c3c';
    notification.style.color = 'white';
  } else {
    notification.style.backgroundColor = '#3498db';
    notification.style.color = 'white';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.getAttribute('data-animation') + ' 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-animation attribute
  document.querySelectorAll('[data-animation]').forEach(el => {
    observer.observe(el);
  });
}

// Product Filter (if needed on shop page)
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach(product => {
    if (category === 'all' || product.getAttribute('data-category') === category) {
      product.style.display = 'block';
      setTimeout(() => {
        product.style.opacity = '1';
      }, 10);
    } else {
      product.style.opacity = '0';
      setTimeout(() => {
        product.style.display = 'none';
      }, 300);
    }
  });
}

// Image Lazy Loading
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize on page load
window.addEventListener('load', function() {
  updateCartCount();
  lazyLoadImages();
});

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(400px);
    }
  }
`;
document.head.appendChild(style);



document.addEventListener('DOMContentLoaded', function() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItems = document.getElementById('cartItems');
  const closeCart = document.getElementById('closeCart');

  // إغلاق الشريط
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
  });

  // أزرار إضافة إلى السلة
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const productName = this.getAttribute('data-product');
      const productPrice = parseFloat(this.getAttribute('data-price'));

      // تحقق إذا المنتج موجود بالفعل
      const existingItem = cartItems.querySelector(`.cart-item[data-product="${productName}"]`);

      if (existingItem) {
        // زيادة العدد
        const quantityElem = existingItem.querySelector('.cart-quantity');
        let quantity = parseInt(quantityElem.textContent);
        quantity += 1;
        quantityElem.textContent = quantity;

        // تحديث السعر حسب العدد
        const priceElem = existingItem.querySelector('.cart-price');
        priceElem.textContent = `$${(productPrice * quantity).toFixed(2)}`;
      } else {
        // إنشاء عنصر جديد للمنتج
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.product = productName;
        cartItem.dataset.unitPrice = productPrice; // حفظ سعر الوحدة
        cartItem.innerHTML = `
          <span class="cart-name">${productName}</span>
          <span class="cart-quantity">1</span>
          <span class="cart-price">$${productPrice.toFixed(2)}</span>
          <button class="remove-item">🗑️</button>
        `;
        cartItems.appendChild(cartItem);
      }

      // فتح الشريط
      cartSidebar.classList.add('open');
    });
  });

  // حذف المنتج
  cartItems.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
      const item = e.target.closest('.cart-item');
      if (item) {
        item.remove();
      }
    }
  });
});
