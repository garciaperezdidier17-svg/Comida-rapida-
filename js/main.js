// ========== CONFIGURACIÓN ==========
// Número de WhatsApp del negocio: código de país + número, solo dígitos.
// Es el número que ya aparece en la página (+57 314 6938535). CONFIRMA que es el correcto.
// Si necesitas cambiarlo, hazlo SOLO aquí y en los textos visibles del index.html.
const CONFIG = {
    WHATSAPP_NUMBER: "573146938535",
    BUSINESS_NAME: "SABOR COSTEÑO"
};

// Imágenes de los productos: cambia las rutas de archivos dentro de assets/ aquí.
const products = [
    {
        id: 1,
        name: "Salchipapa ",
        price: 25000,
        category: "salchipapa",
        description: "Salchipapa con queso costeño, y salsas de la casa",
        image: "assets/salchipapa.jpeg",
        badge: "Más vendido",
        rating: 4.8,
        reviews: 234
    },
    {
        id: 2,
        name: "Butifarra Tradicional",
        price: 10000,
        category: "butifarra",
        description: "Butifarra con bollo y yuca y suero costeño",
        image: "assets/butifarra tradicional.jpeg",
        badge: "Recomendado",
        rating: 4.9,
        reviews: 456
    },
    {
        id: 4,
        name: "Papa Rellena",
        price: 5000,
        category: "Fritos",
        description: "Papa Rellena, De Huevo y Carne",
        image: "assets/papa rellena.jpeg",
        badge: "Popular",
        rating: 4.8,
        reviews: 312
    },
    {
        id: 5,
        name: "Empanadas",
        price: 3500,
        category: "Fritos",
        description: "Empanadas, De Carne, Queso y Pollo",
        image: "assets/empanadas.jpeg",
        badge: "Especial",
        rating: 4.9,
        reviews: 267
    },
    {
        id: 6,
        name: "Patacon",
        price: 25000,
        category: "Fritos",
        description: "Patacon Relleno Con Todo",
        image: "assets/patacones.jpeg",
        badge: "El más pedido",
        rating: 5.0,
        reviews: 567
    },
    {
        id: 7,
        name: "Carimañola",
        price: 2500,
        category: "Fritos",
        description: "Carimañolas, De queso y carne",
        image: "assets/caremanolas.jpeg",
        badge: "Nuevo",
        rating: 4.6,
        reviews: 98
    },
    {
        id: 8,
        name: "Gaseosa",
        price: 4999,
        category: "bebida",
        description: "Gaseosa personal 400ml",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: null,
        rating: 4.5,
        reviews: 567
    },
    {
        id: 9,
        name: "Jugos naturales",
        price: 5000,
        category: "bebida",
        description: "Refrescante y Naturales, típica de la costa, Jugo de corozo, Tamarindo Y Guarapo",
        image: "assets/jugos.jpeg",
        badge: "Típica",
        rating: 4.9,
        reviews: 345
    },
    {
         id: 10,
        name: "Pastelitos",
        price: 6000,
        category: "Fritos",
        description: "Pastelitos, De Pollo y carne",
        image: "assets/pastelitos.jpeg",
        badge: "Nuevo",
        rating: 4.6,
        reviews: 98
    },
    
];

// Estado de la aplicación
let cart = [];
let cartTotal = 0;
let currentFilter = 'all';
// Fotos de testimonios: sus direcciones web se configuran en estos datos.
let testimonials = [
    {
        id: 1,
        name: "María Rodríguez",
        role: "Cliente frecuente",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "Las mejores salchipapas que he probado en mi vida. El sabor costeño es inigualable. ¡100% recomendado!",
        rating: 5
    },
    {
        id: 2,
        name: "Carlos Mendoza",
        role: "Cliente nuevo",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Los chuzos son espectaculares, la carne bien asada y las salsas caseras son deliciosas. ¡Volveré por más!",
        rating: 5
    },
    {
        id: 3,
        name: "Ana Mercado",
        role: "Cliente frecuente",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "La atención es excelente y la comida llega súper rápido. Las butifarras me recuerdan a Sincelejo.",
        rating: 5
    }
];

// Imágenes de promociones: cambia las rutas de archivos dentro de assets/ aquí.
// Promociones (botones "¡Lo quiero!" de la sección Promociones)
const promoProducts = [
    { id: 101, name: "Combo Costeño", price: 65000, image: "assets/combo costeño.jpeg" },
    { id: 102, name: "El Combo De Las 5", price: 15000, image: "assets/combo de cinco.jpeg" },
    { id: 103, name: "Butifarras 2x1", price: 27999, image: "assets/butifarra tradicional.jpeg" }
];

// Elementos del DOM
const menuGrid = document.getElementById('menu-grid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCounters = document.querySelectorAll('.cart-count');
const cartIcon = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');
const overlay = document.getElementById('overlay');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.querySelector('.scroll-top');
const loader = document.querySelector('.loader-wrapper');
const header = document.querySelector('.header');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let searchTerm = '';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar loader por 1.5 segundos
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 1500);

    displayProducts(currentFilter);
    loadCartFromStorage();
    initParticles();
    initStatsCounter();
    initTestimonials();
    initSearch();
    initNewsletter();
    initNavigation();
    initCategoryCards();
    initPromos();
    initWhatsAppLinks();
});

// Evita que texto de datos se interprete como HTML
function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function formatPrice(value) {
    return '$' + Number(value).toLocaleString('es-CO');
}

// Mostrar productos
function displayProducts(filter) {
    const term = searchTerm.trim().toLowerCase();
    const filteredProducts = products.filter(product => {
        const matchesCategory = filter === 'all' || product.category === filter;
        const matchesSearch = !term ||
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        menuGrid.innerHTML = `
            <p class="menu-empty" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--gray);">
                No encontramos productos para esta selección por ahora.
            </p>`;
        return;
    }

    menuGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="menu-item" style="animation-delay: ${index * 0.1}s">
            <div class="menu-item-image">
                <img src="${product.image}" alt="${escapeHTML(product.name.trim())}" loading="lazy">
                ${product.badge ? `<span class="menu-item-badge">${escapeHTML(product.badge)}</span>` : ''}
            </div>
            <div class="menu-item-info">
                <h3>${escapeHTML(product.name)}</h3>
                <p>${escapeHTML(product.description)}</p>
                <div class="rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews} reviews)</span>
                </div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">${formatPrice(product.price)}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generar estrellas de calificación
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Filtros
function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
    displayProducts(currentFilter);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
});

// Buscar un producto del catálogo o de las promociones
function findProduct(productId) {
    return products.find(p => p.id === productId) || promoProducts.find(p => p.id === productId);
}

// Agregar al carrito
window.addToCart = function(productId) {
    const product = findProduct(productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name.trim(),
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();
    saveCartToStorage();
    showNotification('Producto agregado al carrito', 'success');
    animateCartIcon();
};

// Actualizar carrito
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color: var(--gray); padding: 2rem 0;">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${escapeHTML(item.name)}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${escapeHTML(item.name)}</h4>
                    <div class="cart-item-price">${formatPrice(item.price)} c/u &middot; Subtotal: ${formatPrice(item.price * item.quantity)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Disminuir cantidad">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Aumentar cantidad">+</button>
                        <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})" role="button" aria-label="Eliminar"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Calcular total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = formatPrice(cartTotal);

    // Actualizar contadores
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounters.forEach(counter => {
        counter.textContent = totalItems;
    });
}

// Actualizar cantidad
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            saveCartToStorage();
        }
    }
};

// Eliminar del carrito
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
    showNotification('Producto eliminado del carrito', 'info');
};

// Guardar en localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        // localStorage puede estar bloqueado (modo privado); el carrito sigue funcionando en memoria
    }
}

// Cargar de localStorage (valida los datos guardados y usa precios actuales del catálogo)
function loadCartFromStorage() {
    try {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]');
        if (Array.isArray(saved)) {
            cart = saved.map(item => {
                const product = findProduct(Number(item.id));
                const quantity = parseInt(item.quantity, 10);
                if (!product || !(quantity > 0)) return null;
                return {
                    id: product.id,
                    name: product.name.trim(),
                    price: product.price,
                    image: product.image,
                    quantity
                };
            }).filter(Boolean);
        }
    } catch (e) {
        cart = [];
    }
    updateCart();
}

// Mostrar/ocultar carrito
function openCartSidebar() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartIcon.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', closeCartSidebar);
overlay.addEventListener('click', closeCartSidebar);

// Notificaciones
function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    const note = document.createElement('div');
    note.className = `notification ${type}`;
    note.setAttribute('role', 'status');
    note.textContent = message;
    document.body.appendChild(note);
    setTimeout(() => {
        note.style.transition = 'opacity 0.3s';
        note.style.opacity = '0';
        setTimeout(() => note.remove(), 300);
    }, 2500);
}

function animateCartIcon() {
    if (!cartIcon || !cartIcon.animate) return;
    cartIcon.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }],
        { duration: 300 }
    );
}

// ========== NAVEGACIÓN, MENÚ MÓVIL Y SCROLL ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    function closeMobileMenu() {
        if (!navMenu) return;
        navMenu.classList.remove('active');
        const icon = menuToggle && menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.addEventListener('click', () => {
            const open = navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
        });
    }
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function onScroll() {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 400);

        let current = sections.length ? sections[0].id : '';
        sections.forEach(section => {
            if (window.scrollY + 150 >= section.offsetTop) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

// Las tarjetas de "Categorías populares" filtran el menú
function initCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            setFilter(card.dataset.category);
            const menuSection = document.getElementById('menu');
            if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Botones "¡Lo quiero!" de promociones
function initPromos() {
    document.querySelectorAll('.btn-promo').forEach((btn, index) => {
        const promo = promoProducts[index];
        if (promo) btn.addEventListener('click', () => addToCart(promo.id));
    });
}

// Enlaces de WhatsApp con el número centralizado
function initWhatsAppLinks() {
    const float = document.querySelector('.whatsapp-float');
    if (float) {
        float.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero hacer un pedido.')}`;
        float.rel = 'noopener';
    }
    const footerWa = document.querySelector('.social-links a .fa-whatsapp');
    if (footerWa && footerWa.parentElement) {
        footerWa.parentElement.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
        footerWa.parentElement.target = '_blank';
        footerWa.parentElement.rel = 'noopener';
    }
}

// ========== EFECTOS VISUALES ==========
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('span');
        const size = 3 + Math.random() * 5;
        p.style.cssText = `position:absolute; border-radius:50%; background:rgba(255,255,255,0.35);
            width:${size}px; height:${size}px; left:${Math.random() * 100}%; top:${Math.random() * 100}%;
            pointer-events:none;`;
        if (p.animate) {
            p.animate(
                [{ transform: 'translateY(0)', opacity: 0.2 }, { transform: `translateY(-${40 + Math.random() * 60}px)`, opacity: 0.7 }],
                { duration: 3000 + Math.random() * 3000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
            );
        }
        container.appendChild(p);
    }
}

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    function run(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(progress * target).toLocaleString('es-CO');
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString('es-CO') + '+';
        }
        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    run(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counters.forEach(c => observer.observe(c));
    } else {
        counters.forEach(run);
    }
}

// El HTML actual no tiene sección de testimonios; el slider solo se activa si existe.
function initTestimonials() {
    if (!testimonialCards.length) return;
    let index = 0;
    function show(i) {
        index = i;
        testimonialCards.forEach((c, n) => c.classList.toggle('active', n === i));
        testimonialDots.forEach((d, n) => d.classList.toggle('active', n === i));
    }
    testimonialDots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    show(0);
    setInterval(() => show((index + 1) % testimonialCards.length), 5000);
}

// ========== BÚSQUEDA ==========
// El botón de lupa muestra un campo de búsqueda sobre los filtros del menú.
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const filters = document.querySelector('.menu-filters');
    if (!searchBtn || !filters) return;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:none; max-width:420px; margin:0 auto 1.5rem;';
    wrapper.innerHTML = '<input type="search" id="menuSearch" placeholder="Buscar en el menú..." aria-label="Buscar en el menú" ' +
        'style="width:100%; padding:0.8rem 1.2rem; border:2px solid #dfe6e9; border-radius:50px; font-family:inherit; font-size:1rem;">';
    filters.parentNode.insertBefore(wrapper, filters);
    const input = wrapper.querySelector('input');

    input.addEventListener('input', () => {
        searchTerm = input.value;
        displayProducts(currentFilter);
    });

    searchBtn.setAttribute('aria-label', 'Buscar');
    searchBtn.addEventListener('click', () => {
        wrapper.style.display = 'block';
        const menuSection = document.getElementById('menu');
        if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => input.focus(), 400);
    });
}

// ========== NEWSLETTER ==========
// Sin backend no hay dónde guardar correos: se valida el campo y se informa con honestidad.
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input.value || !input.checkValidity()) {
            showNotification('Escribe un correo válido', 'info');
            return;
        }
        showNotification('La suscripción por correo aún no está disponible. ¡Pide por WhatsApp para enterarte de las ofertas!', 'info');
        form.reset();
    });
}

// ========== WHATSAPP ==========
function openWhatsApp(message) {
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url; // si el navegador bloquea la ventana emergente
}

// Pedido del carrito -> mensaje de WhatsApp (el cliente debe enviarlo desde WhatsApp)
function enviarPedidoWhatsApp() {
    if (cart.length === 0) {
        showNotification('¡El carrito está vacío!', 'info');
        return;
    }

    let mensaje = `🍽️ *NUEVO PEDIDO - ${CONFIG.BUSINESS_NAME}* 🍽️\n\n`;
    mensaje += '📍 *PRODUCTOS:*\n';
    cart.forEach(item => {
        mensaje += `• ${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    mensaje += `\n💰 *TOTAL: ${formatPrice(calcularTotal(cart))}*`;
    mensaje += '\n\n📞 Quedo atento para coordinar pago y entrega.';

    openWhatsApp(mensaje);
    showNotification('Se abrió WhatsApp: envía el mensaje para confirmar tu pedido', 'success');
}

function calcularTotal(carrito) {
    return carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

document.getElementById('checkoutBtn').addEventListener('click', enviarPedidoWhatsApp);

// ========== FUNCIONES PARA PRODUCTOS CONGELADOS ==========
function openOrderModal(product) {
    const modal = document.getElementById('orderModal');
    const productInput = document.getElementById('productType');

    const names = {
        empanadas: 'Empanadas Congeladas',
        carimanolas: 'Carimañolas Congeladas',
        pastelitos: 'Pastelitos de Carne Congelados',
        combo: 'Combo Fritanga Congelada'
    };
    productInput.value = names[product] || product;

    // Fecha mínima: mañana (en hora local, no UTC)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const pad = n => String(n).padStart(2, '0');
    const tomorrowStr = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
    document.getElementById('pickupDate').min = tomorrowStr;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function submitOrder(event) {
    event.preventDefault();

    const formData = {
        product: document.getElementById('productType').value,
        name: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        quantity: parseInt(document.getElementById('quantity').value, 10),
        date: document.getElementById('pickupDate').value,
        observations: document.getElementById('observations').value.trim()
    };

    if (!formData.name || !(formData.quantity >= 1) || !formData.date) {
        showNotification('Completa los campos obligatorios', 'info');
        return;
    }
    if (formData.phone.replace(/\D/g, '').length < 7) {
        showNotification('Escribe un teléfono válido', 'info');
        return;
    }

    let mensaje = '📦 *PEDIDO POR MAYOR - PRODUCTOS CONGELADOS*\n\n';
    mensaje += `Producto: ${formData.product}\n`;
    mensaje += `Cantidad: ${formData.quantity} docena(s)\n`;
    mensaje += `Fecha para recoger/recibir: ${formData.date}\n`;
    if (formData.observations) mensaje += `Observaciones: ${formData.observations}\n`;
    mensaje += `Nombre: ${formData.name}\n`;
    mensaje += `Teléfono: ${formData.phone}`;

    openWhatsApp(mensaje);
    showNotification('Se abrió WhatsApp: envía el mensaje para confirmar tu pedido', 'success');
    document.getElementById('orderForm').reset();
    closeOrderModal();
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        closeOrderModal();
    }
});

// Cerrar modal y carrito con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOrderModal();
        closeCartSidebar();
    }
});
