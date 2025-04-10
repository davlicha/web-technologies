// Pure functions
const generateId = () => Date.now().toString(36) + Math.random().toString(36);

const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + parseFloat(product.price), 0);
};

const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
};

const showSnackbar = (message) => {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.style.visibility = 'visible';

    setTimeout(() => {
        snackbar.style.visibility = 'hidden';
    }, 3000);
};

const filterProducts = (products, category) => {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
};

const sortProducts = (products, sortBy) => {
    switch (sortBy) {
        case 'price':
            return [...products].sort((a, b) => a.price - b.price);
        case 'date-created':
            return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'date-updated':
            return [...products].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        default:
            return products;
    }
};

// DOM manipulation functions
const renderProducts = (products) => {
    const productsList = document.getElementById('products-list');
    const totalPriceElement = document.getElementById('total-price');

    // Calculate and display total price
    const totalPrice = calculateTotalPrice(products);
    totalPriceElement.textContent = formatPrice(totalPrice);

    // Clear the list
    productsList.innerHTML = '';

    if (products.length === 0) {
        productsList.innerHTML = '<p class="empty-message">Наразі список товарів пустий. Додайте новий товар.</p>';
        return;
    }

    // Render each product
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p class="product-id">ID: ${product.id}</p>
                    <h3>${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)} грн</p>
                    <span class="product-category">${getCategoryName(product.category)}</span>
                    <div class="product-actions">
                        <button class="edit-btn" data-id="${product.id}">Редагувати</button>
                        <button class="delete-btn" data-id="${product.id}">Видалити</button>
                    </div>
                `;
        productsList.appendChild(productCard);
    });
};

const getCategoryName = (category) => {
    const categories = {
        'electronics': 'Електроніка',
        'clothing': 'Одяг',
        'books': 'Книги',
        'home': 'Дім'
    };
    return categories[category] || category;
};

const openModal = (product = null) => {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('product-form');

    if (product) {
        modalTitle.textContent = 'Редагувати товар';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-image').value = product.image;
    } else {
        modalTitle.textContent = 'Додати новий товар';
        form.reset();
    }

    modal.style.display = 'flex';
};

const closeModal = () => {
    document.getElementById('product-modal').style.display = 'none';
};

// State management
let products = [];
let currentFilter = 'all';
let currentSort = null;

// Event handlers
const handleAddProduct = () => {
    openModal();
};

const handleSubmitProduct = (e) => {
    e.preventDefault();

    const form = e.target;
    const id = form.querySelector('#product-id').value;
    const name = form.querySelector('#product-name').value;
    const price = form.querySelector('#product-price').value;
    const category = form.querySelector('#product-category').value;
    const image = form.querySelector('#product-image').value;
    const now = new Date().toISOString();

    if (id) {
        // Update existing product
        products = products.map(product => {
            if (product.id === id) {
                return {
                    ...product,
                    name,
                    price,
                    category,
                    image,
                    updatedAt: now
                };
            }
            return product;
        });

        showSnackbar(`Товар оновлено: ${name} (ID: ${id})`);
    } else {
        // Add new product
        const newProduct = {
            id: generateId(),
            name,
            price,
            category,
            image,
            createdAt: now,
            updatedAt: now
        };

        products.push(newProduct);
        showSnackbar(`Товар додано: ${name}`);
    }

    closeModal();
    applyFiltersAndSort();
};

const handleDeleteProduct = (id) => {
    const product = products.find(p => p.id === id);
    products = products.filter(p => p.id !== id);

    showSnackbar(`Товар видалено: ${product.name}`);
    applyFiltersAndSort();
};

const handleEditProduct = (id) => {
    const product = products.find(p => p.id === id);
    openModal(product);
};

const handleFilterClick = (category) => {
    currentFilter = category;
    applyFiltersAndSort();
};

const handleSortClick = (sortBy) => {
    currentSort = sortBy;
    applyFiltersAndSort();
};

const handleResetSort = () => {
    currentSort = null;
    applyFiltersAndSort();
};

const applyFiltersAndSort = () => {
    let filteredProducts = filterProducts(products, currentFilter);

    if (currentSort) {
        filteredProducts = sortProducts(filteredProducts, currentSort);
    }

    renderProducts(filteredProducts);
};

// Initialize the app
const init = () => {
    // Sample data for testing
    products = [
        {
            id: generateId(),
            name: 'Смартфон Samsung Galaxy S21',
            price: 21999,
            category: 'electronics',
            image: 'img/Samsung_Galaxy_S21_Ultra.png',
            createdAt: '2023-01-15T10:00:00Z',
            updatedAt: '2023-01-15T10:00:00Z'
        },
        {
            id: generateId(),
            name: 'Футболка чоловіча',
            price: 499,
            category: 'clothing',
            image: 'img/man_shirt.png',
            createdAt: '2023-02-20T14:30:00Z',
            updatedAt: '2023-02-20T14:30:00Z'
        },
        {
            id: generateId(),
            name: 'Книга "JavaScript для дітей"',
            price: 350,
            category: 'books',
            image: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/1/1/11_20_674.jpg',
            createdAt: '2023-03-05T09:15:00Z',
            updatedAt: '2023-03-10T11:20:00Z'
        }
    ];

    // Set up event listeners
    document.getElementById('add-product-btn').addEventListener('click', handleAddProduct);
    document.getElementById('product-form').addEventListener('submit', handleSubmitProduct);
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-form').addEventListener('click', closeModal);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            handleDeleteProduct(e.target.dataset.id);
        }

        if (e.target.classList.contains('edit-btn')) {
            handleEditProduct(e.target.dataset.id);
        }

        if (e.target.classList.contains('filter-btn')) {
            handleFilterClick(e.target.dataset.category);
        }

        if (e.target.classList.contains('sort-btn')) {
            handleSortClick(e.target.dataset.sort);
        }

        if (e.target.classList.contains('reset-sort-btn')) {
            handleResetSort();
        }
    });

    // Close modal when clicking outside
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('product-modal')) {
            closeModal();
        }
    });

    // Initial render
    applyFiltersAndSort();
};

// Start the app
document.addEventListener('DOMContentLoaded', init);