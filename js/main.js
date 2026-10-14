// Datos de productos costeños
const products = [
    {
        id: 1,
        name: "Salchipapa ",
        price: 25000,
        category: "salchipapa",
        description: "Salchipapa con queso costeño, y salsas de la casa",
        image: "assets/Salchipapa.jpeg",
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
        image: "assets/especial.jpeg",
        badge: "Recomendado",
        rating: 4.9,
        reviews: 456
    },
    {
        id: 3,
        name: "Butifarra Especial",
        price: 17000,
        category: "butifarra",
        description: "Butifarra con Bollo, Yuca frita y limon",
        image: "assets/bollo.jpeg",
        badge: "Recomendado",
        rating: 4.7,
        reviews: 189
    },
    {
        id: 4,
        name: "Papa Rellena",
        price: 5000,
        category: "Fritos",
        description: "Papa Rellena, De Huevo y Carne",
        image: "assets/Papa Rellena.jpeg",
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
        image: "assets/Empanadas.jpg",
        badge: "Especial",
        rating: 4.9,
        reviews: 267
    },
    {
        id: 6,
        name: "Patacon",
        price: 25000,
        category: "Frito",
        description: "Patacon Relleno Con Todo",
        image: "assets/Patacon.jpeg",
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
        image: "assets/carimañola.jpeg",
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
        image: "assets/Pastelitos.jpeg",
        badge: "Nuevo",
        rating: 4.6,
        reviews: 98
    },
    
];

// Estado de la aplicación
let cart = [];
let cartTotal = 0;
let currentFilter = 'all';
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar loader por 1.5 segundos
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    displayProducts('all');
    loadCartFromStorage();
    initParticles();
    initStatsCounter();
    initTestimonials();
    initSearch();
    initNewsletter();
});

// Mostrar productos
function displayProducts(filter) {
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    menuGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="menu-item" style="animation-delay: ${index * 0.1}s">
            <div class="menu-item-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="menu-item-badge">${product.badge}</span>` : ''}
            </div>
            <div class="menu-item-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews} reviews)</span>
                </div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${product.price.toLocaleString()}</span>
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
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        displayProducts(currentFilter);
    });
});

// Agregar al carrito
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
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
    // Actualizar items del carrito
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
                </div>
            </div>
        </div>
    `).join('');
    
    // Calcular total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${cartTotal.toLocaleString()}`;
    
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
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar de localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Mostrar/ocultar carrito
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', closeCartSidebar);
// ========== FUNCIONES PARA PRODUCTOS CONGELADOS ==========
function openOrderModal(product) {
    const modal = document.getElementById('orderModal');
    const productInput = document.getElementById('productType');
    
    // Establecer el tipo de producto
    let productName = '';
    switch(product) {
        case 'empanadas':
            productName = 'Empanadas Congeladas';
            break;
        case 'carimanolas':
            productName = 'Carimañolas Congeladas';
            break;
        case 'pastelitos':
            productName = 'Pastelitos de Carne Congelados';
            break;
        case 'combo':
            productName = 'Combo Fritanga Congelada';
            break;
    }
    
    productInput.value = productName;
    
    // Establecer fecha mínima para mañana
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    document.getElementById('pickupDate').min = tomorrowStr;
    
    // Mostrar modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function submitOrder(event) {
    event.preventDefault();
    
    // Recoger datos del formulario
    const formData = {
        product: document.getElementById('productType').value,
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        quantity: document.getElementById('quantity').value,
        date: document.getElementById('pickupDate').value,
        observations: document.getElementById('observations').value
    };
    
    // Aquí puedes enviar los datos a tu servidor o a WhatsApp
    // Por ahora mostraremos un mensaje de éxito
    
    showNotification('✅ ¡Pedido enviado! Te contactaremos pronto.', 'success');
    closeOrderModal();
    
    // Opcional: Enviar por WhatsApp
    const whatsappMessage = `Hola, quiero pedir:%0A
        Producto: ${formData.product}%0A
        Cantidad: ${formData.quantity} docenas%0A
        Fecha: ${formData.date}%0A
        Observaciones: ${formData.observations}%0A
        Nombre: ${formData.name}%0A
        Teléfono: ${formData.phone}`;
    
    // Descomenta la siguiente línea si quieres abrir WhatsApp automáticamente
    // window.open(`https://wa.me/+57 314 6938535?text=${whatsappMessage}`, '_blank');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        closeOrderModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});
// En tu archivo main.js, agrega esta función
function enviarPedidoWhatsApp() {
    const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (carrito.length === 0) {
        alert('¡El carrito está vacío!');
        return;
    }
    
    // Crear mensaje
    let mensaje = "🍽️ *NUEVO PEDIDO - SABOR COSTEÑO* 🍽️\n\n";
    mensaje += "📍 *PRODUCTOS:*\n";
    
    let total = 0;
    carrito.forEach(item => {
        mensaje += `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString()}\n`;
        total += item.price * item.quantity;
    });
    
    mensaje += `\n💰 *TOTAL: $${total.toLocaleString()}*`;
    mensaje += `\n\n📞 *Contáctame para coordinar pago y entrega*`;
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroWhatsApp = '573054567890'; // Tu número
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
    
    // Opcional: Limpiar carrito después de enviar
    if (confirm('¿Quieres vaciar el carrito después de enviar el pedido?')) {
        localStorage.removeItem('cart');
        location.reload();
    }
}

// Agregar botón de WhatsApp en el carrito
function agregarBotonWhatsAppAlCarrito() {
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) {
        const btnWhatsApp = document.createElement('button');
        btnWhatsApp.className = 'btn-whatsapp-pedido';
        btnWhatsApp.innerHTML = '<i class="fab fa-whatsapp"></i> Pedir por WhatsApp';
        btnWhatsApp.onclick = enviarPedidoWhatsApp;
        btnWhatsApp.style.cssText = `
            width: 100%;
            padding: 1rem;
            background: #25D366;
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            margin-top: 10px;
            cursor: pointer;
            transition: all 0.3s;
        `;
        cartFooter.appendChild(btnWhatsApp);
    }
}

// Llamar a la función cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(agregarBotonWhatsAppAlCarrito, 1000);
});
// 1. Agrega este código a tu main.js
document.querySelector('.checkout-btn').addEventListener('click', () => {
    const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (carrito.length === 0) {
        alert('Carrito vacío');
        return;
    }
    
    // Preguntar método de pago
    const metodo = prompt('¿Cómo quieres pagar?\n1. Nequi\n2. Bancolombia\n3. Efectivo contra entrega');
    
    let mensaje = "🛒 *PEDIDO SABOR COSTEÑO*\n\n";
    mensaje += "📦 *PRODUCTOS:*\n";
    
    carrito.forEach(p => {
        mensaje += `• ${p.name} x${p.quantity}\n`;
    });
    
    mensaje += `\n💰 *Total: $${calcularTotal(carrito).toLocaleString()}*`;
    mensaje += `\n💳 *Pago: ${metodo === '1' ? 'Nequi' : metodo === '2' ? 'Bancolombia' : 'Efectivo'}*`;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/573054567890?text=${encodeURIComponent(mensaje)}`);
});

function calcularTotal(carrito) {
    return carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}