/**
 * ONLINE MARKET - MAIN APPLICATION LOGIC
 */

// Application State
const state = {
  products: [...PRODUCTS_DATA],
  filteredProducts: [...PRODUCTS_DATA],
  cart: JSON.parse(localStorage.getItem('uz_market_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('uz_market_wishlist')) || [],
  currentCategory: 'all',
  currentSort: 'popular',
  searchQuery: '',
  appliedPromo: null,
  theme: localStorage.getItem('uz_market_theme') || 'light',
  selectedPayment: 'click'
};

// DOM Elements cache
const DOM = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIcon: document.getElementById('themeIcon'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  categoriesList: document.getElementById('categoriesList'),
  productsGrid: document.getElementById('productsGrid'),
  sortSelect: document.getElementById('sortSelect'),
  resultsCount: document.getElementById('resultsCount'),
  
  // Cart
  cartBtn: document.getElementById('cartBtn'),
  cartBadge: document.getElementById('cartBadge'),
  cartTotalBadge: document.getElementById('cartTotalBadge'),
  cartDrawer: document.getElementById('cartDrawer'),
  drawerOverlay: document.getElementById('drawerOverlay'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  cartItemsContainer: document.getElementById('cartItemsContainer'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartDiscountRow: document.getElementById('cartDiscountRow'),
  cartDiscountAmount: document.getElementById('cartDiscountAmount'),
  cartDeliveryFee: document.getElementById('cartDeliveryFee'),
  cartTotalSum: document.getElementById('cartTotalSum'),
  promoInput: document.getElementById('promoInput'),
  applyPromoBtn: document.getElementById('applyPromoBtn'),
  promoStatusBox: document.getElementById('promoStatusBox'),
  checkoutBtn: document.getElementById('checkoutBtn'),

  // Wishlist
  wishlistBtn: document.getElementById('wishlistBtn'),
  wishlistBadge: document.getElementById('wishlistBadge'),

  // Modals
  quickViewModal: document.getElementById('quickViewModal'),
  quickViewBody: document.getElementById('quickViewBody'),
  closeQuickViewBtn: document.getElementById('closeQuickViewBtn'),

  checkoutModal: document.getElementById('checkoutModal'),
  closeCheckoutBtn: document.getElementById('closeCheckoutBtn'),
  checkoutForm: document.getElementById('checkoutForm'),
  checkoutSummaryTotal: document.getElementById('checkoutSummaryTotal'),
  orderSuccessBox: document.getElementById('orderSuccessBox'),

  // Toasts
  toastContainer: document.getElementById('toastContainer')
};

// --------------------------------------------------------------------------
// Initialization
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCategories();
  applyFiltersAndRender();
  updateCartBadge();
  updateWishlistBadge();
  setupEventListeners();
});

// --------------------------------------------------------------------------
// Theme Management
// --------------------------------------------------------------------------
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('uz_market_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
  showToast('Mavzu o\'zgartirildi', `${state.theme === 'dark' ? 'Tungi rejim' : 'Kunduzgi rejim'} yoqildi`, 'info');
}

function updateThemeIcon() {
  if (DOM.themeIcon) {
    DOM.themeIcon.className = state.theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
}

// --------------------------------------------------------------------------
// Price Formatter (UZS)
// --------------------------------------------------------------------------
function formatPrice(amount) {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
}

// --------------------------------------------------------------------------
// Categories Rendering
// --------------------------------------------------------------------------
function renderCategories() {
  if (!DOM.categoriesList) return;
  DOM.categoriesList.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-pill ${state.currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
      <i class="${cat.icon}"></i>
      <span>${cat.name}</span>
    </button>
  `).join('');

  DOM.categoriesList.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.categoriesList.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      applyFiltersAndRender();
    });
  });
}

// --------------------------------------------------------------------------
// Filter, Search, Sort & Render Products
// --------------------------------------------------------------------------
function applyFiltersAndRender() {
  let list = [...state.products];

  // Category filter
  if (state.currentCategory !== 'all') {
    list = list.filter(item => item.category === state.currentCategory);
  }

  // Search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q)
    );
  }

  // Sort
  if (state.currentSort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.currentSort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.currentSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: popular
    list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  state.filteredProducts = list;
  renderProductsGrid();

  if (DOM.resultsCount) {
    DOM.resultsCount.innerHTML = `Ko'rsatilmoqda: <strong>${list.length}</strong> ta mahsulot`;
  }
}

function renderProductsGrid() {
  if (!DOM.productsGrid) return;

  if (state.filteredProducts.length === 0) {
    DOM.productsGrid.innerHTML = `
      <div class="no-results">
        <i class="ri-search-eye-line"></i>
        <h3>Mahsulot topilmadi</h3>
        <p>Boshqa so'z bilan qidirib ko'ring yoki filtrlarni tozalang.</p>
      </div>
    `;
    return;
  }

  DOM.productsGrid.innerHTML = state.filteredProducts.map(product => {
    const isFav = state.wishlist.includes(product.id);
    const inCart = state.cart.some(item => item.id === product.id);

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-box" onclick="openQuickView(${product.id})">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-badges">
            ${product.badge ? `<span class="badge ${product.badgeType || 'hot'}">${product.badge}</span>` : ''}
          </div>
          <button class="quick-fav-btn ${isFav ? 'active' : ''}" onclick="toggleWishlist(event, ${product.id})" title="Sevimlilarga qo'shish">
            <i class="${isFav ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="product-cat">${getCategoryName(product.category)}</span>
          <h3 class="product-title" onclick="openQuickView(${product.id})" title="${product.name}">${product.name}</h3>
          
          <div class="product-rating">
            <div class="rating-stars">
              <i class="ri-star-fill"></i>
            </div>
            <span class="rating-score">${product.rating}</span>
            <span class="reviews-count">(${product.reviewsCount} sharh)</span>
          </div>

          <div class="product-bottom">
            <div class="product-pricing">
              <span class="price-current">${formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            <button class="add-cart-btn ${inCart ? 'in-cart' : ''}" onclick="handleAddToCartClick(event, ${product.id})" title="${inCart ? 'Savatda mavjud' : 'Savatga qo\'shish'}">
              <i class="${inCart ? 'ri-check-line' : 'ri-shopping-cart-2-line'}"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryName(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.name : catId;
}

// --------------------------------------------------------------------------
// Wishlist Logic
// --------------------------------------------------------------------------
function toggleWishlist(e, productId) {
  if (e) e.stopPropagation();
  const index = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Sevimlilardan o\'chirildi', product ? product.name : '', 'danger');
  } else {
    state.wishlist.push(productId);
    showToast('Sevimlilarga qo\'shildi!', product ? product.name : '', 'success');
  }

  localStorage.setItem('uz_market_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderProductsGrid();
}

function updateWishlistBadge() {
  if (DOM.wishlistBadge) {
    DOM.wishlistBadge.textContent = state.wishlist.length;
    DOM.wishlistBadge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
  }
}

function filterWishlist() {
  if (state.wishlist.length === 0) {
    showToast('Sevimlilar bo\'sh', 'Siz hali hech qanday mahsulotni tanlamadingiz', 'warning');
    return;
  }
  state.filteredProducts = state.products.filter(p => state.wishlist.includes(p.id));
  renderProductsGrid();
  if (DOM.resultsCount) {
    DOM.resultsCount.innerHTML = `Sevimlilar: <strong>${state.filteredProducts.length}</strong> ta mahsulot`;
  }
}

// --------------------------------------------------------------------------
// Cart Logic
// --------------------------------------------------------------------------
function handleAddToCartClick(e, productId) {
  if (e) e.stopPropagation();
  addToCart(productId, 1);
}

function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      id: productId,
      quantity: quantity
    });
  }

  saveCart();
  renderProductsGrid();
  renderCart();
  showToast('Savatga qo\'shildi!', `${product.name} (${quantity} dona)`, 'success');
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }

  saveCart();
  renderProductsGrid();
  renderCart();
}

function removeFromCart(productId) {
  const product = state.products.find(p => p.id === productId);
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  renderProductsGrid();
  renderCart();
  showToast('Mahsulot olib tashlandi', product ? product.name : '', 'danger');
}

function saveCart() {
  localStorage.setItem('uz_market_cart', JSON.stringify(state.cart));
  updateCartBadge();
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (DOM.cartBadge) {
    DOM.cartBadge.textContent = totalCount;
    DOM.cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  const subtotal = calculateCartSubtotal();
  if (DOM.cartTotalBadge) {
    DOM.cartTotalBadge.textContent = formatPrice(subtotal);
  }
}

function calculateCartSubtotal() {
  return state.cart.reduce((total, cartItem) => {
    const p = state.products.find(item => item.id === cartItem.id);
    return total + (p ? p.price * cartItem.quantity : 0);
  }, 0);
}

function renderCart() {
  if (!DOM.cartItemsContainer) return;

  if (state.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="ri-shopping-bag-3-line"></i>
        <h4>Savatingiz bo'sh</h4>
        <p>Katalogdan o'zingizga yoqqan mahsulotlarni tanlang</p>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  DOM.cartItemsContainer.innerHTML = state.cart.map(cartItem => {
    const product = state.products.find(p => p.id === cartItem.id);
    if (!product) return '';

    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${product.name}</h4>
          <span class="cart-item-price">${formatPrice(product.price)}</span>
          
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQuantity(${product.id}, -1)">
                <i class="ri-subtract-line"></i>
              </button>
              <span class="qty-val">${cartItem.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${product.id}, 1)">
                <i class="ri-add-line"></i>
              </button>
            </div>
            <span style="font-weight: 700; font-size: 0.88rem;">${formatPrice(product.price * cartItem.quantity)}</span>
          </div>
        </div>
        <button class="cart-remove-item" onclick="removeFromCart(${product.id})" title="O'chirish">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;
  }).join('');

  updateCartTotals(calculateCartSubtotal());
}

function updateCartTotals(subtotal) {
  let discount = 0;
  if (state.appliedPromo) {
    if (state.appliedPromo.discountPercent) {
      discount = Math.round(subtotal * (state.appliedPromo.discountPercent / 100));
    } else if (state.appliedPromo.discountAmount) {
      discount = Math.min(subtotal, state.appliedPromo.discountAmount);
    }
  }

  const deliveryFee = subtotal > 1000000 || subtotal === 0 ? 0 : 25000;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPrice(subtotal);
  
  if (DOM.cartDiscountRow) {
    if (discount > 0) {
      DOM.cartDiscountRow.style.display = 'flex';
      DOM.cartDiscountAmount.textContent = '-' + formatPrice(discount);
    } else {
      DOM.cartDiscountRow.style.display = 'none';
    }
  }

  if (DOM.cartDeliveryFee) {
    DOM.cartDeliveryFee.textContent = deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee);
    DOM.cartDeliveryFee.style.color = deliveryFee === 0 ? 'var(--color-success)' : 'inherit';
  }

  if (DOM.cartTotalSum) DOM.cartTotalSum.textContent = formatPrice(finalTotal);
  if (DOM.checkoutSummaryTotal) DOM.checkoutSummaryTotal.textContent = formatPrice(finalTotal);
}

// --------------------------------------------------------------------------
// Promo Code Logic
// --------------------------------------------------------------------------
function applyPromoCode() {
  const code = DOM.promoInput.value.trim().toUpperCase();
  if (!code) {
    showToast('Promo-kod kiriting', 'Masalan: UZMARKET10 yoki SALOM2026', 'warning');
    return;
  }

  if (PROMO_CODES[code]) {
    state.appliedPromo = PROMO_CODES[code];
    renderPromoStatus(code);
    renderCart();
    showToast('Promo-kod qabul qilindi!', `${state.appliedPromo.title} faollashtirildi`, 'success');
  } else {
    showToast('Noto\'g\'ri kod', 'Bunday promokod mavjud emas yoki muddati tugagan', 'danger');
  }
}

function renderPromoStatus(code) {
  if (!DOM.promoStatusBox) return;
  DOM.promoStatusBox.innerHTML = `
    <div class="applied-promo-tag">
      <span><i class="ri-coupon-3-fill"></i> ${code} (${state.appliedPromo.title})</span>
      <button onclick="removePromoCode()"><i class="ri-close-circle-fill"></i></button>
    </div>
  `;
}

function removePromoCode() {
  state.appliedPromo = null;
  if (DOM.promoStatusBox) DOM.promoStatusBox.innerHTML = '';
  if (DOM.promoInput) DOM.promoInput.value = '';
  renderCart();
  showToast('Promo-kod bekor qilindi', '', 'info');
}

// --------------------------------------------------------------------------
// Drawer and Modal Management
// --------------------------------------------------------------------------
function openCartDrawer() {
  renderCart();
  DOM.cartDrawer.classList.add('active');
  DOM.drawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  DOM.cartDrawer.classList.remove('active');
  DOM.drawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const isFav = state.wishlist.includes(product.id);

  DOM.quickViewBody.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-img">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="quick-view-details">
        <span class="product-cat">${getCategoryName(product.category)}</span>
        <h2 class="modal-product-title">${product.name}</h2>
        
        <div class="product-rating" style="margin-bottom: 12px;">
          <div class="rating-stars">
            <i class="ri-star-fill"></i>
          </div>
          <span class="rating-score">${product.rating}</span>
          <span class="reviews-count">(${product.reviewsCount} ta ijobiy sharh)</span>
        </div>

        <div style="margin-bottom: 16px;">
          <span class="price-current" style="font-size: 1.5rem;">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old" style="font-size: 1rem; margin-left: 10px;">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>

        <p class="modal-product-desc">${product.description}</p>

        <div class="specs-list">
          <strong style="margin-bottom: 4px; font-size: 0.88rem;">Texnik xususiyatlari:</strong>
          ${Object.entries(product.specs).map(([k, v]) => `
            <div class="spec-line">
              <span class="spec-name">${k}:</span>
              <span class="spec-value">${v}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button class="btn-primary" style="flex: 1; justify-content: center; background: var(--accent-gradient); color: #fff;" onclick="addToCart(${product.id}, 1); closeModals();">
            <i class="ri-shopping-cart-line"></i> Savatga qo'shish
          </button>
          <button class="action-btn" onclick="toggleWishlist(event, ${product.id})" style="border: 1px solid var(--border-color);" title="Sevimlilar">
            <i class="${isFav ? 'ri-heart-fill' : 'ri-heart-line'}" style="color: ${isFav ? 'var(--color-danger)' : 'inherit'}"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  DOM.quickViewModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Savat bo\'sh', 'Buyurtma berish uchun mahsulot tanlang', 'warning');
    return;
  }
  closeCartDrawer();
  DOM.checkoutForm.style.display = 'flex';
  DOM.orderSuccessBox.style.display = 'none';
  DOM.checkoutModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModals() {
  DOM.quickViewModal.classList.remove('active');
  DOM.checkoutModal.classList.remove('active');
  document.body.style.overflow = '';
}

// --------------------------------------------------------------------------
// Checkout and Telegram Order Dispatch
// --------------------------------------------------------------------------
function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const city = document.getElementById('custCity').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const payment = state.selectedPayment.toUpperCase();
  const notes = document.getElementById('custNotes').value.trim();

  if (!name || !phone || !address) {
    showToast('Xatolik', 'Iltimos, barcha majburiy maydonlarni to\'ldiring', 'danger');
    return;
  }

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = calculateCartSubtotal();
  let discount = 0;
  if (state.appliedPromo) {
    discount = state.appliedPromo.discountPercent ? 
      Math.round(subtotal * (state.appliedPromo.discountPercent / 100)) : 
      (state.appliedPromo.discountAmount || 0);
  }
  const delivery = subtotal > 1000000 ? 0 : 25000;
  const total = subtotal - discount + delivery;

  // Build items summary
  const orderItems = state.cart.map(c => {
    const p = state.products.find(i => i.id === c.id);
    return {
      name: p ? p.name : 'Noma\'lum',
      quantity: c.quantity,
      price: p ? p.price : 0,
      total: p ? p.price * c.quantity : 0
    };
  });

  const orderData = {
    orderId,
    customer: { name, phone, city, address, notes },
    paymentMethod: payment,
    items: orderItems,
    subtotal,
    discount,
    delivery,
    total,
    date: new Date().toLocaleString('uz-UZ')
  };

  // Save to orders history
  const orders = JSON.parse(localStorage.getItem('uz_market_orders')) || [];
  orders.unshift(orderData);
  localStorage.setItem('uz_market_orders', JSON.stringify(orders));

  // Prepare Telegram order message URL
  const tgText = encodeURIComponent(
    `🛍 YANGI BUYURTMA #${orderId}\n` +
    `👤 Mijoz: ${name}\n` +
    `📞 Tel: ${phone}\n` +
    `📍 Manzil: ${city}, ${address}\n` +
    `💳 To'lov turi: ${payment}\n` +
    `---------------------------\n` +
    `📦 Mahsulotlar:\n` +
    orderItems.map(i => `• ${i.name} (${i.quantity} dona) - ${formatPrice(i.total)}`).join('\n') +
    `\n---------------------------\n` +
    `Jami to'lov: ${formatPrice(total)}\n` +
    (notes ? `💬 Izoh: ${notes}` : '')
  );

  // Show Success Box
  DOM.checkoutForm.style.display = 'none';
  DOM.orderSuccessBox.style.display = 'block';
  DOM.orderSuccessBox.innerHTML = `
    <div class="order-success-screen">
      <div class="order-success-icon">
        <i class="ri-checkbox-circle-fill"></i>
      </div>
      <h2>Buyurtmangiz qabul qilindi!</h2>
      <p style="color: var(--text-muted); margin-top: 6px;">Buyurtma raqami: <strong>#${orderId}</strong></p>
      
      <div class="receipt-card">
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span>Qabul qiluvchi:</span>
          <strong>${name} (${phone})</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span>Yetkazish manzili:</span>
          <strong>${city}, ${address}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span>To'lov usuli:</span>
          <strong>${payment}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top: 12px; padding-top: 10px; border-top: 1px dashed var(--border-color); font-size: 1.1rem; font-weight: 800; color: var(--accent-primary);">
          <span>Jami to'lov:</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
        <a href="https://t.me/share/url?url=${tgText}" target="_blank" class="tg-order-btn">
          <i class="ri-telegram-fill"></i> Telegram orqali menejerga yuborish
        </a>
        <button class="btn-primary" style="justify-content: center; background: var(--bg-tertiary); color: var(--text-main);" onclick="finishOrder()">
          Xaridni davom ettirish
        </button>
      </div>
    </div>
  `;

  // Clear cart
  state.cart = [];
  state.appliedPromo = null;
  saveCart();
  showToast('Buyurtma rasmiylashtirildi!', `Raqam: #${orderId}`, 'success');
}

function finishOrder() {
  closeModals();
  renderProductsGrid();
}

// --------------------------------------------------------------------------
// Toast Notification System
// --------------------------------------------------------------------------
function showToast(title, message = '', type = 'info') {
  if (!DOM.toastContainer) return;

  const icons = {
    success: 'ri-checkbox-circle-fill',
    danger: 'ri-error-warning-fill',
    warning: 'ri-alert-fill',
    info: 'ri-information-fill'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${icons[type] || icons.info}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --------------------------------------------------------------------------
// Event Listeners Setup
// --------------------------------------------------------------------------
function setupEventListeners() {
  // Theme toggle
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Search input
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (DOM.searchClearBtn) {
        DOM.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
      }
      applyFiltersAndRender();
    });
  }

  if (DOM.searchClearBtn) {
    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      DOM.searchClearBtn.style.display = 'none';
      applyFiltersAndRender();
    });
  }

  // Sort
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      state.currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Cart Drawer open/close
  if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', openCartDrawer);
  if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', closeCartDrawer);
  if (DOM.drawerOverlay) DOM.drawerOverlay.addEventListener('click', closeCartDrawer);

  // Wishlist button
  if (DOM.wishlistBtn) {
    DOM.wishlistBtn.addEventListener('click', filterWishlist);
  }

  // Modals close buttons
  if (DOM.closeQuickViewBtn) DOM.closeQuickViewBtn.addEventListener('click', closeModals);
  if (DOM.closeCheckoutBtn) DOM.closeCheckoutBtn.addEventListener('click', closeModals);

  // Promo code
  if (DOM.applyPromoBtn) DOM.applyPromoBtn.addEventListener('click', applyPromoCode);
  if (DOM.promoInput) {
    DOM.promoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') applyPromoCode();
    });
  }

  // Checkout Open
  if (DOM.checkoutBtn) DOM.checkoutBtn.addEventListener('click', openCheckoutModal);

  // Checkout Form submit
  if (DOM.checkoutForm) DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  // Payment method selection
  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.selectedPayment = card.dataset.payment;
    });
  });

  // Modal backdrop close on click
  window.addEventListener('click', (e) => {
    if (e.target === DOM.quickViewModal || e.target === DOM.checkoutModal) {
      closeModals();
    }
  });

  // Escape key closes modals and cart
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeModals();
    }
  });
}
