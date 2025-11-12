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
        // Cart state
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

// Mobile menu
function toggleMobileMenu() {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.toggle("open")
}

function addToCart(id, name, price, image) {
  const existingItem = cart.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ id, name, price, image, quantity: 1 })
  }

  updateCart()
  showNotification("✓ Added to cart!")
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id)
  updateCart()
  localStorage.setItem("cart", JSON.stringify(cart))
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
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

function updateCart() {
  const cartCount = document.getElementById("cart-count")
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  // Update count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update items display
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

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = `Ksh ${total.toFixed(2)}`

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))
}

function openCart() {
  document.getElementById("cart-overlay").classList.add("open")
}

function closeCart() {
  document.getElementById("cart-overlay").classList.remove("open")
}

function openCheckoutModal() {
  document.getElementById("checkout-modal").classList.add("open")
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("open")
}

function sendToWhatsApp(fullname, email, contact, location) {
  const phoneNumber = "254710709997" // WhatsApp number

  // Build cart items summary
  let cartSummary = ""
  let totalAmount = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    totalAmount += itemTotal
    cartSummary += `\n• ${item.name} x${item.quantity} = Ksh ${itemTotal.toFixed(2)}`
  })

  // Format message
  const message = `🛍️ *NEW ORDER*\n\n*Customer Details:*\nName: ${fullname}\nEmail: ${email}\nContact: ${contact}\nLocation: ${location}\n\n*Order Items:*${cartSummary}\n\n*Total: Ksh ${totalAmount.toFixed(2)}*\n\n✅ Ready for processing`

  // Generate WhatsApp URL
  const encodedMessage = encodeURIComponent(message)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  // Open WhatsApp
  window.open(whatsappURL, "_blank")
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    color: var(--primary-foreground);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    z-index: 100;
    animation: slideInRight 0.3s ease;
    font-weight: 600;
  `
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 2000)
}
document.addEventListener("DOMContentLoaded", () => {
  initTheme()

  // Load cart from localStorage
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCart()
  }

  // Event listeners
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)
  document.getElementById("mobile-menu-btn").addEventListener("click", toggleMobileMenu)
  document.getElementById("cart-btn").addEventListener("click", openCart)
  document.getElementById("close-cart").addEventListener("click", closeCart)

  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", openCheckoutModal)
  }

  const closeModal = document.getElementById("close-modal")
  if (closeModal) {
    closeModal.addEventListener("click", closeCheckoutModal)
  }

  const checkoutForm = document.getElementById("checkout-form")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullname = document.getElementById("fullname").value
      const email = document.getElementById("email").value
      const contact = document.getElementById("contact").value
      const location = document.getElementById("location").value

      if (!fullname || !email || !contact || !location) {
        showNotification("Please fill all fields")
        return
      }

      if (cart.length === 0) {
        showNotification("Your cart is empty")
        return
      }

      // Send to WhatsApp
      sendToWhatsApp(fullname, email, contact, location)

      // Reset form and close modal
      checkoutForm.reset()
      closeCheckoutModal()
      cart = []
      updateCart()
      closeCart()
      showNotification("✓ Order sent to WhatsApp!")
    })
  }

  // Close cart when clicking overlay
  document.getElementById("cart-overlay").addEventListener("click", (e) => {
    if (e.target.id === "cart-overlay") {
      closeCart()
    }
  })

  // Close modal when clicking overlay
  document.getElementById("checkout-modal").addEventListener("click", (e) => {
    if (e.target.id === "checkout-modal") {
      closeCheckoutModal()
    }
  })

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("open")
    })
  })
})

// Define keyframes for slideInRight animation
const slideInRight = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

// Append style element with keyframes to the head
const style = document.createElement("style")
style.innerHTML = slideInRight
document.head.appendChild(style)


    
