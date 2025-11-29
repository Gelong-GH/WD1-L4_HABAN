// Array of products
const products = [
    {
        id: 0,
        name: 'JBL Wireless Headphones',
        price: 1500.00,
        image: 'https://via.placeholder.com/400x400?text=Wireless+Headphones'
    },
    {
        id: 1,
        name: 'Iphone 14 pro max',
        price: 25500.00,
        image: 'https://via.placeholder.com/400x400?text=Smartphone'
    },
    {
        id: 2,
        name: 'Asus TUF Gaming Laptop',
        price: 34990.00,
        image: 'https://via.placeholder.com/400x400?text=Laptop'
    },
    {
        id: 3,
        name: 'Samsung Galaxy Watch 7',
        price: 16990.00,
        image: 'https://via.placeholder.com/400x400?text=Smartwatch'
    }
];

// DOM Elements
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart display
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>₱${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
    });
    
    totalPriceEl.textContent = `Total: ₱${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const quantityInput = document.getElementById(`quantity-${productId}`);
        const quantity = parseInt(quantityInput.value);
        
        if (quantity > 0) {
            const product = products.find(p => p.id === productId);
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...product, quantity });
            }
            updateCart();
            alert(`${product.name} added to cart!`);
        }
    });
});

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout (placeholder)
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
        // Here you could redirect to a checkout page or integrate with a payment system
    } else {
        alert('Your cart is empty!');
    }
});

// Initialize cart on page load
updateCart();
