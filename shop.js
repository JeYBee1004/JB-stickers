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
const products = [
  {
    id: "1",
    name: "Rubiks cube",
    price: 50.00,
    rating: 4.8,
    category: "",
    image: "https://imgur.com/2062QUf.jpg",
    description: "Colorful emoji stickers perfect for expressing yourself",
  },
  {
    id: "2",
    name: "Converse",
    price: 50.00,
    rating: 4.9,
    category: "",
    image: "https://imgur.com/BTMIRdP.jpg",
    description: "Converse Merchandise",
  },
  {
    id: "3",
    name: "Obey The Brave",
    price: 50.00,
    rating: 4.7,
    category: "",
    image: "https://imgur.com/gjnOOsr.jpg",
    description: "A space card with a strong theme",
  },
  {
    id: "4",
    name: "Nike",
    price: 50.00,
    rating: 4.8,
    category: "",
    image: "https://imgur.com/x8P9ABV.jpg",
    description: "Just Do It",
  },
  {
    id: "5",
    name: "Hi Eye",
    price: 50.00,
    rating: 4.9,
    category: "",
    image: "https://imgur.com/fL2qzNk.jpg",
    description: "For the road.",
  },
  {
    id: "6",
    name: "Crazy Banana",
    price: 50.00,
    rating: 4.8,
    category: "",
    image: "https://imgur.com/Smx3NdZ.jpg",
    description: "Crazy banana.",
  },
  {
    id: "7",
    name: "Squid World",
    price: 50.00,
    rating: 4.0,
    category: "",
    image: "https://imgur.com/zTWrLtA.jpg",
    description: "Tou gotta be squidding me.",
  },
  {
    id: "8",
    name: "Skull Face",
    price: 50.00,
    rating: 4.9,
    category: "",
    image: "https://imgur.com/whG02HM.jpg",
    description: "Skull face.",
  },
  {
    id: "9",
    name: "Cute babie",
    price: 50.00,
    rating: 4.5,
    category: "",
    image: "https://imgur.com/2Bgilsr.jpg",
    description: "Cute Babie.",
  },
  {
    id: "10",
    name: "Decker Bus",
    price: 50.00,
    rating: 4.2,
    category: "",
    image: "https://imgur.com/2HCjzjD.jpg",
    description: "A london double decker bus.",
  },
  {
    id: "11",
    name: "Outbreak",
    price: 50.00,
    rating: 4.4,
    category: "",
    image: "https://imgur.com/sNwlG2v.jpg",
    description: "Radioactive Zombie Outbreak Sign.",
  },
  {
    id: "12",
    name: "Pacific rim",
    price: 50.00,
    rating: 4.6,
    category: "",
    image: "https://imgur.com/to9JaDI.jpg",
    description: "A Sci-fi preview of the movie Pacific rim.",
  },
  {
    id: "13",
    name: "Butterfly effect",
    price: 50.00,
    rating: 4.9,
    category: "",
    image: "https://imgur.com/SQA0Qyb.jpg",
    description: "Green Butterfly Effect.",
  },
  {
    id: "14",
    name: "Vacation",
    price: 50.00,
    rating: 4.4,
    category: "",
    image: "https://imgur.com/a3Oc0he.jpg",
    description: "Bamboo on vacation.",
  },
  {
    id: "15",
    name: "London",
    price: 50.00,
    rating: 4.7,
    category: "",
    image: "https://imgur.com/BjNxtyP.jpg",
    description: "A london saloon car.",
  },
  {
    id: "16",
    name: "The paper",
    price: 50.00,
    rating: 4.5,
    category: "",
    image: "https://imgur.com/9XdySe9.jpg",
    description: "A lady relaxing, covered with a newspaper.",
  },
  {
    id: "17",
    name: "Michael Jackson ",
    price: 50.00,
    rating: 4.6,
    category: "",
    image: "https://imgur.com/nCWql2c.jpg",
    description: "A lady relaxing, covered with a newspaper.",
  },
]

let cart = []
let searchFilter = ""


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

function addToCart(id, name, price, image) {
  const existingItem = cart.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ id, name, price, image, quantity: 1 })
  }

  updateCart()
  showNotification("Added to cart!")
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
  `
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 2000)
}

function renderProducts() {
  const grid = document.getElementById("products-grid")
  const noResults = document.getElementById("no-results")

  const filtered = products.filter((product) => {
    return product.name.toLowerCase().includes(searchFilter.toLowerCase())
  })

  if (filtered.length === 0) {
    grid.style.display = "none"
    noResults.style.display = "block"
  } else {
    grid.style.display = "grid"
    noResults.style.display = "none"

    grid.innerHTML = filtered
      .map(
        (product) => `
          <div class="shop-product-card">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="shop-product-content">
                  <div class="shop-product-header">
                      <span class="shop-category-badge">${product.category || "Sticker"}</span>
                      <div class="product-rating">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>${product.rating}</span>
                      </div>
                  </div>
                  <h3 class="shop-product-name">${product.name}</h3>
                  <p class="shop-product-description">${product.description}</p>
                  <div class="shop-product-footer">
                      <span class="product-price">Ksh ${product.price.toFixed(2)}</span>
                  </div>
              </div>
              <div class="shop-product-action">
                  <button class="btn btn-primary" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">
                      Add to Cart
                  </button>
              </div>
          </div>
      `,
      )
      .join("")
  }
}

function openCheckoutModal() {
  document.getElementById("checkout-modal").classList.add("open")
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("open")
}

function sendToWhatsApp(fullname, email, contact, location) {
  const phoneNumber = "254710709997"

  let cartSummary = ""
  let totalAmount = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    totalAmount += itemTotal
    cartSummary += `\n• ${item.name} x${item.quantity} = Ksh ${itemTotal.toFixed(2)}`
  })

  const message = `🛍️ *NEW ORDER*\n\n*Customer Details:*\nName: ${fullname}\nEmail: ${email}\nContact: ${contact}\nLocation: ${location}\n\n*Order Items:*${cartSummary}\n\n*Total: Ksh ${totalAmount.toFixed(2)}*\n\n✅ Ready for processing`

  const encodedMessage = encodeURIComponent(message)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  window.open(whatsappURL, "_blank")
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme()

  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCart()
  }

  renderProducts()

  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)
  document.getElementById("mobile-menu-btn").addEventListener("click", toggleMobileMenu)
  document.getElementById("cart-btn").addEventListener("click", openCart)
  document.getElementById("close-cart").addEventListener("click", closeCart)

  const checkoutBtn = document.querySelector(".checkout-btn")
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

      sendToWhatsApp(fullname, email, contact, location)

      checkoutForm.reset()
      closeCheckoutModal()
      cart = []
      updateCart()
      closeCart()
      showNotification("✓ Order sent to WhatsApp!")
    })
  }

  document.getElementById("search-input").addEventListener("input", (e) => {
    searchFilter = e.target.value
    renderProducts()
  })

  document.getElementById("cart-overlay").addEventListener("click", (e) => {
    if (e.target.id === "cart-overlay") {
      closeCart()
    }
  })

  document.getElementById("checkout-modal").addEventListener("click", (e) => {
    if (e.target.id === "checkout-modal") {
      closeCheckoutModal()
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("open")
    })
  })
})

