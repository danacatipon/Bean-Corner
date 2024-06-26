/*for default home*/
document.addEventListener("DOMContentLoaded", function() {
    if (!window.location.hash) {
        window.location.hash = "#home";
    }
});

/*Preloader*/
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 1500);
});
/*Dark/Light Mode Toggle*/
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-toggle');
    const modeIcon = document.getElementById('mode-icon');

    // Check for saved user preference in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeIcon.textContent = '☀️';
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            modeIcon.textContent = '🌙';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            modeIcon.textContent = '☀️';
            localStorage.removeItem('darkMode');
        }
    });
});
/*Menu Toggle*/
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.querySelector('.navbar');

    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});

/*Food Menu filter*/ 
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodItems = document.querySelectorAll('.food-menu-list li');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const category = this.getAttribute('data-category');

            foodItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
/* Cart Button*/
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const sidebarCart = document.getElementById('sidebar-cart');
    const overlay = document.getElementById('overlay');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    // Initial check to disable checkout button if cart is empty
    checkCartEmpty();

    cartIcon.addEventListener('click', () => {
        sidebarCart.classList.add('open');
        overlay.classList.add('show');
    });

    closeCartButton.addEventListener('click', () => {
        sidebarCart.classList.remove('open');
        overlay.classList.remove('show');
    });

    overlay.addEventListener('click', () => {
        sidebarCart.classList.remove('open');
        overlay.classList.remove('show');
    });

    const orderButtons = document.querySelectorAll('.order-now');
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('li');
            const productName = productCard.dataset.name;
            const productPrice = productCard.dataset.price;

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${name} - ₱${price}</span>
            <button class="remove-item">x</button>
        `;

        const removeButton = cartItem.querySelector('.remove-item');
        removeButton.addEventListener('click', () => {
            cartItem.remove();
            updateTotalPrice();
            checkCartEmpty();
        });

        cartItemsContainer.appendChild(cartItem);
        updateTotalPrice();
        checkCartEmpty();
    }

    function updateTotalPrice() {
        let total = 0;
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item span');
        cartItems.forEach(item => {
            const price = parseFloat(item.textContent.split('₱')[1]);
            total += price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    function checkCartEmpty() {
        if (cartItemsContainer.children.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
            checkoutButton.disabled = true;  // Disable the checkout button
        } else {
            const noItemsMessage = cartItemsContainer.querySelector('p');
            if (noItemsMessage) {
                noItemsMessage.remove();
            }
            checkoutButton.disabled = false;  // Enable the checkout button
        }
    }

    checkoutButton.addEventListener('click', (event) => {
        if (cartItemsContainer.children.length === 0) {
            event.preventDefault();
            alert("Your cart is empty. Please add items to the cart before proceeding to checkout.");
        } else {
            window.location.href = 'transaction-form.html';
        }
    });
});



/*Gallery Section*/
document.addEventListener('DOMContentLoaded', (event) => {
    const cards = document.querySelectorAll('.img-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            removeActiveClasses();
            card.classList.add('active');
        });
    });

    function removeActiveClasses() {
        cards.forEach(card => {
            card.classList.remove('active');
        });
    }
});
