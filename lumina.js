const navBtn = document.querySelectorAll(".header");
const surveyBtn = document.getElementById("open-form-btn");
const form = document.querySelector("form");
const body = document.body;
const closeBtn = document.getElementById("close-form-btn");

// Function to adjust position when text goes off screen
function adjustHiddenTextPosition(element) {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  
  // Reset left position first
  element.style.left = '50%';
  
  // Recalculate after reset
  const newRect = element.getBoundingClientRect();
  
  // If text box goes off right edge
  if (newRect.right > viewportWidth - 20) {
    const overflow = newRect.right - (viewportWidth - 20);
    element.style.left = `calc(50% - ${overflow}px)`;
  }
  
  // If text box goes off left edge
  if (newRect.left < 20) {
    const overflow = 20 - newRect.left;
    element.style.left = `calc(50% + ${overflow}px)`;
  }
}

// Nav button click handlers - same logic for all screen sizes
navBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const hiddenText = btn.nextElementSibling;
    
    // Close ALL other hidden texts first (on all screen sizes)
    document.querySelectorAll(".hidden-text").forEach(text => {
      if (text !== hiddenText) {
        text.classList.remove("show");
      }
    });
    
    // Then toggle the clicked button's text
    hiddenText.classList.toggle("show");
    
    // Adjust position if it's now visible
    if (hiddenText.classList.contains("show")) {
      setTimeout(() => adjustHiddenTextPosition(hiddenText), 50);
    }
    
    console.log("Button clicked, hiddenText has show class:", hiddenText.classList.contains("show"));
  });
});

// Listen for window resize to readjust visible text
window.addEventListener('resize', () => {
  document.querySelectorAll(".hidden-text.show").forEach(text => {
    adjustHiddenTextPosition(text);
  });
});

surveyBtn.addEventListener("click", () => {
  form.classList.add("show");
  surveyBtn.style.visibility = "hidden";
  
  navBtn.forEach((btn) => {
    const hiddenText = btn.nextElementSibling;
    if (hiddenText && hiddenText.classList.contains("show")) {
      hiddenText.classList.remove("show");
    }
  });

  // hide nav buttons
  navBtn.forEach(btn => btn.style.display = "none");

  // change background
  body.style.backgroundImage = 'url("face-mask-bcg.jpg")';
  body.style.backgroundSize = 'cover';
  body.style.backgroundRepeat = 'no-repeat';
  body.style.backgroundPosition = 'center';
});

closeBtn.addEventListener("click", () => {
  form.classList.remove("show");
  surveyBtn.style.visibility = "visible";

  // restore nav buttons
  navBtn.forEach(btn => btn.style.display = "block");
  
  // restore hidden texts display
  navBtn.forEach((btn) => {
    const hiddenText = btn.nextElementSibling;
    if (hiddenText) {
      hiddenText.style.display = '';
    }
  });

  // restore background
  body.style.backgroundImage = 'url("lumina-bg.jpg")';
  body.style.backgroundSize = 'cover';
  body.style.backgroundRepeat = 'repeat';
  body.style.backgroundPosition = 'center';
});

// Form submission validation
form.addEventListener("submit", e => {
  const checkboxes = document.querySelectorAll('input[name="used-products"]');
  const oneChecked = Array.from(checkboxes).some(c => c.checked);

  if (!oneChecked) {
    e.preventDefault();
    alert("Please select at least one product you used.");
  }
});

const productCards = document.getElementById("products-card-container");
const productsContainer = document.getElementById("products-container");
const totalNumberOfItems = document.querySelector(".total-items");
const cartSubTotal = document.querySelector(".subtotal");
const cartTaxes = document.querySelector(".taxes");
const cartTotal = document.querySelector(".total");
const clearCartBtn = document.getElementById("clear-cart-btn");


// Products data
const products = [
  { id: 1, name: "Shampoo and Conditioner", price: 18 },
  { id: 2, name: "Face mask", price: 12 },
  { id: 3, name: "Eye cream", price: 21 },
  { id: 4, name: "Daily moisturizer", price: 18 },
  { id: 5, name: "Nighttime moisturizer", price: 21 },
  { id: 6, name: "Facial cleanser", price: 12 },
];

// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
    this.taxRate = 8.25;
  }

  addItems(product) {
    this.items.push(product);
    this.updateCartDOM();
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    if (confirm("Are you sure you want to clear all items?")) {
        this.items = [];
        this.updateCartDOM();
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    const total = subTotal + tax;

    this.total = total;

    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;

    return {subTotal, tax, total};
  }

  removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.updateCartDOM();
        }
    }

updateCartDOM() {
    const totalCountPerProduct = {};
    this.items.forEach(item => {
      totalCountPerProduct[item.id] = (totalCountPerProduct[item.id] || 0) + 1;
    });

    productsContainer.innerHTML = "";

    Object.keys(totalCountPerProduct).forEach(id => {
        const product = products.find(p => p.id === Number(id));
        const quantity = totalCountPerProduct[id];
        const totalPrice = product.price * quantity;

        const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <p>
        <span class="product-count">${quantity}x </span>${product.name}</span>
        <span>$${totalPrice.toFixed(2)}<span>
        <button class="remove-item-btn" data-id="${product.id}">X</button>
        </p>
      `;
      productsContainer.appendChild(div);
    });

    const removeButtons = document.querySelectorAll(".remove-item-btn");

    removeButtons.forEach( btn => {
        btn.addEventListener("click", () => {
            const productId = parseInt(btn.dataset.id);
            this.removeItem(productId);
        });
    });

    const {subTotal, tax, total} = this.calculateTotal();
    totalNumberOfItems.textContent = this.getCounts();
    }

}

// Create cart instance
const cart = new ShoppingCart();

// Generate product cards and attach button listeners
products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  const h2 = document.createElement("h2");
  h2.textContent = `${product.name} $${product.price}`;
  card.appendChild(h2);

  const btn = document.createElement("button");
  btn.textContent = "Add to cart";
  btn.className = "add-to-cart-btn";

  // Attach event listener here
  btn.addEventListener("click", () => {
    cart.addItems(product);
  
    showButtonNotification(btn, "Added to cart");
  });

function showButtonNotification (button, message) {
const notification = document.createElement("div");
notification.className = "button-notification";
notification.textContent = message;
button.appendChild(notification);

setTimeout(() => notification.classList.add("show"), 100);
setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}
  card.appendChild(btn);

  const img = document.createElement("img");
  img.src = `${product.name.toLowerCase().replace(/ /g, "-")}.jpg`;
  img.alt = product.name;
  img.className = "product-hover-image";
  img.style.display = "none";

  card.addEventListener("mouseenter", () => {
    const rect = card.getBoundingClientRect();
    img.style.display = "block";
    img.style.position = "fixed";
    img.style.top = `${rect.top + (rect.height / 2) - 200}px`; 
    img.style.left = `${rect.right - 200}px`;
  });

  card.addEventListener("mouseleave", () => {
    img.style.display = "none";
  });

  
  card.appendChild(img);

  productCards.appendChild(card);
  productCards.appendChild(img);
});

clearCartBtn.addEventListener("click", () => cart.clearCart());

//checkout functionality//
const checkOutBtn = document.getElementById("check-out-btn");

checkOutBtn.addEventListener("click", () => {
  if (cart.items.length === 0) {
    alert("Your cart is empty! Add some products before checking out.");
    return;
  }

//hide cart and show checkout form//
const cartContainer =  document.getElementById("cart-container");
cartContainer.classList.remove("show");

//hide survey button during checkout//
const surveyBtn = document.getElementById("open-form-btn");
surveyBtn.style.visibility = "hidden";

showCheckoutForm();
});

function showCheckoutForm() {
  //create checkout overlay//
  const checkoutOverlay = document.createElement("div");
  checkoutOverlay.id = "checkout-overlay";
  checkoutOverlay.innerHTML = `
  <div id="checkout-form">
   <h2>Checkout</h2>
   <button id="close-checkout" class="close-btn">&times;</button>
  
   <div id="checkout-steps">
    <div class="step active" data-step="1">1. 
    <br>Order Summary</div>
    <div class="step" data-step="2">2. Shipping Info</div>
    <div class="step" data-step="3">3. Payment info</div>
    <div class="step" data-step="4">4. Confirmation</div>
   </div>

   <div id="checkout-content">${generateOrderSummary()}</div>

   <div id="checkout-buttons">
    <button id="checkout-prev" style="display:none;">Previous</div>
    <button id="checkout-next">Continue To Shipping</button>
   </div>
  </div>
  `;

  document.body.appendChild(checkoutOverlay);

  setupCheckoutListeners();
}

function generateOrderSummary() {
  const {subTotal, tax, total} = cart.calculateTotal();

  let orderHTML = `<div class="checkout-section">
  <h3>Order Summary</h3><div class="order-items">`;

  const totalCountPerProduct = {};
  cart.items.forEach(item => {
    totalCountPerProduct[item.id] = (totalCountPerProduct[item.id] || 0) +1;
  });

  Object.keys(totalCountPerProduct).forEach( id => {
    const product = products.find(p => p.id === Number(id));
    const quantity = totalCountPerProduct[id];
    const itemTotal = product.price * quantity;

    orderHTML += `
    <div class="order-item">
      <span class="item-name">${product.name}</span>
      <span class="item-quantity">Qty: ${quantity}</span>
      <span class="item-price">$${itemTotal.toFixed(2)}</span>
    </div>`;
  });

  orderHTML += `
  </div>
  <div class="order-totals"> 
    <div class="total-line">Subtotal: $${subTotal.toFixed(2)}</div>
    <div class="total-line">Tax: $${tax.toFixed(2)}</div>
    <div class="total-line final-total">Total: $${total.toFixed(2)}</div>
  </div>
  </div>`;

  return orderHTML;
}

function generateShippingForm() {
  return `
  <div class="checkout-section">
    <h3>Shipping Information</h3>
    <form id="shipping-form">
      <div class="form-row">
        <input type="text" id="first-name" placeholder="First Name" required>
        <input type="text" id="last-name" placeholder="Last Name" required>
      </div>
      <input type="email" id="shipping-email" placeholder="Email Address" required>
      <input type="text" id="address" placeholder="Street Address" required>
      <div class="form-row">
         <input type="text" id="city" placeholder="City" required>
         <input type="text" id="state" placeholder="State" required>
         <input type="text" id="zip" placeholder="ZIP Code" required>
      </div>
    </form>
  </div>    
  `;
}

function generatePaymentForm () {
  return `
  <div class="checkout-section">
    <h3>Payment Information</h3>
    <div class="payment-note">
      <p><strong>Demo Mode:</strong>This is a portfolio project. 
      No real payment will be processed.</p>
    </div>
    <form id="payment-form">
      <input type="text" id="card-number" 
      placeholder="Card Number (4444 4444 4444 4444)" maxlength="19">
      <div class="form-row">
        <input type="text" id="expiry" placeholder="MM/YY" maxlength="5">
        <input type="text" id="cvv" placeholder=""CVV" maxlength="3">
      </div>  
    <input type="text" id="cardholder-name" placeholder="Cardholder Name" required>
  </form>
  </div>
  `;
}

function generateConfirmation (orderNumber) {
return `
  <div class="checkout-section confirmation">
    <h3>Order confirmed!</h3>
    <div class="success-message">
      <p>Thank you for your order!</p>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p>You will receive a confirmation email shortly.</p>
      <p><strong>Note:</strong>This is a demo order - no payment was actually processed.</p>
    </div>
  </div>`;
}

function setupCheckoutListeners() {
  let currentStep = 1;

  const overlay = document.getElementById("checkout-overlay");
  const content = document.getElementById("checkout-content");
  const prevBtn = document.getElementById("checkout-prev");
  const nextBtn = document.getElementById("checkout-next");
  const closeBtn = document.getElementById("close-checkout");

  closeBtn.addEventListener("click", closeCheckout);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCheckout();
  });

  nextBtn.addEventListener("click", () => {
    if(currentStep < 4) {
      if(validateCurrentStep(currentStep)) {
        currentStep++; updateCheckoutStep(currentStep);
      }
    }
    else {
      processOrder();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      updateCheckoutStep(currentStep);
    }
  });

  function updateCheckoutStep(step) {
    document.querySelectorAll(".step").forEach((stepEl, index) => {
      stepEl.classList.toggle("active", index + 1 === step);
    });

    switch(step) {
      case 1:
        content.innerHTML = generateOrderSummary();
        prevBtn.style.display = "none";
        nextBtn.textContent = "Continue to Shipping";
        break;
      case 2:
        content.innerHTML = generateShippingForm();
        prevBtn.style.display = "inline-block";
        nextBtn.textContent = "Continue to Payment";
        break;
      case 3:
        content.innerHTML = generatePaymentForm();
        nextBtn.textContent = "Place Order";
        setupCardFormatting();
        break;
      case 4:
        const orderNumber = "LUM-" + Date.now().toString().slice(-6); 
        content.innerHTML = generateConfirmation(orderNumber);
        prevBtn.style.display = "none";
        nextBtn.textContent = "Close";
        break;     
    }
  }

function validateCurrentStep(step) {
  switch(step) {
    case 1:
      return true; //Order summary doesn't need validation
    case 2:
      return validateShippingForm();
    case 3:
      return validatePaymentForm();
    default:
      return true;      
  }
}

function validateShippingForm() {
  const required = ['first-name', 'last-name', 'shipping-email', 'address', 'city', 'state', 'zip'];
  
  for (let field of required) {
    const input = document.getElementById(field);
    if (!input || !input.value.trim()) {
      alert(`Please fill in the ${field.replace('-', ' ')} field.`);
      return false;
    }
  }
  return true;
}

function validatePaymentForm() {
  const cardNumber = document.getElementById("card-number").value.replace(/\s/g, "");
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;
  const cardholder = document.getElementById("cardholder-name").value;

  if(cardNumber.length !== 16) {
    alert("Please enter a valid 16-digit card number.");
    return false;
  }

  if(!expiry.match(/^\d{2}\/\d{2}$/)) {
    alert("Please enter expiration date in MM/YY format.");
    return false;
  }

  if(cvv.length !== 3) {
    alert("Please enter a valid 3-digit CVV.");
    return false;
  }

  if(!cardholder.trim()) {
    alert("Please enter the carholder name.");
    return false;
  }
  return true;
  }


function setupCardFormatting() {
  const cardInput = document.getElementById("card-number");
  const expiryInput = document.getElementById("expiry");

  cardInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    e.target.value = formattedValue;
  });

  expiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0,2) + "/" + value.substring(2,4);
    }
    e.target.value = value;
  });
}

function processOrder() {
  //simulate processing delay
  nextBtn.textContent = "Processing...";

  setTimeout(() => {
    currentStep = 4;
    updateCheckoutStep(4);
    //clear cart after successful order
    cart.items = [];
    cart.updateCartDOM();
  }, 2000);

   nextBtn.addEventListener("click", closeCheckout);
}

function closeCheckout() {
  document.body.removeChild(overlay);
  const surveyBtn = document.getElementById("open-form-btn");
  surveyBtn.style.visibility = "visible";
}
}


