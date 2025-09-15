document.addEventListener('DOMContentLoaded', function() {

    // Корзина
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    // Показать/скрыть корзину по клику на иконку
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('show');
    });

    // Скрыть корзину при клике вне её
    document.addEventListener('click', function(e) {
        if (!cartDropdown.contains(e.target) && e.target !== cartIcon) {
            cartDropdown.classList.remove('show');
        }
    });

    // Добавление в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));

            cart.push({ name, price });
            updateCart();
            
            // Эффект: кнопка на мгновение меняет текст
            const originalText = button.textContent;
            button.textContent = "Добавлено!";
            button.style.background = "#4e342e";
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = "";
            }, 800);
        });
    });

    function updateCart() {
        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartItems.innerHTML = "Корзина пуста";
            return;
        }

        let html = "";
        let total = 0;

        cart.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.price} ₽</span>
                </div>
            `;
            total += item.price;
        });

        html += `<div class="cart-item" style="border-top: 1px solid #eee; margin-top: 10px; padding-top: 10px; font-weight: 600;">
                    Итого: ${total} ₽
                 </div>`;

        cartItems.innerHTML = html;
    }

    // Фильтры каталога
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

});