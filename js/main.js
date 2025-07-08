// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const closeButtons = document.querySelectorAll('.close');

// Sample products data (in a real application, this would come from a backend)
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'images/wh1.jpg',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'electronics'
    },
    {
        id: 2,
        name: 'Smartphone',
        price: 699.99,
        image: 'images/sm1.jpg',
        description: 'Latest model smartphone with advanced features',
        category: 'electronics'
    },
    {
        id: 3,
        name: 'Laptop',
        price: 1299.99,
        image: 'images/lb2.jpg',
        description: 'Powerful laptop for work and gaming',
        category: 'electronics'
    },
    {
        id: 4,
        name: 'Designer T-Shirt',
        price: 29.99,
        image: 'images/dts.jpg',
        description: 'Comfortable cotton t-shirt with modern design',
        category: 'clothing'
    },
    {
        id: 5,
        name: 'Denim Jeans',
        price: 59.99,
        image: 'images/dj.jpg',
        description: 'Classic fit denim jeans for everyday wear',
        category: 'clothing'
    },
    {
        id: 6,
        name: 'Novel Collection',
        price: 19.99,
        image: 'images/nc1.jpg',
        description: 'Bestselling novel collection in paperback',
        category: 'books'
    },
    {
        id: 7,
        name: 'Garden Tools Set',
        price: 49.99,
        image: 'images/gts.jpg',
        description: 'Complete set of essential garden tools',
        category: 'home'
    },
    {
        id: 8,
        name: 'Smart Watch',
        price: 199.99,
        image: 'images/sw2.jpg',
        description: 'Feature-rich smartwatch with health tracking',
        category: 'electronics'
    },
    {
        id: 9,
        name: 'Winter Jacket',
        price: 89.99,
        image: 'images/wj.jpg',
        description: 'Warm and stylish winter jacket',
        category: 'clothing'
    },
    {
        id: 10,
        name: 'Coffee Table',
        price: 149.99,
        image: 'images/cbc.jpg',
        description: 'Modern coffee table with storage space',
        category: 'home'
    },
    {
        id: 11,
        name: 'Cookbook Collection',
        price: 34.99,
        image: 'images/pius.jpg',
        description: 'Collection of gourmet recipes',
        category: 'books'
    },
    {
        id: 12,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'images/bs.jpg',
        description: 'Portable waterproof bluetooth speaker',
        category: 'electronics'
    }
];

// Authentication state
let isLoggedIn = false;
let currentUser = null;

// Event Listeners
loginBtn.addEventListener('click', () => showModal(loginModal));
registerBtn.addEventListener('click', () => showModal(registerModal));
logoutBtn.addEventListener('click', handleLogout);

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === registerModal) {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);

// Functions
function showModal(modal) {
    modal.style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // In a real application, you would validate credentials against a backend
    // This is just a simple example
    if (email && password) {
        isLoggedIn = true;
        currentUser = { email };
        updateAuthUI();
        loginModal.style.display = 'none';
        showMessage('Successfully logged in!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // In a real application, you would send this data to a backend
    if (name && email && password) {
        isLoggedIn = true;
        currentUser = { name, email };
        updateAuthUI();
        registerModal.style.display = 'none';
        showMessage('Successfully registered and logged in!');
    }
}

function handleLogout() {
    isLoggedIn = false;
    currentUser = null;
    updateAuthUI();
    showMessage('Successfully logged out!');
}

function updateAuthUI() {
    if (isLoggedIn) {
        loginBtn.classList.add('hidden');
        registerBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        registerBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    // Style the message
    Object.assign(messageDiv.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        borderRadius: '5px',
        zIndex: '1000',
        animation: 'slideIn 0.5s ease-out'
    });

    // Create and add the animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);

    // Remove the message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

// Load featured products
function loadFeaturedProducts() {
    const productGrid = document.getElementById('featuredProducts');
    if (!productGrid) return;

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);

        // Add product card styles
        const style = document.createElement('style');
        style.textContent = `
            .product-card {
                background: white;
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
            }
            .product-card:hover {
                transform: translateY(-5px);
            }
            .product-card img {
                width: 100%;
                height: auto;
                border-radius: 5px;
            }
            .product-card h3 {
                margin: 1rem 0;
            }
            .product-card .price {
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--primary-color);
                margin: 0.5rem 0;
            }
        `;
        document.head.appendChild(style);
    });
}

// Initialize the application
function init() {
    updateAuthUI();
    loadFeaturedProducts();
}

// Call init when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 