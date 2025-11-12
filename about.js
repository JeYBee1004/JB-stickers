// Disable right-click globally (optional: remove this if you only want to restrict inspection)
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// Restrict only developer tools shortcuts
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (
        (event.ctrlKey && event.shiftKey && (key === 'I' || key === 'J')) || // Ctrl+Shift+I or J
        key === 'F12' // F12
    ) {
        event.preventDefault();
        alert('Developer tools access is restricted!');
    }
});

// Disable right-click only on images with class "-protected-image"
document.querySelectorAll('.-protected-image').forEach(img => {
    img.addEventListener('contextmenu', function (event) {
        event.preventDefault();;
    });
});
let cart = []

function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
    updateThemeButton(true)
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    updateThemeButton(isDark)
}

function updateThemeButton(isDark) {
    const sunIcon = document.getElementById("sun-icon")
    const moonIcon = document.getElementById("moon-icon")
    const themeText = document.getElementById("theme-text")

    if (isDark) {
    sunIcon.style.display = "block"
    moonIcon.style.display = "none"
    themeText.textContent = "Light Mode"
    } else {
    sunIcon.style.display = "none"
    moonIcon.style.display = "block"
    themeText.textContent = "Dark Mode"
    }
}

function toggleMobileMenu() {
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.toggle("open")
}

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id)
    updateCart()
}

function updateQuantity(id, quantity) {
    if (quantity <= 0) {
    removeFromCart(id)
    return
    }

    const item = cart.find((item) => item.id === id)
    if (item) {
    item.quantity = quantity
    updateCart()
    }
}

function updateCart() {
    const cartCount = document.getElementById("cart-count")
    const cartItems = document.getElementById("cart-items")
    const cartTotal = document.getElementById("cart-total")

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems

    if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>'
    } else {
    cartItems.innerHTML = cart
        .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Ksh ${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `,
        )
        .join("")
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.textContent = `Ksh ${total.toFixed(2)}`

    localStorage.setItem("cart", JSON.stringify(cart))
}

function openCart() {
    document.getElementById("cart-overlay").classList.add("open")
}

function closeCart() {
    document.getElementById("cart-overlay").classList.remove("open")
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme()

    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCart()
    }

    document.getElementById("theme-toggle").addEventListener("click", toggleTheme)
    document.getElementById("mobile-menu-btn").addEventListener("click", toggleMobileMenu)
    document.getElementById("cart-btn").addEventListener("click", openCart)
    document.getElementById("close-cart").addEventListener("click", closeCart)

    document.getElementById("cart-overlay").addEventListener("click", (e) => {
    if (e.target.id === "cart-overlay") {
        closeCart()
    }
    })

    document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("open")
    })
    })
})

