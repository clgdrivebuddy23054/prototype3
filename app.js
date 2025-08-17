// Kirana Store Management System - Fixed Version
class KiranaStore {
    constructor() {
        this.db = null;
        this.currentTab = 'dashboard';
        this.recognition = null;
        this.isListening = false;
        this.chart = null;
        this.theme = localStorage.getItem('theme') || 'system';
        this.isInitialized = false;
        
        // Sample data with the exact structure from user requirements
        this.sampleData = {
            products: [
                {
                    id: "prod_001",
                    name: "Basmati Rice",
                    category: "Grains",
                    currentStock: 50,
                    minStock: 10,
                    unit: "kg",
                    costPrice: 80,
                    sellingPrice: 100,
                    lastUpdated: "2024-01-15T10:00:00Z"
                },
                {
                    id: "prod_002",
                    name: "Moong Dal",
                    category: "Pulses",
                    currentStock: 25,
                    minStock: 5,
                    unit: "kg",
                    costPrice: 120,
                    sellingPrice: 150,
                    lastUpdated: "2024-01-14T10:00:00Z"
                },
                {
                    id: "prod_003",
                    name: "Sunflower Oil",
                    category: "Oils",
                    currentStock: 30,
                    minStock: 8,
                    unit: "L",
                    costPrice: 140,
                    sellingPrice: 170,
                    lastUpdated: "2024-01-13T10:00:00Z"
                },
                {
                    id: "prod_004",
                    name: "Turmeric Powder",
                    category: "Spices",
                    currentStock: 15,
                    minStock: 3,
                    unit: "kg",
                    costPrice: 200,
                    sellingPrice: 250,
                    lastUpdated: "2024-01-12T10:00:00Z"
                },
                {
                    id: "prod_005",
                    name: "Wheat Flour",
                    category: "Grains",
                    currentStock: 40,
                    minStock: 10,
                    unit: "kg",
                    costPrice: 35,
                    sellingPrice: 45,
                    lastUpdated: "2024-01-11T10:00:00Z"
                },
                {
                    id: "prod_006",
                    name: "Red Onions",
                    category: "Vegetables",
                    currentStock: 3,
                    minStock: 5,
                    unit: "kg",
                    costPrice: 25,
                    sellingPrice: 35,
                    lastUpdated: "2024-01-10T10:00:00Z"
                }
            ],
            customers: [
                {
                    id: "cust_001",
                    name: "Rajesh Kumar",
                    phone: "+91 9876543210",
                    address: "123 Main Street, Delhi",
                    totalPurchases: 2500,
                    loyaltyPoints: 125,
                    lastVisit: "2024-01-15",
                    joinDate: "2023-06-15"
                },
                {
                    id: "cust_002",
                    name: "Priya Sharma",
                    phone: "+91 9876543211",
                    address: "456 Park Avenue, Mumbai",
                    totalPurchases: 1800,
                    loyaltyPoints: 90,
                    lastVisit: "2024-01-14",
                    joinDate: "2023-08-20"
                },
                {
                    id: "cust_003",
                    name: "Amit Patel",
                    phone: "+91 9876543212",
                    address: "789 Garden Road, Pune",
                    totalPurchases: 3200,
                    loyaltyPoints: 160,
                    lastVisit: "2024-01-13",
                    joinDate: "2023-04-10"
                },
                {
                    id: "cust_004",
                    name: "Sita Devi",
                    phone: "+91 9876543213",
                    address: "321 Temple Street, Varanasi",
                    totalPurchases: 1500,
                    loyaltyPoints: 75,
                    lastVisit: "2024-01-12",
                    joinDate: "2023-09-05"
                }
            ],
            sales: [
                {
                    id: "sale_001",
                    productId: "prod_001",
                    productName: "Basmati Rice",
                    customerId: "cust_001",
                    customerName: "Rajesh Kumar",
                    quantity: 2,
                    unitPrice: 100,
                    totalAmount: 200,
                    date: "2024-01-15",
                    time: "10:30 AM"
                },
                {
                    id: "sale_002",
                    productId: "prod_002",
                    productName: "Moong Dal",
                    customerId: "cust_002",
                    customerName: "Priya Sharma",
                    quantity: 1,
                    unitPrice: 150,
                    totalAmount: 150,
                    date: "2024-01-14",
                    time: "2:15 PM"
                },
                {
                    id: "sale_003",
                    productId: "prod_003",
                    productName: "Sunflower Oil",
                    customerId: "cust_003",
                    customerName: "Amit Patel",
                    quantity: 3,
                    unitPrice: 170,
                    totalAmount: 510,
                    date: "2024-01-13",
                    time: "4:45 PM"
                },
                {
                    id: "sale_004",
                    productId: "prod_004",
                    productName: "Turmeric Powder",
                    customerId: "cust_001",
                    customerName: "Rajesh Kumar",
                    quantity: 1,
                    unitPrice: 250,
                    totalAmount: 250,
                    date: "2024-01-12",
                    time: "11:20 AM"
                },
                {
                    id: "sale_005",
                    productId: "prod_005",
                    productName: "Wheat Flour",
                    customerId: "cust_004",
                    customerName: "Sita Devi",
                    quantity: 5,
                    unitPrice: 45,
                    totalAmount: 225,
                    date: "2024-01-11",
                    time: "3:30 PM"
                },
                {
                    id: "sale_006",
                    productId: "prod_001",
                    productName: "Basmati Rice",
                    customerId: "cust_003",
                    customerName: "Amit Patel",
                    quantity: 3,
                    unitPrice: 100,
                    totalAmount: 300,
                    date: "2024-01-10",
                    time: "9:15 AM"
                }
            ],
            categories: ["Grains", "Pulses", "Oils", "Spices", "Dairy", "Beverages", "Snacks", "Household", "Vegetables", "Fruits"]
        };
    }

    async init() {
        try {
            console.log('Initializing Kirana Store Management System...');
            
            // Initialize database first
            await this.initDB();
            console.log('Database initialized successfully');
            
            // Load initial sample data
            await this.loadInitialData();
            console.log('Initial data loaded successfully');
            
            // Initialize UI components
            this.initEventListeners();
            this.initTheme();
            this.initVoiceRecognition();
            
            // Set initial tab and load dashboard
            this.switchTab('dashboard');
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('Kirana Store Management System initialized successfully');
            this.showToast('Application loaded successfully!', 'success');
            
        } catch (error) {
            console.error('Critical error during initialization:', error);
            this.showToast('Failed to initialize application', 'error');
        }
    }

    // ========================================
    // DATABASE MANAGEMENT - FIXED
    // ========================================
    
    async initDB() {
        return new Promise((resolve, reject) => {
            console.log('Opening IndexedDB...');
            const request = indexedDB.open('KiranaStoreDB', 2);
            
            request.onerror = (event) => {
                console.error('Database error:', event.target.error);
                reject(new Error('Failed to open database'));
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Database opened successfully');
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                console.log('Database upgrade needed, creating object stores...');
                const db = event.target.result;
                
                // Create object stores with proper structure
                try {
                    if (!db.objectStoreNames.contains('products')) {
                        const productStore = db.createObjectStore('products', { keyPath: 'id' });
                        productStore.createIndex('name', 'name', { unique: false });
                        productStore.createIndex('category', 'category', { unique: false });
                        console.log('Products store created');
                    }
                    
                    if (!db.objectStoreNames.contains('customers')) {
                        const customerStore = db.createObjectStore('customers', { keyPath: 'id' });
                        customerStore.createIndex('name', 'name', { unique: false });
                        customerStore.createIndex('phone', 'phone', { unique: false });
                        console.log('Customers store created');
                    }
                    
                    if (!db.objectStoreNames.contains('sales')) {
                        const salesStore = db.createObjectStore('sales', { keyPath: 'id' });
                        salesStore.createIndex('date', 'date', { unique: false });
                        salesStore.createIndex('productId', 'productId', { unique: false });
                        salesStore.createIndex('customerId', 'customerId', { unique: false });
                        console.log('Sales store created');
                    }
                    
                    if (!db.objectStoreNames.contains('settings')) {
                        db.createObjectStore('settings', { keyPath: 'key' });
                        console.log('Settings store created');
                    }
                } catch (error) {
                    console.error('Error creating object stores:', error);
                }
            };
        });
    }

    async getData(storeName) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const request = store.getAll();
                
                request.onsuccess = () => {
                    resolve(request.result || []);
                };
                
                request.onerror = () => {
                    console.error(`Error getting data from ${storeName}:`, request.error);
                    reject(new Error(`Failed to get data from ${storeName}`));
                };
                
                transaction.onerror = () => {
                    console.error(`Transaction error for ${storeName}:`, transaction.error);
                    reject(new Error(`Transaction failed for ${storeName}`));
                };
            } catch (error) {
                console.error(`Critical error getting data from ${storeName}:`, error);
                reject(error);
            }
        });
    }

    async saveData(storeName, data) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.put(data);
                
                request.onsuccess = () => {
                    resolve();
                };
                
                request.onerror = () => {
                    console.error(`Error saving data to ${storeName}:`, request.error);
                    reject(new Error(`Failed to save data to ${storeName}`));
                };
                
                transaction.onerror = () => {
                    console.error(`Transaction error for ${storeName}:`, transaction.error);
                    reject(new Error(`Transaction failed for ${storeName}`));
                };
            } catch (error) {
                console.error(`Critical error saving data to ${storeName}:`, error);
                reject(error);
            }
        });
    }

    async deleteData(storeName, id) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.delete(id);
                
                request.onsuccess = () => {
                    resolve();
                };
                
                request.onerror = () => {
                    console.error(`Error deleting data from ${storeName}:`, request.error);
                    reject(new Error(`Failed to delete data from ${storeName}`));
                };
            } catch (error) {
                console.error(`Critical error deleting data from ${storeName}:`, error);
                reject(error);
            }
        });
    }

    async loadInitialData() {
        try {
            // Check if data already exists
            const existingProducts = await this.getData('products');
            const existingCustomers = await this.getData('customers');
            const existingSales = await this.getData('sales');

            console.log('Existing data:', {
                products: existingProducts.length,
                customers: existingCustomers.length,
                sales: existingSales.length
            });

            // Load sample data if database is empty
            if (existingProducts.length === 0) {
                console.log('Loading sample products...');
                for (const product of this.sampleData.products) {
                    await this.saveData('products', product);
                }
                console.log('Sample products loaded');
            }
            
            if (existingCustomers.length === 0) {
                console.log('Loading sample customers...');
                for (const customer of this.sampleData.customers) {
                    await this.saveData('customers', customer);
                }
                console.log('Sample customers loaded');
            }
            
            if (existingSales.length === 0) {
                console.log('Loading sample sales...');
                for (const sale of this.sampleData.sales) {
                    await this.saveData('sales', sale);
                }
                console.log('Sample sales loaded');
            }

        } catch (error) {
            console.error('Error loading initial data:', error);
            throw new Error('Failed to load initial data');
        }
    }

    // ========================================
    // EVENT LISTENERS - FIXED
    // ========================================
    
    initEventListeners() {
        try {
            console.log('Initializing event listeners...');
            
            // Bottom navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tab = item.dataset.tab;
                    if (tab) {
                        this.switchTab(tab);
                    }
                });
            });

            // Theme toggle
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleTheme();
                });
            }

            // Voice button
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) {
                voiceBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleVoiceRecognition();
                });
            }

            // Initialize form listeners
            this.initFormListeners();
            
            // Initialize search and filter listeners
            this.initSearchFilters();

            // Chart type selector
            const chartSelect = document.getElementById('chartTypeSelect');
            if (chartSelect) {
                chartSelect.addEventListener('change', () => {
                    this.updateChart();
                });
            }

            console.log('Event listeners initialized successfully');
        } catch (error) {
            console.error('Error initializing event listeners:', error);
        }
    }

    initFormListeners() {
        // Add Product Form
        const addProductForm = document.getElementById('addProductForm');
        if (addProductForm) {
            addProductForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.addProduct();
            });
        }

        // Add Sale Form
        const addSaleForm = document.getElementById('addSaleForm');
        if (addSaleForm) {
            addSaleForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.addSale();
            });
        }

        // Add Customer Form
        const addCustomerForm = document.getElementById('addCustomerForm');
        if (addCustomerForm) {
            addCustomerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.addCustomer();
            });
        }

        // Edit Customer Form
        const editCustomerForm = document.getElementById('editCustomerForm');
        if (editCustomerForm) {
            editCustomerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.updateCustomer();
            });
        }

        // Store Info Form
        const storeInfoForm = document.getElementById('storeInfoForm');
        if (storeInfoForm) {
            storeInfoForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveStoreInfo();
            });
        }

        // Sale product change listeners - FIXED
        const saleProduct = document.getElementById('saleProduct');
        const saleQuantity = document.getElementById('saleQuantity');
        
        if (saleProduct) {
            saleProduct.addEventListener('change', () => {
                this.updateSalePrice();
            });
        }
        
        if (saleQuantity) {
            saleQuantity.addEventListener('input', () => {
                this.updateSaleTotal();
            });
        }
    }

    initSearchFilters() {
        // Product search
        const productSearch = document.getElementById('productSearch');
        if (productSearch) {
            productSearch.addEventListener('input', (e) => {
                this.debounce(() => {
                    const categoryFilter = document.getElementById('categoryFilter');
                    this.filterTable('products', e.target.value, categoryFilter ? categoryFilter.value : '');
                }, 300)();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                const productSearch = document.getElementById('productSearch');
                this.filterTable('products', productSearch ? productSearch.value : '', e.target.value);
            });
        }

        // Sales search
        const salesSearch = document.getElementById('salesSearch');
        if (salesSearch) {
            salesSearch.addEventListener('input', (e) => {
                this.debounce(() => {
                    const salesDateFilter = document.getElementById('salesDateFilter');
                    this.filterSalesTable(e.target.value, salesDateFilter ? salesDateFilter.value : '');
                }, 300)();
            });
        }

        // Sales date filter
        const salesDateFilter = document.getElementById('salesDateFilter');
        if (salesDateFilter) {
            salesDateFilter.addEventListener('change', (e) => {
                const salesSearch = document.getElementById('salesSearch');
                this.filterSalesTable(salesSearch ? salesSearch.value : '', e.target.value);
            });
        }

        // Customer search
        const customerSearch = document.getElementById('customerSearch');
        if (customerSearch) {
            customerSearch.addEventListener('input', (e) => {
                this.debounce(() => {
                    this.filterCustomersTable(e.target.value);
                }, 300)();
            });
        }
    }

    // ========================================
    // NAVIGATION - FIXED
    // ========================================
    
    switchTab(tabName) {
        try {
            console.log('Switching to tab:', tabName);
            
            // Update navigation active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeNavItem = document.querySelector(`[data-tab="${tabName}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }

            // Update content visibility
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const activeTab = document.getElementById(`${tabName}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            this.currentTab = tabName;

            // Load tab-specific data
            this.loadTabData(tabName);
            
        } catch (error) {
            console.error('Error switching tab:', error);
            this.showToast('Error loading tab', 'error');
        }
    }

    async loadTabData(tabName) {
        if (!this.isInitialized) {
            console.log('App not initialized yet, skipping tab data load');
            return;
        }

        try {
            switch (tabName) {
                case 'dashboard':
                    await this.updateDashboard();
                    break;
                case 'products':
                    await this.loadProducts();
                    break;
                case 'sales':
                    await this.loadSales();
                    break;
                case 'inventory':
                    await this.loadInventory();
                    break;
                case 'customers':
                    await this.loadCustomers();
                    break;
                case 'analytics':
                    await this.loadAnalytics();
                    break;
                case 'settings':
                    this.loadSettings();
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${tabName} data:`, error);
            this.showToast(`Error loading ${tabName}`, 'error');
        }
    }

    // ========================================
    // DASHBOARD - FIXED
    // ========================================
    
    async updateDashboard() {
        try {
            console.log('Updating dashboard...');
            
            // Get all data with error handling
            const [products, customers, sales] = await Promise.all([
                this.getData('products').catch(e => { console.error('Error getting products:', e); return []; }),
                this.getData('customers').catch(e => { console.error('Error getting customers:', e); return []; }),
                this.getData('sales').catch(e => { console.error('Error getting sales:', e); return []; })
            ]);

            console.log('Dashboard data loaded:', { products: products.length, customers: customers.length, sales: sales.length });

            // Calculate metrics safely
            const totalSales = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
            const lowStockItems = products.filter(p => (p.currentStock || 0) <= (p.minStock || 0)).length;

            // Update DOM elements safely
            this.updateDOMElement('totalSales', `₹${totalSales.toLocaleString()}`);
            this.updateDOMElement('totalProducts', products.length.toString());
            this.updateDOMElement('totalCustomers', customers.length.toString());
            this.updateDOMElement('lowStockItems', lowStockItems.toString());

            // Update recent activities
            const recentSales = sales.slice(-5).reverse();
            this.updateRecentActivities(recentSales);

            console.log('Dashboard updated successfully');

        } catch (error) {
            console.error('Error updating dashboard:', error);
            this.showToast('Error updating dashboard', 'error');
            
            // Show fallback values
            this.updateDOMElement('totalSales', '₹0');
            this.updateDOMElement('totalProducts', '0');
            this.updateDOMElement('totalCustomers', '0');
            this.updateDOMElement('lowStockItems', '0');
        }
    }

    updateDOMElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        } else {
            console.warn(`Element with id '${id}' not found`);
        }
    }

    updateRecentActivities(recentSales) {
        const container = document.getElementById('recentActivities');
        if (!container) return;
        
        container.innerHTML = '';

        if (recentSales.length === 0) {
            container.innerHTML = '<div class="empty-state">No recent activities</div>';
            return;
        }

        recentSales.forEach(sale => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-description">
                    Sold ${sale.quantity} ${sale.productName} to ${sale.customerName}
                </div>
                <div class="activity-time">${sale.date} ${sale.time}</div>
            `;
            container.appendChild(activityItem);
        });
    }

    // ========================================
    // CUSTOMER MANAGEMENT - FIXED
    // ========================================
    
    async loadCustomers() {
        try {
            console.log('Loading customers...');
            const customers = await this.getData('customers');
            this.populateCustomersTable(customers);
            await this.populateCustomerSelects(); // Make this async and await it
            console.log('Customers loaded successfully');
        } catch (error) {
            console.error('Error loading customers:', error);
            this.showToast('Error loading customers', 'error');
        }
    }

    populateCustomersTable(customers) {
        const tbody = document.getElementById('customersTableBody');
        if (!tbody) {
            console.warn('Customers table body not found');
            return;
        }
        
        tbody.innerHTML = '';

        if (customers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No customers found</td></tr>';
            return;
        }

        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.escapeHtml(customer.name)}</td>
                <td>${this.escapeHtml(customer.phone)}</td>
                <td>₹${(customer.totalPurchases || 0).toLocaleString()}</td>
                <td>${customer.loyaltyPoints || 0}</td>
                <td>${customer.lastVisit || 'N/A'}</td>
                <td>
                    <button class="btn btn--secondary action-btn" onclick="window.app.showCustomerHistory('${customer.id}')">History</button>
                    <button class="btn btn--secondary action-btn" onclick="window.app.editCustomer('${customer.id}')">Edit</button>
                    <button class="btn btn--secondary action-btn" onclick="window.app.deleteCustomer('${customer.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async populateCustomerSelects() {
        try {
            const customers = await this.getData('customers');
            const select = document.getElementById('saleCustomer');
            
            if (select) {
                select.innerHTML = '<option value="">Select Customer</option>';
                customers.forEach(customer => {
                    const option = document.createElement('option');
                    option.value = customer.id;
                    option.textContent = `${customer.name} - ${customer.phone}`;
                    select.appendChild(option);
                });
                console.log('Customer select populated with', customers.length, 'customers');
            }
        } catch (error) {
            console.error('Error populating customer selects:', error);
        }
    }

    async addCustomer() {
        try {
            const customer = {
                id: this.generateId('cust'),
                name: document.getElementById('customerName').value.trim(),
                phone: document.getElementById('customerPhone').value.trim(),
                address: document.getElementById('customerAddress').value.trim(),
                totalPurchases: 0,
                loyaltyPoints: 0,
                lastVisit: new Date().toISOString().split('T')[0],
                joinDate: new Date().toISOString().split('T')[0]
            };

            // Validation
            if (!customer.name || !customer.phone) {
                this.showToast('Name and phone are required', 'error');
                return;
            }

            await this.saveData('customers', customer);
            this.hideModal('addCustomerModal');
            document.getElementById('addCustomerForm').reset();
            
            if (this.currentTab === 'customers') {
                await this.loadCustomers();
            }
            
            // Update customer selects in sale form
            await this.populateCustomerSelects();
            
            await this.updateDashboard();
            this.showToast('Customer added successfully!', 'success');
        } catch (error) {
            console.error('Error adding customer:', error);
            this.showToast('Error adding customer', 'error');
        }
    }

    async editCustomer(customerId) {
        try {
            const customers = await this.getData('customers');
            const customer = customers.find(c => c.id === customerId);

            if (!customer) {
                this.showToast('Customer not found', 'error');
                return;
            }

            const elements = {
                id: document.getElementById('editCustomerId'),
                name: document.getElementById('editCustomerName'),
                phone: document.getElementById('editCustomerPhone'),
                address: document.getElementById('editCustomerAddress')
            };

            if (elements.id) elements.id.value = customer.id;
            if (elements.name) elements.name.value = customer.name;
            if (elements.phone) elements.phone.value = customer.phone;
            if (elements.address) elements.address.value = customer.address;

            this.showModal('editCustomerModal');
        } catch (error) {
            console.error('Error loading customer for edit:', error);
            this.showToast('Error loading customer', 'error');
        }
    }

    async updateCustomer() {
        try {
            const customerId = document.getElementById('editCustomerId').value;
            const customers = await this.getData('customers');
            const customer = customers.find(c => c.id === customerId);

            if (!customer) {
                this.showToast('Customer not found', 'error');
                return;
            }

            const name = document.getElementById('editCustomerName').value.trim();
            const phone = document.getElementById('editCustomerPhone').value.trim();

            if (!name || !phone) {
                this.showToast('Name and phone are required', 'error');
                return;
            }

            customer.name = name;
            customer.phone = phone;
            customer.address = document.getElementById('editCustomerAddress').value.trim();

            await this.saveData('customers', customer);
            this.hideModal('editCustomerModal');
            
            if (this.currentTab === 'customers') {
                await this.loadCustomers();
            }
            
            // Update customer selects in sale form
            await this.populateCustomerSelects();
            
            this.showToast('Customer updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating customer:', error);
            this.showToast('Error updating customer', 'error');
        }
    }

    async deleteCustomer(customerId) {
        if (!confirm('Are you sure you want to delete this customer?')) return;

        try {
            await this.deleteData('customers', customerId);
            if (this.currentTab === 'customers') {
                await this.loadCustomers();
            }
            
            // Update customer selects in sale form
            await this.populateCustomerSelects();
            
            await this.updateDashboard();
            this.showToast('Customer deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting customer:', error);
            this.showToast('Error deleting customer', 'error');
        }
    }

    async showCustomerHistory(customerId) {
        try {
            const customers = await this.getData('customers');
            const sales = await this.getData('sales');
            
            const customer = customers.find(c => c.id === customerId);
            const customerSales = sales.filter(s => s.customerId === customerId);

            if (!customer) {
                this.showToast('Customer not found', 'error');
                return;
            }

            // Populate customer details
            const titleEl = document.getElementById('customerHistoryTitle');
            const detailsEl = document.getElementById('customerHistoryDetails');
            
            if (titleEl) titleEl.textContent = `${customer.name} - Purchase History`;
            
            if (detailsEl) {
                detailsEl.innerHTML = `
                    <div class="customer-detail-grid">
                        <div class="customer-detail-item">
                            <div class="customer-detail-label">Name</div>
                            <div class="customer-detail-value">${this.escapeHtml(customer.name)}</div>
                        </div>
                        <div class="customer-detail-item">
                            <div class="customer-detail-label">Phone</div>
                            <div class="customer-detail-value">${this.escapeHtml(customer.phone)}</div>
                        </div>
                        <div class="customer-detail-item">
                            <div class="customer-detail-label">Total Purchases</div>
                            <div class="customer-detail-value">₹${(customer.totalPurchases || 0).toLocaleString()}</div>
                        </div>
                        <div class="customer-detail-item">
                            <div class="customer-detail-label">Loyalty Points</div>
                            <div class="customer-detail-value">${customer.loyaltyPoints || 0}</div>
                        </div>
                        <div class="customer-detail-item">
                            <div class="customer-detail-label">Member Since</div>
                            <div class="customer-detail-value">${customer.joinDate || 'N/A'}</div>
                        </div>
                        <div class="customer-detail-item">
                            <div class="customer-detail-label">Last Visit</div>
                            <div class="customer-detail-value">${customer.lastVisit || 'N/A'}</div>
                        </div>
                    </div>
                `;
            }

            // Populate purchase history
            const tbody = document.getElementById('customerHistoryTableBody');
            if (tbody) {
                tbody.innerHTML = '';

                if (customerSales.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No purchase history</td></tr>';
                } else {
                    customerSales.reverse().forEach(sale => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${sale.date}</td>
                            <td>${this.escapeHtml(sale.productName)}</td>
                            <td>${sale.quantity}</td>
                            <td>₹${sale.totalAmount}</td>
                        `;
                        tbody.appendChild(row);
                    });
                }
            }

            this.showModal('customerHistoryModal');
        } catch (error) {
            console.error('Error showing customer history:', error);
            this.showToast('Error loading customer history', 'error');
        }
    }

    // ========================================
    // CHARTS - FIXED
    // ========================================
    
    async loadAnalytics() {
        try {
            await this.updateChart();
        } catch (error) {
            console.error('Error loading analytics:', error);
            this.showToast('Error loading analytics', 'error');
        }
    }

    async updateChart() {
        const chartTypeSelect = document.getElementById('chartTypeSelect');
        const chartType = chartTypeSelect ? chartTypeSelect.value : 'sales-by-product';
        
        try {
            console.log('Updating chart:', chartType);
            
            const ctx = document.getElementById('analyticsChart');
            if (!ctx) {
                console.error('Chart canvas not found');
                this.showToast('Chart canvas not found', 'error');
                return;
            }
            
            // Destroy existing chart
            if (this.chart) {
                this.chart.destroy();
                this.chart = null;
            }

            // Get chart data
            const chartData = await this.getChartData(chartType);
            
            // Create new chart
            this.chart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: chartData.title
                        }
                    },
                    scales: chartData.scales || {}
                }
            });

            // Update insights
            await this.updateChartInsights(chartType);
            
            console.log('Chart updated successfully');

        } catch (error) {
            console.error('Error updating chart:', error);
            this.showToast('Error updating chart', 'error');
            
            // Show error message in chart insights
            const insightsContainer = document.getElementById('chartInsights');
            if (insightsContainer) {
                insightsContainer.innerHTML = '<h4>Chart Error</h4><p>Unable to load chart data. Please try again.</p>';
            }
        }
    }

    async getChartData(chartType) {
        try {
            const [products, sales, customers] = await Promise.all([
                this.getData('products').catch(() => []),
                this.getData('sales').catch(() => []),
                this.getData('customers').catch(() => [])
            ]);

            const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

            switch (chartType) {
                case 'sales-by-product':
                    const productSales = {};
                    sales.forEach(sale => {
                        const productName = sale.productName || 'Unknown Product';
                        productSales[productName] = (productSales[productName] || 0) + (sale.totalAmount || 0);
                    });
                    
                    return {
                        type: 'bar',
                        title: 'Sales Revenue by Product',
                        data: {
                            labels: Object.keys(productSales),
                            datasets: [{
                                label: 'Revenue (₹)',
                                data: Object.values(productSales),
                                backgroundColor: colors.slice(0, Object.keys(productSales).length)
                            }]
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '₹' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    };

                case 'sales-trends':
                    const dailySales = {};
                    sales.forEach(sale => {
                        const date = sale.date || 'Unknown Date';
                        dailySales[date] = (dailySales[date] || 0) + (sale.totalAmount || 0);
                    });
                    
                    const sortedDates = Object.keys(dailySales).sort();
                    return {
                        type: 'line',
                        title: 'Sales Trends Over Time',
                        data: {
                            labels: sortedDates,
                            datasets: [{
                                label: 'Daily Sales (₹)',
                                data: sortedDates.map(date => dailySales[date]),
                                borderColor: colors[0],
                                backgroundColor: colors[0] + '20',
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '₹' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    };

                case 'inventory-levels':
                    return {
                        type: 'bar',
                        title: 'Current Inventory Levels',
                        data: {
                            labels: products.map(p => p.name || 'Unknown Product'),
                            datasets: [{
                                label: 'Current Stock',
                                data: products.map(p => p.currentStock || 0),
                                backgroundColor: products.map(p => (p.currentStock || 0) <= (p.minStock || 0) ? colors[2] : colors[0])
                            }]
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    };

                case 'customer-purchases':
                    return {
                        type: 'pie',
                        title: 'Customer Purchase Distribution',
                        data: {
                            labels: customers.map(c => c.name || 'Unknown Customer'),
                            datasets: [{
                                data: customers.map(c => c.totalPurchases || 0),
                                backgroundColor: colors.slice(0, customers.length)
                            }]
                        }
                    };

                case 'low-stock-alerts':
                    const lowStockProducts = products.filter(p => (p.currentStock || 0) <= (p.minStock || 0));
                    return {
                        type: 'bar',
                        title: 'Low Stock Alerts',
                        data: {
                            labels: lowStockProducts.map(p => p.name || 'Unknown Product'),
                            datasets: [{
                                label: 'Current Stock',
                                data: lowStockProducts.map(p => p.currentStock || 0),
                                backgroundColor: colors[2]
                            }, {
                                label: 'Minimum Stock',
                                data: lowStockProducts.map(p => p.minStock || 0),
                                backgroundColor: colors[1]
                            }]
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    };

                default:
                    return {
                        type: 'bar',
                        title: 'No Data Available',
                        data: { 
                            labels: ['No Data'], 
                            datasets: [{
                                label: 'No Data',
                                data: [0],
                                backgroundColor: colors[0]
                            }]
                        }
                    };
            }
        } catch (error) {
            console.error('Error generating chart data:', error);
            throw error;
        }
    }

    async updateChartInsights(chartType) {
        const container = document.getElementById('chartInsights');
        if (!container) return;
        
        container.innerHTML = '<h4>Key Insights</h4>';

        try {
            const [products, sales, customers] = await Promise.all([
                this.getData('products').catch(() => []),
                this.getData('sales').catch(() => []),
                this.getData('customers').catch(() => [])
            ]);

            let insights = [];

            switch (chartType) {
                case 'sales-by-product':
                    const productSales = {};
                    sales.forEach(sale => {
                        const productName = sale.productName || 'Unknown Product';
                        productSales[productName] = (productSales[productName] || 0) + (sale.totalAmount || 0);
                    });
                    
                    if (Object.keys(productSales).length > 0) {
                        const topProduct = Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b);
                        insights = [
                            { label: 'Top Selling Product', value: topProduct },
                            { label: 'Revenue from Top Product', value: `₹${productSales[topProduct].toLocaleString()}` },
                            { label: 'Total Products with Sales', value: Object.keys(productSales).length }
                        ];
                    } else {
                        insights = [{ label: 'No Sales Data', value: 'No product sales found' }];
                    }
                    break;

                case 'sales-trends':
                    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
                    const uniqueDates = new Set(sales.map(s => s.date || 'unknown')).size;
                    const avgDailySales = uniqueDates > 0 ? totalRevenue / uniqueDates : 0;
                    insights = [
                        { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}` },
                        { label: 'Average Daily Sales', value: `₹${avgDailySales.toFixed(0)}` },
                        { label: 'Total Transactions', value: sales.length }
                    ];
                    break;

                case 'inventory-levels':
                    const lowStockCount = products.filter(p => (p.currentStock || 0) <= (p.minStock || 0)).length;
                    const totalValue = products.reduce((sum, p) => sum + ((p.currentStock || 0) * (p.costPrice || 0)), 0);
                    insights = [
                        { label: 'Total Inventory Value', value: `₹${totalValue.toLocaleString()}` },
                        { label: 'Low Stock Items', value: lowStockCount },
                        { label: 'Total Products', value: products.length }
                    ];
                    break;

                case 'customer-purchases':
                    if (customers.length > 0) {
                        const topCustomer = customers.reduce((a, b) => (a.totalPurchases || 0) > (b.totalPurchases || 0) ? a : b);
                        const avgPurchase = customers.reduce((sum, c) => sum + (c.totalPurchases || 0), 0) / customers.length;
                        insights = [
                            { label: 'Top Customer', value: topCustomer.name || 'Unknown' },
                            { label: 'Top Customer Purchases', value: `₹${(topCustomer.totalPurchases || 0).toLocaleString()}` },
                            { label: 'Average Purchase per Customer', value: `₹${avgPurchase.toFixed(0)}` }
                        ];
                    } else {
                        insights = [{ label: 'No Customer Data', value: 'No customers found' }];
                    }
                    break;

                case 'low-stock-alerts':
                    const lowStock = products.filter(p => (p.currentStock || 0) <= (p.minStock || 0));
                    const criticalStock = products.filter(p => (p.currentStock || 0) === 0);
                    const percentage = products.length > 0 ? ((lowStock.length / products.length) * 100).toFixed(1) : 0;
                    insights = [
                        { label: 'Low Stock Items', value: lowStock.length },
                        { label: 'Out of Stock Items', value: criticalStock.length },
                        { label: 'Percentage Needing Restock', value: `${percentage}%` }
                    ];
                    break;

                default:
                    insights = [{ label: 'No Insights Available', value: 'Select a chart type to view insights' }];
            }

            insights.forEach(insight => {
                const item = document.createElement('div');
                item.className = 'insight-item';
                item.innerHTML = `
                    <span class="insight-label">${insight.label}</span>
                    <span class="insight-value">${insight.value}</span>
                `;
                container.appendChild(item);
            });

        } catch (error) {
            console.error('Error updating chart insights:', error);
            container.innerHTML += '<p>Error loading insights</p>';
        }
    }

    // ========================================
    // PRODUCTS MANAGEMENT
    // ========================================
    
    async loadProducts() {
        try {
            const products = await this.getData('products');
            this.populateProductsTable(products);
            this.populateCategoryFilter();
            await this.populateProductSelects(); // Make this async and await it
        } catch (error) {
            console.error('Error loading products:', error);
            this.showToast('Error loading products', 'error');
        }
    }

    populateProductsTable(products) {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No products found</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.escapeHtml(product.name)}</td>
                <td>${this.escapeHtml(product.category)}</td>
                <td>${product.currentStock} ${this.escapeHtml(product.unit)}</td>
                <td>${this.escapeHtml(product.unit)}</td>
                <td>₹${product.costPrice}</td>
                <td>₹${product.sellingPrice}</td>
                <td>
                    <button class="btn btn--secondary action-btn" onclick="window.app.editProduct('${product.id}')">Edit</button>
                    <button class="btn btn--secondary action-btn" onclick="window.app.deleteProduct('${product.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    populateCategoryFilter() {
        const select = document.getElementById('categoryFilter');
        const productCategorySelect = document.getElementById('productCategory');
        
        if (select) {
            select.innerHTML = '<option value="">All Categories</option>';
            this.sampleData.categories.forEach(category => {
                select.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }
        
        if (productCategorySelect) {
            productCategorySelect.innerHTML = '<option value="">Select Category</option>';
            this.sampleData.categories.forEach(category => {
                productCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }
    }

    async populateProductSelects() {
        try {
            const products = await this.getData('products');
            const select = document.getElementById('saleProduct');
            
            if (select) {
                select.innerHTML = '<option value="">Select Product</option>';
                products.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.id;
                    option.dataset.price = product.sellingPrice;
                    option.textContent = `${product.name} (${product.currentStock} ${product.unit} available)`;
                    select.appendChild(option);
                });
                console.log('Product select populated with', products.length, 'products');
            }
        } catch (error) {
            console.error('Error populating product selects:', error);
        }
    }

    async addProduct() {
        try {
            const name = document.getElementById('productName').value.trim();
            const category = document.getElementById('productCategory').value;
            const stock = parseInt(document.getElementById('productStock').value);
            const minStock = parseInt(document.getElementById('productMinStock').value);
            const unit = document.getElementById('productUnit').value.trim();
            const costPrice = parseFloat(document.getElementById('productCostPrice').value);
            const sellingPrice = parseFloat(document.getElementById('productSellingPrice').value);

            if (!name || !category || !unit || isNaN(stock) || isNaN(minStock) || isNaN(costPrice) || isNaN(sellingPrice)) {
                this.showToast('Please fill all required fields with valid values', 'error');
                return;
            }

            if (stock < 0 || minStock < 0 || costPrice < 0 || sellingPrice < 0) {
                this.showToast('Values cannot be negative', 'error');
                return;
            }

            const product = {
                id: this.generateId('prod'),
                name,
                category,
                currentStock: stock,
                minStock,
                unit,
                costPrice,
                sellingPrice,
                lastUpdated: new Date().toISOString()
            };

            await this.saveData('products', product);
            this.hideModal('addProductModal');
            document.getElementById('addProductForm').reset();
            
            if (this.currentTab === 'products') {
                await this.loadProducts();
            }
            
            // Update product selects in sale form
            await this.populateProductSelects();
            
            await this.updateDashboard();
            this.showToast('Product added successfully!', 'success');
        } catch (error) {
            console.error('Error adding product:', error);
            this.showToast('Error adding product', 'error');
        }
    }

    async deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await this.deleteData('products', productId);
            if (this.currentTab === 'products') {
                await this.loadProducts();
            }
            
            // Update product selects in sale form
            await this.populateProductSelects();
            
            await this.updateDashboard();
            this.showToast('Product deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting product:', error);
            this.showToast('Error deleting product', 'error');
        }
    }

    // ========================================
    // SALES MANAGEMENT - FIXED
    // ========================================
    
    async loadSales() {
        try {
            const sales = await this.getData('sales');
            this.populateSalesTable(sales);
            await this.populateCustomerSelects();
            await this.populateProductSelects(); // Ensure product selects are populated
        } catch (error) {
            console.error('Error loading sales:', error);
            this.showToast('Error loading sales', 'error');
        }
    }

    populateSalesTable(sales) {
        const tbody = document.getElementById('salesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        if (sales.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No sales found</td></tr>';
            return;
        }

        sales.slice().reverse().forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.date}</td>
                <td>${this.escapeHtml(sale.productName)}</td>
                <td>${this.escapeHtml(sale.customerName)}</td>
                <td>${sale.quantity}</td>
                <td>₹${sale.unitPrice}</td>
                <td>₹${sale.totalAmount}</td>
                <td>
                    <button class="btn btn--secondary action-btn" onclick="window.app.deleteSale('${sale.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateSalePrice() {
        const productSelect = document.getElementById('saleProduct');
        const unitPriceInput = document.getElementById('saleUnitPrice');
        
        if (productSelect && unitPriceInput) {
            if (productSelect.value) {
                const selectedOption = productSelect.options[productSelect.selectedIndex];
                const price = selectedOption.dataset.price;
                unitPriceInput.value = price || '';
                this.updateSaleTotal();
            } else {
                unitPriceInput.value = '';
                const totalInput = document.getElementById('saleTotalAmount');
                if (totalInput) totalInput.value = '';
            }
        }
    }

    updateSaleTotal() {
        const quantityInput = document.getElementById('saleQuantity');
        const unitPriceInput = document.getElementById('saleUnitPrice');
        const totalInput = document.getElementById('saleTotalAmount');
        
        if (quantityInput && unitPriceInput && totalInput) {
            const quantity = parseFloat(quantityInput.value) || 0;
            const unitPrice = parseFloat(unitPriceInput.value) || 0;
            const totalAmount = quantity * unitPrice;
            
            totalInput.value = totalAmount.toFixed(2);
        }
    }

    async addSale() {
        try {
            const productId = document.getElementById('saleProduct').value;
            const customerId = document.getElementById('saleCustomer').value;
            const quantity = parseInt(document.getElementById('saleQuantity').value);
            const unitPrice = parseFloat(document.getElementById('saleUnitPrice').value);
            const totalAmount = parseFloat(document.getElementById('saleTotalAmount').value);

            if (!productId || !customerId || !quantity || !unitPrice) {
                this.showToast('Please fill all required fields', 'error');
                return;
            }

            // Get product and customer details
            const [products, customers] = await Promise.all([
                this.getData('products'),
                this.getData('customers')
            ]);

            const product = products.find(p => p.id === productId);
            const customer = customers.find(c => c.id === customerId);

            if (!product || !customer) {
                this.showToast('Invalid product or customer selected', 'error');
                return;
            }

            if (quantity > product.currentStock) {
                this.showToast(`Insufficient stock. Available: ${product.currentStock} ${product.unit}`, 'error');
                return;
            }

            // Create sale record
            const sale = {
                id: this.generateId('sale'),
                productId,
                productName: product.name,
                customerId,
                customerName: customer.name,
                quantity,
                unitPrice,
                totalAmount,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };

            // Update product stock
            product.currentStock -= quantity;
            product.lastUpdated = new Date().toISOString();
            await this.saveData('products', product);

            // Update customer purchases
            customer.totalPurchases += totalAmount;
            customer.loyaltyPoints += Math.floor(totalAmount / 10);
            customer.lastVisit = sale.date;
            await this.saveData('customers', customer);

            // Save sale
            await this.saveData('sales', sale);

            this.hideModal('addSaleModal');
            document.getElementById('addSaleForm').reset();
            
            if (this.currentTab === 'sales') {
                await this.loadSales();
            }
            
            // Refresh product selects to show updated stock
            await this.populateProductSelects();
            
            await this.updateDashboard();
            this.showToast('Sale added successfully!', 'success');
        } catch (error) {
            console.error('Error adding sale:', error);
            this.showToast('Error adding sale', 'error');
        }
    }

    async deleteSale(saleId) {
        if (!confirm('Are you sure you want to delete this sale?')) return;

        try {
            await this.deleteData('sales', saleId);
            if (this.currentTab === 'sales') {
                await this.loadSales();
            }
            await this.updateDashboard();
            this.showToast('Sale deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting sale:', error);
            this.showToast('Error deleting sale', 'error');
        }
    }

    // ========================================
    // INVENTORY MANAGEMENT
    // ========================================
    
    async loadInventory() {
        try {
            const products = await this.getData('products');
            this.populateInventoryTable(products);
            this.updateInventoryStats(products);
        } catch (error) {
            console.error('Error loading inventory:', error);
            this.showToast('Error loading inventory', 'error');
        }
    }

    populateInventoryTable(products) {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No inventory items found</td></tr>';
            return;
        }

        products.forEach(product => {
            const status = this.getStockStatus(product);
            const value = product.currentStock * product.costPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.escapeHtml(product.name)}</td>
                <td>${product.currentStock} ${this.escapeHtml(product.unit)}</td>
                <td>${product.minStock} ${this.escapeHtml(product.unit)}</td>
                <td><span class="status-badge ${status.class}">${status.text}</span></td>
                <td>₹${value.toLocaleString()}</td>
                <td>
                    <button class="btn btn--secondary action-btn" onclick="window.app.adjustStock('${product.id}')">Adjust</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getStockStatus(product) {
        if (product.currentStock === 0) {
            return { class: 'out-of-stock', text: 'Out of Stock' };
        } else if (product.currentStock <= product.minStock) {
            return { class: 'low-stock', text: 'Low Stock' };
        } else {
            return { class: 'normal', text: 'Normal' };
        }
    }

    updateInventoryStats(products) {
        const totalItems = products.length;
        const lowStockCount = products.filter(p => p.currentStock <= p.minStock).length;
        const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.costPrice), 0);

        this.updateDOMElement('totalInventoryItems', totalItems.toString());
        this.updateDOMElement('lowStockCount', lowStockCount.toString());
        this.updateDOMElement('totalInventoryValue', `₹${totalValue.toLocaleString()}`);
    }

    // ========================================
    // VOICE RECOGNITION - FIXED
    // ========================================
    
    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.recognition = new SpeechRecognition();
                this.recognition.continuous = false;
                this.recognition.interimResults = false;
                this.recognition.lang = 'en-US';

                this.recognition.onresult = (event) => {
                    const command = event.results[0][0].transcript.toLowerCase();
                    console.log('Voice command:', command);
                    this.processVoiceCommand(command);
                };

                this.recognition.onend = () => {
                    this.isListening = false;
                    const voiceBtn = document.getElementById('voiceBtn');
                    const voiceStatus = document.getElementById('voiceStatus');
                    if (voiceBtn) voiceBtn.classList.remove('listening');
                    if (voiceStatus) voiceStatus.textContent = 'Voice';
                };

                this.recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    this.isListening = false;
                    const voiceBtn = document.getElementById('voiceBtn');
                    const voiceStatus = document.getElementById('voiceStatus');
                    if (voiceBtn) voiceBtn.classList.remove('listening');
                    if (voiceStatus) voiceStatus.textContent = 'Voice';
                    
                    // Provide user-friendly error messages
                    switch (event.error) {
                        case 'not-allowed':
                        case 'service-not-allowed':
                            this.showToast('Microphone access denied. Please enable microphone permissions.', 'error');
                            break;
                        case 'no-speech':
                            this.showToast('No speech detected. Please try again.', 'warning');
                            break;
                        case 'network':
                            this.showToast('Network error. Please check your internet connection.', 'error');
                            break;
                        default:
                            this.showToast(`Voice recognition error: ${event.error}`, 'error');
                    }
                };

                console.log('Voice recognition initialized');
            } catch (error) {
                console.error('Error initializing voice recognition:', error);
                this.showToast('Voice recognition initialization failed', 'error');
                const voiceBtn = document.getElementById('voiceBtn');
                if (voiceBtn) voiceBtn.style.display = 'none';
            }
        } else {
            console.warn('Speech recognition not supported in this browser');
            this.showToast('Voice recognition not supported in this browser', 'warning');
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) voiceBtn.style.display = 'none';
        }
    }

    toggleVoiceRecognition() {
        if (!this.recognition) {
            this.showToast('Voice recognition not available', 'error');
            return;
        }

        const voiceBtn = document.getElementById('voiceBtn');
        const voiceStatus = document.getElementById('voiceStatus');

        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
                this.isListening = true;
                if (voiceBtn) voiceBtn.classList.add('listening');
                if (voiceStatus) voiceStatus.textContent = 'Listening...';
                this.showToast('Listening for voice commands...', 'info');
            } catch (error) {
                console.error('Error starting voice recognition:', error);
                this.showToast('Failed to start voice recognition', 'error');
            }
        }
    }

    async processVoiceCommand(command) {
        console.log('Processing voice command:', command);
        
        try {
            // Navigation commands
            if (command.includes('dashboard')) {
                this.switchTab('dashboard');
                this.showToast('Switched to Dashboard', 'info');
            } else if (command.includes('product')) {
                this.switchTab('products');
                this.showToast('Switched to Products', 'info');
            } else if (command.includes('sales')) {
                this.switchTab('sales');
                this.showToast('Switched to Sales', 'info');
            } else if (command.includes('inventory')) {
                this.switchTab('inventory');
                this.showToast('Switched to Inventory', 'info');
            } else if (command.includes('customer')) {
                this.switchTab('customers');
                this.showToast('Switched to Customers', 'info');
            } else if (command.includes('analytics')) {
                this.switchTab('analytics');
                this.showToast('Switched to Analytics', 'info');
            } else if (command.includes('settings')) {
                this.switchTab('settings');
                this.showToast('Switched to Settings', 'info');
            } else {
                this.showToast('Command not recognized. Try saying "show dashboard", "go to products", etc.', 'warning');
            }
        } catch (error) {
            console.error('Error processing voice command:', error);
            this.showToast('Error processing voice command', 'error');
        }
    }

    // ========================================
    // THEME MANAGEMENT
    // ========================================
    
    initTheme() {
        this.applyTheme(this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        if (this.theme === 'light') {
            this.theme = 'dark';
        } else if (this.theme === 'dark') {
            this.theme = 'system';
        } else {
            this.theme = 'light';
        }
        
        localStorage.setItem('theme', this.theme);
        this.applyTheme(this.theme);
        this.updateThemeIcon();
        this.showToast(`Switched to ${this.theme} theme`, 'info');
    }

    applyTheme(theme) {
        document.documentElement.removeAttribute('data-color-scheme');
        
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
    }

    updateThemeIcon() {
        const icon = document.getElementById('themeIcon');
        if (!icon) return;
        
        switch (this.theme) {
            case 'light':
                icon.textContent = '☀️';
                break;
            case 'dark':
                icon.textContent = '🌙';
                break;
            case 'system':
                icon.textContent = '💻';
                break;
        }
    }

    // ========================================
    // FILTERING AND SEARCH
    // ========================================
    
    async filterTable(type, searchTerm, category = '') {
        if (type === 'products') {
            const products = await this.getData('products');
            const filtered = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.category.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = !category || product.category === category;
                return matchesSearch && matchesCategory;
            });
            this.populateProductsTable(filtered);
        }
    }

    async filterSalesTable(searchTerm, dateFilter) {
        const sales = await this.getData('sales');
        const filtered = sales.filter(sale => {
            const matchesSearch = sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                sale.customerName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDate = !dateFilter || sale.date === dateFilter;
            return matchesSearch && matchesDate;
        });
        this.populateSalesTable(filtered);
    }

    async filterCustomersTable(searchTerm) {
        const customers = await this.getData('customers');
        const filtered = customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
        );
        this.populateCustomersTable(filtered);
    }

    // ========================================
    // MODAL MANAGEMENT
    // ========================================
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');
        
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Auto-populate dropdowns when showing sale modal
            if (modalId === 'addSaleModal') {
                setTimeout(() => {
                    this.populateProductSelects();
                    this.populateCustomerSelects();
                }, 100);
            }
        }
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');
        
        if (modal) {
            modal.classList.add('hidden');
        }
        if (overlay) {
            overlay.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }

    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }

    // ========================================
    // TOAST NOTIFICATIONS
    // ========================================
    
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<p class="toast-message">${this.escapeHtml(message)}</p>`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.remove();
            }
        }, 4000);
    }

    // ========================================
    // EXPORT/IMPORT FUNCTIONS
    // ========================================
    
    async exportProducts() {
        try {
            const products = await this.getData('products');
            this.downloadJSON(products, 'products.json');
            this.showToast('Products exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting products:', error);
            this.showToast('Error exporting products', 'error');
        }
    }

    async exportData() {
        try {
            const [products, customers, sales] = await Promise.all([
                this.getData('products'),
                this.getData('customers'),
                this.getData('sales')
            ]);
            
            const allData = {
                products,
                customers,
                sales,
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            
            this.downloadJSON(allData, 'kirana_store_backup.json');
            this.showToast('All data exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showToast('Error exporting data', 'error');
        }
    }

    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // ========================================
    // SETTINGS
    // ========================================
    
    loadSettings() {
        // Settings are loaded automatically through the form
    }

    async saveStoreInfo() {
        try {
            const storeInfo = {
                key: 'store_info',
                storeName: document.getElementById('storeName').value,
                ownerName: document.getElementById('ownerName').value,
                storePhone: document.getElementById('storePhone').value
            };
            
            await this.saveData('settings', storeInfo);
            this.showToast('Store information saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving store info:', error);
            this.showToast('Error saving store information', 'error');
        }
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    generateId(prefix) {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return unsafe;
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Placeholder methods for future implementation
    adjustStock(productId) {
        this.showToast('Stock adjustment feature coming soon!', 'info');
    }

    editProduct(productId) {
        this.showToast('Edit product feature coming soon!', 'info');
    }

    showBulkUpdateModal() {
        this.showToast('Bulk update feature coming soon!', 'info');
    }

    showAddInventoryModal() {
        this.showToast('Add inventory feature coming soon!', 'info');
    }

    showImportDataModal() {
        this.showToast('Import data feature coming soon!', 'info');
    }

    showRestoreDataModal() {
        this.showToast('Restore data feature coming soon!', 'info');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM loaded, initializing Kirana Store Management System...');
        window.app = new KiranaStore();
        await window.app.init();
        console.log('Kirana Store Management System ready!');
    } catch (error) {
        console.error('Critical error during application startup:', error);
        
        // Show error message to user
        const container = document.getElementById('toastContainer');
        if (container) {
            const toast = document.createElement('div');
            toast.className = 'toast error';
            toast.innerHTML = '<p class="toast-message">Failed to start application. Please refresh the page.</p>';
            container.appendChild(toast);
        }
    }
});