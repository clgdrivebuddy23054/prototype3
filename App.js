// Global variables and configuration
let currentLanguage = 'en';
let isOnline = navigator.onLine;
let db;
let auth;
let currentUser = null;
let recognition;
let isListening = false;
let salesChart = null;
let currentTheme = 'auto';
let charts = {};
let notifications = [];

// Enhanced number word mapping for voice recognition
const numberWords = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
    'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
    // Hindi numbers
    'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
    // Telugu numbers
    'ఒకటి': 1, 'రెండు': 2, 'మూడు': 3, 'నాలుగు': 4, 'అయిదు': 5, 'ఆరు': 6, 'ఏడు': 7, 'ఎనిమిది': 8, 'తొమ్మిది': 9, 'పది': 10
};

// Translations for all UI elements
const translations = {
    en: {
        dashboard: "Dashboard",
        products: "Products",
        sales: "Sales",
        inventory: "Inventory",
        analytics: "Analytics",
        customers: "Customers",
        settings: "Settings",
        totalSales: "Total Sales",
        totalProfit: "Total Profit",
        lowStock: "Low Stock",
        todaySales: "Today's Sales",
        totalProducts: "Total Products",
        addProduct: "Add Product",
        quickSale: "Quick Sale",
        voiceInput: "Voice Input",
        voiceHelp: "Try: \"sold five rice\", \"sale two oil\", or \"three dal sold\"",
        search: "Search",
        productName: "Product Name",
        category: "Category",
        costPrice: "Cost Price",
        sellingPrice: "Selling Price",
        quantity: "Quantity",
        unit: "Unit",
        minStockLevel: "Min Stock Level",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        generateReorder: "Generate Reorder",
        lowStockAlert: "Low Stock Alert",
        allCategories: "All Categories",
        allStock: "All Stock",
        reorderReport: "Reorder Report",
        reorderHelp: "Below are products that are low on stock. You can update their stock directly.",
        updateStock: "Update Stock",
        exportPDF: "Export PDF",
        charts: "Charts",
        text: "Text",
        refresh: "Refresh",
        salesGrowth: "Sales Growth",
        profitMargin: "Profit Margin",
        inventoryTurnover: "Inventory Turnover",
        salesTrend: "Sales Trend",
        topProducts: "Top Products by Revenue",
        mostSold: "Most Sold Items",
        profitAnalysis: "Profit Analysis",
        categoryPerformance: "Category Performance",
        stockStatus: "Stock Status Overview",
        salesForecasting: "Sales Forecasting (next 7 days)",
        customerHistory: "Customer History",
        searchByPhone: "Search by phone number...",
        storeInformation: "Store Information",
        storeName: "Store Name",
        ownerName: "Owner Name",
        storeAddress: "Store Address",
        phoneNumber: "Phone Number",
        appearance: "Appearance",
        theme: "Theme",
        themeAuto: "Auto (System)",
        themeLight: "Light",
        themeDark: "Dark",
        selectLanguage: "Select Language",
        sendTestAlert: "Send Test Alert",
        notifications: "Notifications",
        login: "Login",
        logout: "Logout",
        startManaging: "Start Managing Store",
        completeSale: "Complete Sale",
        selectProduct: "Select Product",
        selectCategory: "Select Category",
        close: "Close",
        confirm: "Confirm",
        singleProduct: "Single Product",
        bulkUpload: "Bulk Upload",
        bulkUploadHelp: "Paste product data (CSV format: Name, Category, Cost Price, Selling Price, Quantity, Unit, Min Stock)",
        stockAlertsTitle: "Stock Alerts",
        voiceStatusListening: "Listening...",
        voiceStatusProcessing: "Processing...",
        noSalesData: "No sales data available",
        noProductsFound: "No products found",
        productAddedSuccess: "Product added successfully",
        saleRecordedSuccess: "Sale recorded successfully",
        outOfStock: "Out of Stock",
        reorderSuggested: "Reorder Suggested",
        recentSales: "Recent Sales",
        noStockAlerts: "No stock alerts",
        insufficientStock: "Insufficient stock for ",
        available: "Available",
        productNotFound: "Product not found: ",
        invalidQuantity: "Invalid quantity specified",
        commandNotRecognized: "Command not recognized",
        noProductsNeedReordering: "No products need reordering",
        allProductsStocked: "All products are adequately stocked",
        systemReady: "Kirana Store Manager is ready to use",
        initializationError: "Failed to initialize the application",
        error: "Error",
        success: "Success",
        warning: "Warning",
        info: "Info",
        noCustomerHistory: "No sales history for this customer.",
        customerPhone: "Customer Phone (Optional)",
        ownerName: "Owner Name",
        loading: "Loading..."
    },
    hi: {
        dashboard: "डैशबोर्ड",
        products: "उत्पाद",
        sales: "बिक्री",
        inventory: "इन्वेंटरी",
        analytics: "विश्लेषण",
        customers: "ग्राहक",
        settings: "सेटिंग्स",
        totalSales: "कुल बिक्री",
        totalProfit: "कुल लाभ",
        lowStock: "कम स्टॉक",
        todaySales: "आज की बिक्री",
        totalProducts: "कुल उत्पाद",
        addProduct: "उत्पाद जोड़ें",
        quickSale: "त्वरित बिक्री",
        voiceInput: "आवाज़ इनपुट",
        voiceHelp: "बोलें: \"पांच चावल बेचें\", \"दो तेल बेचें\", या \"तीन दाल बेचें\"",
        search: "खोजें",
        productName: "उत्पाद का नाम",
        category: "श्रेणी",
        costPrice: "लागत मूल्य",
        sellingPrice: "विक्रय मूल्य",
        quantity: "मात्रा",
        unit: "इकाई",
        minStockLevel: "न्यूनतम स्टॉक स्तर",
        save: "सेव करें",
        cancel: "रद्द करें",
        delete: "हटाएं",
        edit: "संपादित करें",
        generateReorder: "रीऑर्डर जनरेट करें",
        lowStockAlert: "कम स्टॉक अलर्ट",
        allCategories: "सभी श्रेणियां",
        allStock: "सभी स्टॉक",
        reorderReport: "रीऑर्डर रिपोर्ट",
        reorderHelp: "नीचे उन उत्पादों की सूची है जिनमें स्टॉक कम है। आप सीधे उनके स्टॉक को अपडेट कर सकते हैं।",
        updateStock: "स्टॉक अपडेट करें",
        exportPDF: "पीडीएफ निर्यात करें",
        charts: "चार्ट",
        text: "टेक्स्ट",
        refresh: "रिफ्रेश",
        salesGrowth: "बिक्री वृद्धि",
        profitMargin: "लाभ मार्जिन",
        inventoryTurnover: "इन्वेंटरी टर्नओवर",
        salesTrend: "बिक्री का रुझान",
        topProducts: "राजस्व के अनुसार शीर्ष उत्पाद",
        mostSold: "सबसे ज्यादा बिकने वाले आइटम",
        profitAnalysis: "लाभ विश्लेषण",
        categoryPerformance: "श्रेणी प्रदर्शन",
        stockStatus: "स्टॉक स्थिति अवलोकन",
        salesForecasting: "बिक्री पूर्वानुमान (अगले 7 दिन)",
        customerHistory: "ग्राहक इतिहास",
        searchByPhone: "फोन नंबर द्वारा खोजें...",
        storeInformation: "दुकान की जानकारी",
        storeName: "दुकान का नाम",
        ownerName: "मालिक का नाम",
        storeAddress: "दुकान का पता",
        phoneNumber: "फोन नंबर",
        appearance: "दिखावट",
        theme: "थीम",
        themeAuto: "ऑटो (सिस्टम)",
        themeLight: "लाइट",
        themeDark: "डार्क",
        selectLanguage: "भाषा चुनें",
        sendTestAlert: "टेस्ट अलर्ट भेजें",
        notifications: "सूचनाएं",
        login: "लॉगिन",
        logout: "लॉगआउट",
        startManaging: "दुकान प्रबंधित करना शुरू करें",
        completeSale: "बिक्री पूरी करें",
        selectProduct: "उत्पाद चुनें",
        selectCategory: "श्रेणी चुनें",
        close: "बंद करें",
        confirm: "पुष्टि करें",
        singleProduct: "एकल उत्पाद",
        bulkUpload: "बल्क अपलोड",
        bulkUploadHelp: "उत्पाद डेटा पेस्ट करें (CSV प्रारूप: नाम, श्रेणी, लागत मूल्य, विक्रय मूल्य, मात्रा, इकाई, न्यूनतम स्टॉक)",
        stockAlertsTitle: "स्टॉक अलर्ट",
        voiceStatusListening: "सुन रहा है...",
        voiceStatusProcessing: "प्रोसेसिंग...",
        noSalesData: "बिक्री डेटा उपलब्ध नहीं",
        noProductsFound: "कोई उत्पाद नहीं मिला",
        productAddedSuccess: "उत्पाद सफलतापूर्वक जोड़ा गया",
        saleRecordedSuccess: "बिक्री सफलतापूर्वक रिकॉर्ड की गई",
        outOfStock: "स्टॉक समाप्त",
        reorderSuggested: "रीऑर्डर सुझाया गया",
        recentSales: "हाल की बिक्री",
        noStockAlerts: "कोई स्टॉक अलर्ट नहीं",
        insufficientStock: "के लिए अपर्याप्त स्टॉक ",
        available: "उपलब्ध",
        productNotFound: "उत्पाद नहीं मिला: ",
        invalidQuantity: "अमान्य मात्रा निर्दिष्ट की गई",
        commandNotRecognized: "कमांड पहचानी नहीं गई",
        noProductsNeedReordering: "किसी भी उत्पाद को फिर से ऑर्डर करने की आवश्यकता नहीं है",
        allProductsStocked: "सभी उत्पादों में पर्याप्त स्टॉक है",
        systemReady: "किराना स्टोर मैनेजर उपयोग के लिए तैयार है",
        initializationError: "एप्लिकेशन को प्रारंभ करने में विफल",
        error: "त्रुटि",
        success: "सफलता",
        warning: "चेतावनी",
        info: "जानकारी",
        noCustomerHistory: "इस ग्राहक के लिए कोई बिक्री इतिहास नहीं है।",
        customerPhone: "ग्राहक फोन (वैकल्पिक)",
        ownerName: "मालिक का नाम",
        loading: "लोड हो रहा है..."
    },
    te: {
        dashboard: "డాష్‌బోర్డ్",
        products: "ఉత్పత్తులు",
        sales: "అమ్మకాలు",
        inventory: "ఇన్వెంటరీ",
        analytics: "విశ్లేషణ",
        customers: "కస్టమర్‌లు",
        settings: "సెట్టింగ్‌లు",
        totalSales: "మొత్తం అమ్మకాలు",
        totalProfit: "మొత్తం లాభం",
        lowStock: "తక్కువ స్టాక్",
        todaySales: "నేటి అమ్మకాలు",
        totalProducts: "మొత్తం ఉత్పత్తులు",
        addProduct: "ఉత్పత్తిని జోడించు",
        quickSale: "త్వరిత అమ్మకం",
        voiceInput: "వాయిస్ ఇన్‌పుట్",
        voiceHelp: "ప్రయత్నించండి: \"ఐదు బియ్యం అమ్మారు\", \"రెండు నూనె అమ్మకం\", లేదా \"మూడు పప్పు అమ్మారు\"",
        search: "వెతకండి",
        productName: "ఉత్పత్తి పేరు",
        category: "వర్గం",
        costPrice: "ఖర్చు ధర",
        sellingPrice: "అమ్మకం ధర",
        quantity: "పరిమాణం",
        unit: "యూనిట్",
        minStockLevel: "కనీస స్టాక్ స్థాయి",
        save: "భద్రపరచు",
        cancel: "రద్దు చేయి",
        delete: "తొలగించు",
        edit: "సవరించు",
        generateReorder: "రీఆర్డర్ చేయండి",
        lowStockAlert: "తక్కువ స్టాక్ హెచ్చరిక",
        allCategories: "అన్ని వర్గాలు",
        allStock: "అన్ని స్టాక్",
        reorderReport: "రీఆర్డర్ నివేదిక",
        reorderHelp: "క్రింద స్టాక్ తక్కువగా ఉన్న ఉత్పత్తులు ఉన్నాయి. మీరు వాటి స్టాక్‌ను నేరుగా అప్‌డేట్ చేయవచ్చు.",
        updateStock: "స్టాక్‌ను అప్‌డేట్ చేయండి",
        exportPDF: "పిడిఎఫ్ ఎగుమతి",
        charts: "చార్టులు",
        text: "టెక్స్ట్",
        refresh: "రీఫ్రెష్",
        salesGrowth: "అమ్మకాల వృద్ధి",
        profitMargin: "లాభం మార్జిన్",
        inventoryTurnover: "ఇన్వెంటరీ టర్నోవర్",
        salesTrend: "అమ్మకాల పోకడ",
        topProducts: "ఆదాయం ప్రకారం అగ్ర ఉత్పత్తులు",
        mostSold: "అత్యధికంగా అమ్ముడైన వస్తువులు",
        profitAnalysis: "లాభ విశ్లేషణ",
        categoryPerformance: "వర్గ పనితీరు",
        stockStatus: "స్టాక్ స్థితి అవలోకనం",
        salesForecasting: "అమ్మకాల అంచనా (తర్వాతి 7 రోజులు)",
        customerHistory: "కస్టమర్ చరిత్ర",
        searchByPhone: "ఫోన్ నంబర్ ద్వారా వెతకండి...",
        storeInformation: "దుకాణం సమాచారం",
        storeName: "దుకాణం పేరు",
        ownerName: "యజమాని పేరు",
        storeAddress: "దుకాణం చిరునామా",
        phoneNumber: "ఫోన్ నంబర్",
        appearance: "రూపం",
        theme: "థీమ్",
        themeAuto: "ఆటో (సిస్టమ్)",
        themeLight: "లైట్",
        themeDark: "డార్క్",
        selectLanguage: "భాషను ఎంచుకోండి",
        sendTestAlert: "పరీక్ష హెచ్చరిక పంపు",
        notifications: "నోటిఫికేషన్లు",
        login: "లాగిన్",
        logout: "లాగౌట్",
        startManaging: "దుకాణం నిర్వహణ ప్రారంభించండి",
        completeSale: "అమ్మకం పూర్తి చేయండి",
        selectProduct: "ఉత్పత్తిని ఎంచుకోండి",
        selectCategory: "వర్గం ఎంచుకోండి",
        close: "మూసివేయి",
        confirm: "నిర్ధారించు",
        singleProduct: "ఒకే ఉత్పత్తి",
        bulkUpload: "బల్క్ అప్‌లోడ్",
        bulkUploadHelp: "ఉత్పత్తి డేటాను పేస్ట్ చేయండి (CSV ఫార్మాట్: పేరు, వర్గం, ఖర్చు ధర, అమ్మకం ధర, పరిమాణం, యూనిట్, కనీస స్టాక్)",
        stockAlertsTitle: "స్టాక్ హెచ్చరికలు",
        voiceStatusListening: "వింటుంది...",
        voiceStatusProcessing: "ప్రాసెసింగ్...",
        noSalesData: "అమ్మకాల డేటా అందుబాటులో లేదు",
        noProductsFound: "ఉత్పత్తులు కనుగొనబడలేదు",
        productAddedSuccess: "ఉత్పత్తి విజయవంతంగా జోడించబడింది",
        saleRecordedSuccess: "అమ్మకం విజయవంతంగా రికార్డ్ చేయబడింది",
        outOfStock: "స్టాక్ అయిపోయింది",
        reorderSuggested: "రీఆర్డర్ సూచించబడింది",
        recentSales: "ఇటీవలి అమ్మకాలు",
        noStockAlerts: "స్టాక్ హెచ్చరికలు లేవు",
        insufficientStock: "కి స్టాక్ సరిపోదు ",
        available: "అందుబాటులో ఉంది",
        productNotFound: "ఉత్పత్తి కనుగొనబడలేదు: ",
        invalidQuantity: "చెల్లని పరిమాణం పేర్కొనబడింది",
        commandNotRecognized: "కమాండ్ గుర్తించబడలేదు",
        noProductsNeedReordering: "ఏ ఉత్పత్తులను తిరిగి ఆర్డర్ చేయవలసిన అవసరం లేదు",
        allProductsStocked: "అన్ని ఉత్పత్తులు తగినంతగా నిల్వ ఉన్నాయి",
        systemReady: "కిరాణా స్టోర్ మేనేజర్ ఉపయోగించడానికి సిద్ధంగా ఉంది",
        initializationError: "అప్లికేషన్‌ను ప్రారంభించడంలో విఫలమైంది",
        error: "లోపం",
        success: "విజయం",
        warning: "హెచ్చరిక",
        info: "సమాచారం",
        noCustomerHistory: "ఈ కస్టమర్ కోసం అమ్మకాల చరిత్ర లేదు.",
        customerPhone: "కస్టమర్ ఫోన్ (ఐచ్ఛికం)",
        ownerName: "యజమాని పేరు",
        loading: "లోడ్ అవుతోంది..."
    }
};

// Global Firebase variables
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
let firebaseConfig;
if (typeof __firebase_config !== 'undefined') {
    try {
        firebaseConfig = JSON.parse(__firebase_config);
    } catch (e) {
        console.error("Failed to parse firebase config:", e);
    }
}
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Database and Auth variables
let firebaseApp;
let db;
let userId;

// Enhanced Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    currentTheme = savedTheme;
    applyTheme(savedTheme);
    
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
}

function applyTheme(theme) {
    const root = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
    } else {
        root.removeAttribute('data-theme');
        if (themeIcon) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            themeIcon.textContent = prefersDark ? '☀️' : '🌙';
        }
    }
}

function toggleTheme() {
    const themes = ['auto', 'light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    currentTheme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
    
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.value = nextTheme;
    }
}

// Enhanced Notification System
function addNotification(type, title, message) {
    const notification = {
        id: Date.now().toString(),
        type: type,
        title: title,
        message: message,
        timestamp: new Date(),
        read: false
    };
    
    notifications.unshift(notification);
    updateNotificationCount();
    updateNotificationsList();
    
    // Auto-remove after 5 minutes
    setTimeout(() => {
        notifications = notifications.filter(n => n.id !== notification.id);
        updateNotificationCount();
        updateNotificationsList();
    }, 300000);
}

function updateNotificationCount() {
    const unreadCount = notifications.filter(n => !n.read).length;
    const countElement = document.getElementById('notificationCount');
    
    if (unreadCount > 0) {
        countElement.textContent = unreadCount;
        countElement.classList.remove('hidden');
    } else {
        countElement.classList.add('hidden');
    }
}

function updateNotificationsList() {
    const notificationsList = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = `<div class="empty-state"><div class="empty-state-text">${translate('noNotifications')}</div></div>`;
        return;
    }
    
    notificationsList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.type}" onclick="markNotificationAsRead('${notification.id}')">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.timestamp.toLocaleTimeString()}</div>
        </div>
    `).join('');
}

function markNotificationAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        updateNotificationCount();
        updateNotificationsList();
    }
}

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
}

// Login functionality
function showLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').classList.add('hidden');
}

function hideLogin() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').classList.remove('hidden');
}

async function handleLogin(storeName, ownerName) {
    try {
        const userRef = firebase.doc(db, `artifacts/${appId}/users/${userId}`);
        await firebase.setDoc(userRef, {
            storeName: storeName,
            ownerName: ownerName,
            lastLogin: new Date().toISOString()
        }, { merge: true });

        currentUser = { storeName, ownerName, userId };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // UI will be updated by the onAuthStateChanged listener
        showToast('Login successful!', 'success');
        
    } catch (error) {
        console.error('Error logging in:', error);
        showToast('Login failed. Please try again.', 'error');
        addNotification('error', 'Login Error', 'Failed to save user data to the cloud.');
    }
}

async function handleLogout() {
    await showConfirmModal(translate('logout'), 'Are you sure you want to log out?', async () => {
        try {
            await firebase.signOut(auth);
            currentUser = null;
            localStorage.removeItem('currentUser');
            showLogin();
        } catch (error) {
            console.error('Error logging out:', error);
            showToast('Logout failed. Please try again.', 'error');
        }
    });
}

// Language and translation functions
function translate(key) {
    return translations[currentLanguage][key] || key;
}

function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key);
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key);
    });
    
    populateCategories();
    updateProductSelect();
}

// Navigation functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProducts();
            break;
        case 'sales':
            loadSales();
            break;
        case 'inventory':
            loadInventory();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'customer-history':
            loadCustomerHistory();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Data Handling - Using Firestore
async function getFirestoreCollection(collectionName) {
    const q = firebase.query(firebase.collection(db, `artifacts/${appId}/users/${userId}/${collectionName}`));
    const querySnapshot = await firebase.getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getFirestoreDoc(collectionName, docId) {
    const docRef = firebase.doc(db, `artifacts/${appId}/users/${userId}/${collectionName}`, docId);
    const docSnap = await firebase.getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

async function saveToFirestore(collectionName, data) {
    if (data.id) {
        const docRef = firebase.doc(db, `artifacts/${appId}/users/${userId}/${collectionName}`, data.id);
        await firebase.setDoc(docRef, data, { merge: true });
        return data.id;
    } else {
        const collectionRef = firebase.collection(db, `artifacts/${appId}/users/${userId}/${collectionName}`);
        const docRef = await firebase.addDoc(collectionRef, data);
        return docRef.id;
    }
}

async function deleteFromFirestore(collectionName, docId) {
    const docRef = firebase.doc(db, `artifacts/${appId}/users/${userId}/${collectionName}`, docId);
    await firebase.deleteDoc(docRef);
}

// Dashboard functions
async function loadDashboard() {
    try {
        const products = await getFirestoreCollection('products');
        const sales = await getFirestoreCollection('sales');
        
        const today = new Date().toISOString().split('T')[0];
        const todaySales = sales.filter(sale => sale.date === today);
        const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalProfit = sales.reduce((sum, sale) => {
            const profit = (sale.pricePerUnit - (sale.costPrice || 0)) * sale.quantity;
            return sum + profit;
        }, 0);
        const lowStockProducts = products.filter(product => product.currentStock <= product.minStock);
        
        document.getElementById('todaySalesValue').textContent = `₹${todayRevenue.toLocaleString()}`;
        document.getElementById('totalSalesValue').textContent = `₹${totalRevenue.toLocaleString()}`;
        document.getElementById('totalProfitValue').textContent = `₹${totalProfit.toLocaleString()}`;
        document.getElementById('lowStockValue').textContent = lowStockProducts.length;
        document.getElementById('totalProductsValue').textContent = products.length;
        
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
        
        showStockAlerts(lowStockProducts);
        
        if (lowStockProducts.length > 0) {
            addNotification('warning', translate('lowStockAlert'), `${lowStockProducts.length} products are running low on stock`);
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        addNotification('error', translate('error'), 'Failed to load dashboard data.');
    }
}

function showStockAlerts(lowStockProducts) {
    const alertsContainer = document.getElementById('stockAlerts');
    
    if (lowStockProducts.length === 0) {
        alertsContainer.innerHTML = `<p class="empty-state-text">${translate('noStockAlerts')}</p>`;
        return;
    }
    
    alertsContainer.innerHTML = lowStockProducts.map(product => `
        <div class="stock-alert animate-card">
            <div class="stock-alert-info">
                <div class="stock-alert-icon">⚠️</div>
                <div class="stock-alert-text">
                    <strong>${product.name}</strong> is running low
                    <br>Current: <span class="stock-alert-quantity">${product.currentStock} ${product.unit}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Products functions
async function loadProducts() {
    try {
        const products = await getFirestoreCollection('products');
        const productsGrid = document.getElementById('productsGrid');
        
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <div class="empty-state-text">${translate('noProductsFound')}</div>
                    <div class="empty-state-subtext">Add your first product to get started</div>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = products.map(product => {
            const stockPercentage = (product.currentStock / (product.minStock * 2)) * 100;
            const stockClass = stockPercentage <= 25 ? 'critical' : stockPercentage <= 50 ? 'low' : 'ok';
            
            return `
                <div class="product-card animate-card" data-product-id="${product.id}">
                    <div class="card__body">
                        <div class="product-header">
                            <h3 class="product-name">${product.name}</h3>
                            <span class="product-category">${product.category}</span>
                        </div>
                        <div class="product-card-details">
                            <div class="price">Price: <span>₹${product.sellingPrice}</span></div>
                            <div class="stock">Stock: <span>${product.currentStock} ${product.unit}</span></div>
                            <div class="stock-level stock-level--${stockClass}">
                                <div class="stock-fill" style="width: ${Math.min(stockPercentage, 100)}%"></div>
                            </div>
                        </div>
                        <div class="product-card-footer">
                            <button class="btn btn--secondary btn--sm" onclick="editProduct('${product.id}')">
                                <span data-translate="edit">Edit</span>
                            </button>
                            <button class="btn btn--outline btn--sm" onclick="deleteProduct('${product.id}')">
                                <span data-translate="delete">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading products:', error);
        addNotification('error', translate('error'), 'Failed to load products.');
    }
}

async function addProduct(productData) {
    try {
        const productId = await saveToFirestore('products', productData);
        showToast(translate('productAddedSuccess'), 'success');
        addNotification('success', 'Product Added', `${productData.name} has been added to inventory`);
    } catch (error) {
        console.error('Error adding product:', error);
        showToast('Failed to add product. Please try again.', 'error');
        addNotification('error', translate('error'), 'Failed to add product to database.');
    }
    loadProducts();
    updateProductSelect();
}

async function handleBulkProductAdd(productData) {
    await showConfirmModal('Bulk Upload', 'Are you sure you want to add these products in bulk?', async () => {
        try {
            const productsArray = productData.split('\n');
            const newProducts = [];
            for (const line of productsArray) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;

                const [name, category, costPrice, sellingPrice, currentStock, unit, minStock] = trimmedLine.split(',').map(s => s.trim());

                if (!name || !category || !costPrice || !sellingPrice || !currentStock || !unit || !minStock) {
                    showToast(`Skipping invalid line: ${line}`, 'warning');
                    addNotification('warning', 'Bulk Upload Warning', `Skipping invalid line: ${line}`);
                    continue;
                }

                newProducts.push({
                    name: name,
                    category: category,
                    costPrice: parseFloat(costPrice),
                    sellingPrice: parseFloat(sellingPrice),
                    currentStock: parseFloat(currentStock),
                    unit: unit,
                    minStock: parseInt(minStock)
                });
            }

            if (newProducts.length > 0) {
                for (const product of newProducts) {
                    await saveToFirestore('products', product);
                }
                showToast('Products added successfully', 'success');
                addNotification('success', 'Bulk Products Added', `Added ${newProducts.length} products to inventory`);
            }
        } catch (error) {
            console.error('Bulk product add error:', error);
            showToast('Failed to add products in bulk. Check the format and try again.', 'error');
            addNotification('error', 'Bulk Upload Failed', 'An error occurred during bulk product upload.');
        }
        
        loadProducts();
        updateProductSelect();
        hideModal('addProductModal');
    });
}

async function editProduct(productId) {
    try {
        const product = await getFirestoreDoc('products', productId);
        if (!product) return;
        
        document.getElementById('productNameInput').value = product.name;
        document.getElementById('productCategoryInput').value = product.category;
        document.getElementById('costPriceInput').value = product.costPrice;
        document.getElementById('sellingPriceInput').value = product.sellingPrice;
        document.getElementById('quantityInput').value = product.currentStock;
        document.getElementById('unitInput').value = product.unit;
        document.getElementById('minStockInput').value = product.minStock;
        
        const form = document.getElementById('singleProductForm');
        form.dataset.editId = productId;
        
        populateCategories();
        showModal('addProductModal');
    } catch (error) {
        console.error('Error editing product:', error);
        addNotification('error', translate('error'), 'Failed to retrieve product data for editing.');
    }
}

async function deleteProduct(productId) {
    await showConfirmModal('Delete Product', 'Are you sure you want to delete this product? This action cannot be undone.', async () => {
        try {
            const product = await getFirestoreDoc('products', productId);
            await deleteFromFirestore('products', productId);
            showToast('Product deleted successfully', 'success');
            loadProducts();
            updateProductSelect();
            
            if (product) {
                addNotification('info', 'Product Deleted', `${product.name} has been removed from inventory`);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('Failed to delete product. Please try again.', 'error');
            addNotification('error', translate('error'), 'Failed to delete product from database.');
        }
    });
}

// Sales functions
async function loadSales() {
    try {
        const sales = await getFirestoreCollection('sales');
        const recentSales = sales.slice(-10).reverse();
        
        const salesContainer = document.getElementById('recentSales');
        
        if (recentSales.length === 0) {
            salesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💰</div>
                    <div class="empty-state-text">${translate('noSalesData')}</div>
                    <div class="empty-state-subtext">Record your first sale to get started</div>
                </div>
            `;
            return;
        }
        
        salesContainer.innerHTML = recentSales.map(sale => `
            <div class="sale-item animate-card">
                <div class="sale-info">
                    <div class="sale-product">${sale.productName}</div>
                    <div class="sale-details">
                        ${sale.quantity} ${sale.unit || 'units'} × ₹${sale.pricePerUnit} - ${sale.date} ${sale.time}
                    </div>
                </div>
                <div class="sale-amount">₹${sale.totalAmount.toLocaleString()}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading sales:', error);
        addNotification('error', translate('error'), 'Failed to load sales data.');
    }
}

async function recordSale(saleData) {
    try {
        const product = await getFirestoreDoc('products', saleData.productId);
        
        const sale = {
            productId: saleData.productId,
            productName: product.name,
            quantity: saleData.quantity,
            pricePerUnit: product.sellingPrice,
            totalAmount: saleData.quantity * product.sellingPrice,
            costPrice: product.costPrice,
            customerPhone: saleData.customerPhone || null,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString()
        };
        
        await saveToFirestore('sales', sale);
        
        product.currentStock -= saleData.quantity;
        await saveToFirestore('products', product);
        
        showToast(translate('saleRecordedSuccess'), 'success');
        loadSales();
        loadDashboard();
        loadInventory();
        
        addNotification('success', 'Sale Recorded', `₹${sale.totalAmount} sale recorded for ${sale.productName}`);
    } catch (error) {
        console.error('Error recording sale:', error);
        showToast('Failed to record sale. Please try again.', 'error');
        addNotification('error', translate('error'), 'Failed to record sale to database.');
    }
}

// Voice recognition functions
function initVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        showToast('Speech recognition not supported in this browser', 'error');
        return false;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'te' ? 'te-IN' : 'en-US';
    
    recognition.onstart = function() {
        isListening = true;
        const voiceBtn = document.getElementById('voiceInputBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        const voiceTranscript = document.getElementById('voiceTranscript');
        
        if (voiceBtn) voiceBtn.classList.add('listening');
        if (voiceStatus) {
            voiceStatus.textContent = translate('voiceStatusListening');
            voiceStatus.classList.add('listening');
        }
        if (voiceTranscript) voiceTranscript.textContent = 'Listening for your command...';
    };
    
    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        
        const voiceTranscript = document.getElementById('voiceTranscript');
        if (voiceTranscript) voiceTranscript.textContent = transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            processVoiceCommand(transcript);
        }
    };
    
    recognition.onend = function() {
        isListening = false;
        const voiceBtn = document.getElementById('voiceInputBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        
        if (voiceBtn) voiceBtn.classList.remove('listening');
        if (voiceStatus) {
            voiceStatus.textContent = '';
            voiceStatus.classList.remove('listening');
        }
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        
        const voiceBtn = document.getElementById('voiceInputBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        const voiceTranscript = document.getElementById('voiceTranscript');
        
        if (voiceBtn) voiceBtn.classList.remove('listening');
        if (voiceStatus) {
            voiceStatus.textContent = `${translate('error')}: ${event.error}`;
            voiceStatus.classList.remove('listening');
        }
        if (voiceTranscript) voiceTranscript.textContent = 'Error occurred. Please try again.';
        
        showToast(`Voice recognition error: ${event.error}`, 'error');
        addNotification('error', 'Voice Recognition Error', event.error);
    };
    
    return true;
}

function startVoiceRecognition() {
    if (!recognition) {
        if (!initVoiceRecognition()) {
            return;
        }
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        try {
            recognition.start();
        } catch (error) {
            console.error('Error starting voice recognition:', error);
            showToast('Error starting voice recognition', 'error');
            addNotification('error', 'Voice Recognition', 'Failed to start voice recognition');
        }
    }
}

function startVoiceSearch() {
    if (!recognition) {
        if (!initVoiceRecognition()) {
            return;
        }
    }
    
    if (isListening) {
        recognition.stop();
        return;
    }
    
    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        
        if (event.results[event.results.length - 1].isFinal) {
            const searchInput = document.getElementById('productSearch');
            if (searchInput) {
                searchInput.value = transcript;
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    };
    
    try {
        recognition.start();
        showToast('Speak the product name to search...');
    } catch (error) {
        console.error('Error starting voice search:', error);
        showToast('Error starting voice search', 'error');
    }
}

async function processVoiceCommand(transcript) {
    const voiceStatus = document.getElementById('voiceStatus');
    const voiceTranscript = document.getElementById('voiceTranscript');
    
    if (voiceStatus) voiceStatus.textContent = translate('voiceStatusProcessing');
    if (voiceTranscript) voiceTranscript.textContent = `${translate('processing')}: "${transcript}"`;
    
    function convertWordNumbers(text) {
        let result = text;
        for (const [word, number] of Object.entries(numberWords)) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            result = result.replace(regex, number.toString());
        }
        return result;
    }
    
    const processedCommand = convertWordNumbers(transcript.toLowerCase().trim());
    
    const salePatterns = [
        /(?:sold|sale|sell|record|add)\s+([\d.]+)\s+(.+)/i,
        /([\d.]+)\s+(.+)\s+(?:sold|sale|sell)/i,
        /(?:record|add)\s+(?:sale|sold)\s+([\d.]+)\s+(.+)/i,
        /(?:बेचा|बिक्री|रिकॉर्ड)\s+([\d.]+)\s+(.+)/i,
        /([\d.]+)\s+(.+)\s+(?:बेचा|बिक्री)/i,
        /(?:అమ్మాను|అమ్మకం|రికార్డ్)\s+([\d.]+)\s+(.+)/i,
        /([\d.]+)\s+(.+)\s+(?:అమ్మాను|అమ్మకం)/i
    ];
    
    let saleMatch = null;
    for (const pattern of salePatterns) {
        saleMatch = processedCommand.match(pattern);
        if (saleMatch) break;
    }
    
    if (saleMatch) {
        const quantity = parseFloat(saleMatch[1]);
        let productName = saleMatch[2].trim().replace(/[^\w\s]/g, '');
        
        if (isNaN(quantity) || quantity <= 0) {
            const message = translate('invalidQuantity');
            showToast(message, 'error');
            if (voiceTranscript) voiceTranscript.textContent = `❌ ${message}`;
            return;
        }
        
        const products = await getFirestoreCollection('products');
        
        const product = products.find(p => p.name.toLowerCase().includes(productName));
        
        if (product) {
            if (product.currentStock >= quantity) {
                const saleData = {
                    productId: product.id,
                    quantity: quantity,
                };
                
                await recordSale(saleData);
                const message = `Sale recorded: ${quantity} ${product.name} for ₹${(quantity * product.sellingPrice).toLocaleString()}`;
                showToast(message, 'success');
                if (voiceTranscript) voiceTranscript.textContent = `✅ ${message}`;
            } else {
                const message = `${translate('insufficientStock')} ${product.name}. ${translate('available')}: ${product.currentStock} ${product.unit}`;
                showToast(message, 'warning');
                if (voiceTranscript) voiceTranscript.textContent = `❌ ${message}`;
                addNotification('warning', 'Insufficient Stock', message);
            }
        } else {
            const availableProducts = products.slice(0, 5).map(p => p.name).join(', ');
            const message = `${translate('productNotFound')}"${productName}". ${translate('try')}: ${availableProducts}`;
            showToast(message, 'error');
            if (voiceTranscript) voiceTranscript.textContent = `❌ ${message}`;
        }
    } else {
        const message = `${translate('commandNotRecognized')}: "${transcript}"`;
        showToast(message, 'error');
        if (voiceTranscript) voiceTranscript.textContent = `❌ ${message}`;
    }
    
    if (voiceStatus) voiceStatus.textContent = '';
}

// Inventory functions
async function loadInventory() {
    try {
        const products = await getFirestoreCollection('products');
        const inventoryList = document.getElementById('inventoryList');
        
        if (products.length === 0) {
            inventoryList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-text">No inventory items</div>
                    <div class="empty-state-subtext">Add products to track inventory</div>
                </div>
            `;
            return;
        }
        
        inventoryList.innerHTML = products.map(product => {
            const needsReorder = product.currentStock <= product.minStock;
            
            return `
                <div class="inventory-item animate-card">
                    <div class="inventory-info">
                        <div class="inventory-name">${product.name}</div>
                        <div class="inventory-meta">
                            ${product.category} • Min: ${product.minStock} ${product.unit}
                        </div>
                    </div>
                    <div class="inventory-stock">
                        <div class="inventory-quantity">${product.currentStock} ${product.unit}</div>
                        ${needsReorder ? `<div class="reorder-suggestion" data-translate="reorderSuggested">${translate('reorderSuggested')}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading inventory:', error);
        addNotification('error', translate('error'), 'Failed to load inventory.');
    }
}

// Reorder functionality
async function generateReorderReport() {
    try {
        const products = await getFirestoreCollection('products');
        const reorderProducts = products.filter(product => product.currentStock <= product.minStock);
        
        const reorderList = document.getElementById('reorderList');
        
        if (reorderProducts.length === 0) {
            reorderList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">✅</div>
                    <div class="empty-state-text">${translate('noProductsNeedReordering')}</div>
                    <div class="empty-state-subtext">${translate('allProductsStocked')}</div>
                </div>
            `;
        } else {
            reorderList.innerHTML = reorderProducts.map(product => {
                const suggestedQuantity = Math.max(product.minStock * 2, 10);
                return `
                    <div class="reorder-item animate-card">
                        <div class="reorder-info">
                            <div class="reorder-name">${product.name}</div>
                            <div class="reorder-details">
                                Current: ${product.currentStock} ${product.unit} | 
                                Min: ${product.minStock} ${product.unit}
                            </div>
                        </div>
                        <div class="reorder-item-actions">
                            <input type="number" value="${suggestedQuantity}" id="reorderQty-${product.id}" class="form-control" min="1" step="0.01">
                            <button class="btn btn--primary btn--sm" onclick="updateStock('${product.id}')">
                                <span data-translate="updateStock">Update Stock</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            
            addNotification('info', 'Reorder Report', `${reorderProducts.length} products need reordering`);
        }
        
        showModal('reorderModal');
    } catch (error) {
        console.error('Error generating reorder report:', error);
        addNotification('error', translate('error'), 'Failed to generate reorder report.');
    }
}

async function updateStock(productId) {
    await showConfirmModal('Update Stock', 'Are you sure you want to update the stock for this product?', async () => {
        try {
            const product = await getFirestoreDoc('products', productId);
            if (!product) {
                showToast('Product not found.', 'error');
                return;
            }

            const quantityInput = document.getElementById(`reorderQty-${productId}`);
            const quantityToAdd = parseFloat(quantityInput.value);

            if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
                showToast('Invalid quantity.', 'error');
                return;
            }

            product.currentStock += quantityToAdd;
            await saveToFirestore('products', product);

            showToast(`${quantityToAdd} ${product.unit} of ${product.name} added to stock.`, 'success');
            addNotification('success', 'Stock Updated', `${product.name} stock has been updated.`);
            loadInventory();
            loadDashboard();
            hideModal('reorderModal');
        } catch (error) {
            console.error('Error updating stock:', error);
            showToast('An error occurred while updating stock.', 'error');
            addNotification('error', translate('error'), 'Failed to update stock.');
        }
    });
}

// Analytics functions
async function loadAnalytics() {
    try {
        const sales = await getFirestoreCollection('sales');
        const products = await getFirestoreCollection('products');
        
        updateAnalyticsSummary(sales, products);
        
        Object.values(charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        charts = {};
        
        await createSalesTrendChart(sales);
        await createTopProductsChart(sales);
        await createMostSoldChart(sales);
        await createProfitChart(sales);
        await createCategoryChart(sales, products);
        await createStockChart(products);
        await createSalesForecastChart(sales);

        renderAnalyticsText(sales, products);
    } catch (error) {
        console.error('Error loading analytics:', error);
        addNotification('error', translate('error'), 'Failed to load analytics data.');
    }
}

function updateAnalyticsSummary(sales, products) {
    const today = new Date();
    const last7Days = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        const diffTime = Math.abs(today - saleDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    });
    
    const previous7Days = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        const diffTime = Math.abs(today - saleDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 7 && diffDays <= 14;
    });
    
    const last7Revenue = last7Days.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const previous7Revenue = previous7Days.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const salesGrowth = previous7Revenue > 0 ? ((last7Revenue - previous7Revenue) / previous7Revenue) * 100 : 0;
    
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalCost = sales.reduce((sum, sale) => sum + ((sale.costPrice || 0) * sale.quantity), 0);
    const profitMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;
    
    const avgInventoryValue = products.reduce((sum, product) => sum + (product.currentStock * product.costPrice), 0);
    const inventoryTurnover = avgInventoryValue > 0 ? totalCost / avgInventoryValue : 0;
    
    document.getElementById('salesGrowth').textContent = `${salesGrowth >= 0 ? '+' : ''}${salesGrowth.toFixed(1)}%`;
    document.getElementById('profitMargin').textContent = `${profitMargin.toFixed(1)}%`;
    document.getElementById('inventoryTurnover').textContent = `${inventoryTurnover.toFixed(1)}x`;
}

function renderAnalyticsText(sales, products) {
    const salesByDay = {};
    sales.forEach(sale => {
        const date = new Date(sale.date).toDateString();
        if (!salesByDay[date]) salesByDay[date] = 0;
        salesByDay[date] += sale.totalAmount;
    });

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalProfit = sales.reduce((sum, sale) => sum + ((sale.sellingPrice - sale.costPrice) * sale.quantity), 0);
    const topSellingProduct = sales.reduce((acc, curr) => {
        acc[curr.productName] = (acc[curr.productName] || 0) + curr.quantity;
        return acc;
    }, {});
    const mostSold = Object.entries(topSellingProduct).sort(([,a],[,b]) => b - a)[0];

    const textContent = `
        <div class="card__body">
            <h3>${translate('analyticsSummary')}</h3>
            <p class="summary-text">${translate('totalSales')}: **₹${totalRevenue.toLocaleString()}**</p>
            <p class="summary-text">${translate('totalProfit')}: **₹${totalProfit.toLocaleString()}**</p>
            ${mostSold ? `<p class="summary-text">${translate('topSellingProduct')}: **${mostSold[0]}** ${translate('with')} **${mostSold[1]}** ${translate('unitsSold')}.</p>` : ''}
            <br>
            <h4>${translate('salesByDay')}:</h4>
            <ul>
                ${Object.entries(salesByDay).map(([date, amount]) => `
                    <li class="summary-item">${date}: ₹${amount.toLocaleString()}</li>
                `).join('')}
            </ul>
        </div>
    `;

    document.getElementById('analyticsTextView').innerHTML = textContent;
}

function toggleAnalyticsView(view) {
    const chartsView = document.getElementById('analyticsChartsView');
    const textView = document.getElementById('analyticsTextView');
    const chartsBtn = document.getElementById('chartsViewBtn');
    const textBtn = document.getElementById('textViewBtn');

    if (view === 'charts') {
        chartsView.classList.remove('hidden');
        textView.classList.add('hidden');
        chartsBtn.classList.add('active');
        textBtn.classList.remove('active');
    } else {
        chartsView.classList.add('hidden');
        textView.classList.remove('hidden');
        chartsBtn.classList.remove('active');
        textBtn.classList.add('active');
    }
}

async function createSalesTrendChart(sales) {
    const canvas = document.getElementById('salesTrendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const last7Days = [];
    const salesData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        last7Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        const daySales = sales
            .filter(sale => sale.date === dateString)
            .reduce((sum, sale) => sum + sale.totalAmount, 0);
        
        salesData.push(daySales);
    }
    
    charts.salesTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Sales (₹)',
                data: salesData,
                borderColor: 'rgb(33, 128, 141)',
                backgroundColor: 'rgba(33, 128, 141, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(33, 128, 141)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
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
        }
    });
}

async function createTopProductsChart(sales) {
    const canvas = document.getElementById('topProductsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const productRevenue = {};
    sales.forEach(sale => {
        if (!productRevenue[sale.productName]) {
            productRevenue[sale.productName] = 0;
        }
        productRevenue[sale.productName] += sale.totalAmount;
    });
    
    const topProducts = Object.entries(productRevenue)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const labels = topProducts.map(item => item[0]);
    const data = topProducts.map(item => item[1]);
    
    charts.topProducts = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(33, 128, 141, 0.8)',
                    'rgba(168, 75, 47, 0.8)',
                    'rgba(50, 184, 198, 0.8)',
                    'rgba(255, 84, 89, 0.8)',
                    'rgba(230, 129, 97, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

async function createMostSoldChart(sales) {
    const canvas = document.getElementById('mostSoldChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const productQuantity = {};
    sales.forEach(sale => {
        if (!productQuantity[sale.productName]) {
            productQuantity[sale.productName] = 0;
        }
        productQuantity[sale.productName] += sale.quantity;
    });
    
    const mostSold = Object.entries(productQuantity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const labels = mostSold.map(item => item[0]);
    const data = mostSold.map(item => item[1]);
    
    charts.mostSold = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantity Sold',
                data: data,
                backgroundColor: 'rgba(33, 128, 141, 0.8)',
                borderColor: 'rgb(33, 128, 141)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function createProfitChart(sales) {
    const canvas = document.getElementById('profitChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const productProfit = {};
    sales.forEach(sale => {
        if (!productProfit[sale.productName]) {
            productProfit[sale.productName] = 0;
        }
        const profit = (sale.pricePerUnit - (sale.costPrice || 0)) * sale.quantity;
        productProfit[sale.productName] += profit;
    });
    
    const topProfitProducts = Object.entries(productProfit)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const labels = topProfitProducts.map(item => item[0]);
    const data = topProfitProducts.map(item => item[1]);
    
    charts.profit = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Profit (₹)',
                data: data,
                backgroundColor: 'rgba(168, 75, 47, 0.8)',
                borderColor: 'rgb(168, 75, 47)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
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
        }
    });
}

async function createCategoryChart(sales, products) {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const categoryRevenue = {};
    sales.forEach(sale => {
        const product = products.find(p => p.id === sale.productId);
        const category = product ? product.category : 'Unknown';
        
        if (!categoryRevenue[category]) {
            categoryRevenue[category] = 0;
        }
        categoryRevenue[category] += sale.totalAmount;
    });
    
    const labels = Object.keys(categoryRevenue);
    const data = Object.values(categoryRevenue);
    
    charts.category = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(33, 128, 141, 0.6)',
                    'rgba(168, 75, 47, 0.6)',
                    'rgba(50, 184, 198, 0.6)',
                    'rgba(255, 84, 89, 0.6)',
                    'rgba(230, 129, 97, 0.6)',
                    'rgba(98, 108, 113, 0.6)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

async function createStockChart(products) {
    const canvas = document.getElementById('stockChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;
    
    products.forEach(product => {
        if (product.currentStock === 0) {
            outOfStock++;
        } else if (product.currentStock <= product.minStock) {
            lowStock++;
        } else {
            inStock++;
        }
    });
    
    charts.stock = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['In Stock', 'Low Stock', 'Out of Stock'],
            datasets: [{
                data: [inStock, lowStock, outOfStock],
                backgroundColor: [
                    'rgba(33, 128, 141, 0.8)',
                    'rgba(230, 129, 97, 0.8)',
                    'rgba(255, 84, 89, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Simple moving average forecast
async function createSalesForecastChart(sales) {
    const canvas = document.getElementById('salesForecastChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const salesByDay = {};
    sales.forEach(sale => {
        const date = sale.date;
        if (!salesByDay[date]) {
            salesByDay[date] = 0;
        }
        salesByDay[date] += sale.totalAmount;
    });

    const dates = Object.keys(salesByDay).sort();
    const dailySales = dates.map(date => salesByDay[date]);

    // Simple moving average of past 7 days to predict the next 7 days
    const forecast = [];
    if (dailySales.length >= 7) {
        let last7DaysSales = dailySales.slice(-7);
        const average = last7DaysSales.reduce((sum, val) => sum + val, 0) / 7;
        for (let i = 0; i < 7; i++) {
            forecast.push(average);
        }
    } else {
        // Not enough data for a forecast, just show zeros
        for (let i = 0; i < 7; i++) {
            forecast.push(0);
        }
    }

    // Prepare labels for the chart
    const forecastDates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        forecastDates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    charts.salesForecast = new Chart(ctx, {
        type: 'line',
        data: {
            labels: forecastDates,
            datasets: [{
                label: 'Forecasted Sales (₹)',
                data: forecast,
                borderColor: 'rgba(168, 75, 47, 1)',
                backgroundColor: 'rgba(168, 75, 47, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Customer History functions
async function loadCustomerHistory() {
    document.getElementById('customerHistoryList').innerHTML = '';
}

async function searchCustomerHistory(phoneNumber) {
    try {
        const salesRef = firebase.collection(db, `artifacts/${appId}/users/${userId}/sales`);
        const q = firebase.query(salesRef, firebase.where('customerPhone', '==', phoneNumber));
        const querySnapshot = await firebase.getDocs(q);
        const customerSales = querySnapshot.docs.map(doc => doc.data());
        
        const historyList = document.getElementById('customerHistoryList');
        if (customerSales.length === 0) {
            historyList.innerHTML = `<div class="empty-state"><div class="empty-state-text">${translate('noCustomerHistory')}</div></div>`;
            return;
        }

        historyList.innerHTML = `
            <h3>History for ${phoneNumber}</h3>
            ${customerSales.map(sale => `
                <div class="customer-history-item animate-card">
                    <div class="sale-info">
                        <div class="sale-product">${sale.productName}</div>
                        <div class="sale-details">
                            ${sale.quantity} ${sale.unit || 'units'} × ₹${sale.pricePerUnit} - ${sale.date} ${sale.time}
                        </div>
                    </div>
                    <div class="sale-amount">₹${sale.totalAmount.toLocaleString()}</div>
                </div>
            `).join('')}
        `;

    } catch (error) {
        console.error('Error searching customer history:', error);
        addNotification('error', translate('error'), 'Failed to fetch customer history.');
        document.getElementById('customerHistoryList').innerHTML = `<p>${translate('error')}: Failed to load history.</p>`;
    }
}

// Settings functions
async function loadSettings() {
    try {
        const userRef = firebase.doc(db, `artifacts/${appId}/users/${userId}`);
        const userDoc = await firebase.getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('storeNameInput').value = userData.storeName || '';
            document.getElementById('ownerNameInput').value = userData.ownerName || '';
            document.getElementById('storeAddressInput').value = userData.storeAddress || '';
            document.getElementById('phoneInput').value = userData.phoneNumber || '';
        }
    } catch (error) {
        console.error('Error loading settings:', error);
        addNotification('error', translate('error'), 'Failed to load user settings.');
    }
}

async function saveStoreInfo() {
    try {
        const storeName = document.getElementById('storeNameInput').value;
        const ownerName = document.getElementById('ownerNameInput').value;
        const storeAddress = document.getElementById('storeAddressInput').value;
        const phoneNumber = document.getElementById('phoneInput').value;

        const userRef = firebase.doc(db, `artifacts/${appId}/users/${userId}`);
        await firebase.setDoc(userRef, {
            storeName,
            ownerName,
            storeAddress,
            phoneNumber
        }, { merge: true });

        showToast('Store information updated successfully', 'success');
        addNotification('success', 'Settings Updated', 'Store information has been updated');
        document.getElementById('headerStoreName').textContent = storeName;
    } catch (error) {
        console.error('Error saving store info:', error);
        showToast('Failed to save store information.', 'error');
        addNotification('error', translate('error'), 'Failed to save settings.');
    }
}

function sendAlertViaMessage() {
    showToast('This feature requires backend integration to send SMS/WhatsApp messages.', 'info');
    addNotification('info', 'Feature Unavailable', 'SMS/WhatsApp integration needs a backend service to function.');
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Custom confirmation modal
function showConfirmModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    
    const confirmBtn = document.getElementById('confirmActionBtn');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', async () => {
        await onConfirm();
        hideModal('confirmModal');
    });

    showModal('confirmModal');
}

// Enhanced Toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    
    toast.classList.remove('toast--success', 'toast--error', 'toast--warning');
    if (type !== 'info') {
        toast.classList.add(`toast--${type}`);
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Utility functions
function updateConnectionStatus() {
    const statusElement = document.getElementById('connectionStatus');
    if (navigator.onLine) {
        statusElement.textContent = 'Online';
        statusElement.className = 'status status--success';
    } else {
        statusElement.textContent = 'Offline';
        statusElement.className = 'status status--warning';
    }
}

async function updateProductSelect() {
    const products = await getFirestoreCollection('products');
    const select = document.getElementById('saleProductSelect');
    
    if (select) {
        select.innerHTML = `<option value="">${translate('selectProduct')}</option>` +
            products.map(product => `
                <option value="${product.id}" data-price="${product.sellingPrice}">
                    ${product.name} (₹${product.sellingPrice})
                </option>
            `).join('');
    }
}

async function populateCategories() {
    const products = await getFirestoreCollection('products');
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const categoriesToDisplay = [...uniqueCategories, "Rice", "Dal", "Oil", "Spices", "Flour", "Sugar", "Biscuits", "Snacks", "Dairy", "Eggs", "Soap", "Detergent","Beverages"];
    
    const categorySelect = document.getElementById('productCategoryInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const categoryOptions = [...new Set(categoriesToDisplay)].map(category => 
        `<option value="${category}">${category}</option>`
    ).join('');
    
    if (categorySelect) {
        categorySelect.innerHTML = `<option value="">${translate('selectCategory')}</option>` + categoryOptions;
    }
    
    if (categoryFilter) {
        categoryFilter.innerHTML = `<option value="">${translate('allCategories')}</option>` + categoryOptions;
    }
}

// Data Export functionality
function exportReorderReport() {
    showToast('Export functionality will be available in the full version', 'info');
}

// Main initialization
document.addEventListener('DOMContentLoaded', async function() {
    try {
        if (!firebaseConfig) {
            console.error("Firebase config is missing. The app cannot initialize.");
            showToast('App configuration error. Please contact support.', 'error');
            return;
        }

        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebase.getFirestore(firebaseApp);
        auth = firebase.getAuth(firebaseApp);

        // This promise and check at the end of the script were causing a race condition.
        // We will now rely solely on the onAuthStateChanged listener to manage the UI flow.
        
        firebase.onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in.
                userId = user.uid;
                const userRef = firebase.doc(db, `artifacts/${appId}/users/${userId}`);
                const userDoc = await firebase.getDoc(userRef);
                
                if (userDoc.exists()) {
                    // Existing user with store info, show main app.
                    currentUser = userDoc.data();
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    document.getElementById('headerStoreName').textContent = currentUser.storeName;
                    hideLogin();
                    showSection('dashboard');
                    addNotification('info', 'System Ready', 'Kirana Store Manager is ready to use');
                } else {
                    // New user, show login page to get store details.
                    showLogin();
                }
            } else {
                // User is not signed in.
                // We will attempt to sign in anonymously or with a custom token.
                if (initialAuthToken) {
                    try {
                        await firebase.signInWithCustomToken(auth, initialAuthToken);
                    } catch (error) {
                        console.error("Error signing in with custom token:", error);
                        await firebase.signInAnonymously(auth);
                    }
                } else {
                    await firebase.signInAnonymously(auth);
                }
                // The onAuthStateChanged listener will be triggered again with the new user.
            }
        });
        
        // This part of the code now runs outside of the auth check.
        // It's for setting up event listeners and initial UI elements that don't
        // depend on the user's logged-in state.
        
        initTheme();
        initVoiceRecognition();
        updateConnectionStatus();
        updateLanguage();
        
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const storeName = document.getElementById('storeNameLogin').value;
            const ownerName = document.getElementById('ownerNameLogin').value;
            handleLogin(storeName, ownerName);
        });
        
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        document.getElementById('languageSelect').addEventListener('change', function() {
            currentLanguage = this.value;
            localStorage.setItem('language', currentLanguage);
            updateLanguage();
            if (recognition) {
                recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'te' ? 'te-IN' : 'en-US';
            }
        });
        
        document.getElementById('notificationBtn').addEventListener('click', toggleNotificationPanel);
        document.getElementById('closeNotifications').addEventListener('click', function() {
            document.getElementById('notificationPanel').classList.remove('show');
        });
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                const section = this.dataset.section;
                showSection(section);
            });
        });
        
        document.getElementById('addProductBtn').addEventListener('click', function() {
            document.getElementById('singleProductForm').reset();
            document.getElementById('bulkProductForm').reset();
            delete document.getElementById('singleProductForm').dataset.editId;
            populateCategories();
            document.getElementById('singleProductForm').classList.remove('hidden');
            document.getElementById('bulkProductForm').classList.add('hidden');
            document.getElementById('saveSingleProductBtn').classList.remove('hidden');
            document.getElementById('saveBulkProductBtn').classList.add('hidden');
            document.getElementById('singleProductTabBtn').classList.add('active');
            document.getElementById('bulkProductTabBtn').classList.remove('active');
            showModal('addProductModal');
        });

        document.getElementById('singleProductTabBtn').addEventListener('click', function() {
            this.classList.add('active');
            document.getElementById('bulkProductTabBtn').classList.remove('active');
            document.getElementById('singleProductForm').classList.remove('hidden');
            document.getElementById('bulkProductForm').classList.add('hidden');
            document.getElementById('saveSingleProductBtn').classList.remove('hidden');
            document.getElementById('saveBulkProductBtn').classList.add('hidden');
        });

        document.getElementById('bulkProductTabBtn').addEventListener('click', function() {
            this.classList.add('active');
            document.getElementById('singleProductTabBtn').classList.remove('active');
            document.getElementById('bulkProductForm').classList.remove('hidden');
            document.getElementById('singleProductForm').classList.add('hidden');
            document.getElementById('saveBulkProductBtn').classList.remove('hidden');
            document.getElementById('saveSingleProductBtn').classList.add('hidden');
        });
        
        document.getElementById('singleProductForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const productData = {
                name: document.getElementById('productNameInput').value,
                category: document.getElementById('productCategoryInput').value,
                costPrice: parseFloat(document.getElementById('costPriceInput').value),
                sellingPrice: parseFloat(document.getElementById('sellingPriceInput').value),
                currentStock: parseFloat(document.getElementById('quantityInput').value),
                unit: document.getElementById('unitInput').value,
                minStock: parseInt(document.getElementById('minStockInput').value)
            };
            const editId = this.dataset.editId;
            if (editId) {
                productData.id = editId;
                await saveToFirestore('products', productData);
                showToast('Product updated successfully', 'success');
                addNotification('success', 'Product Updated', `${productData.name} has been updated`);
            } else {
                await addProduct(productData);
            }
            hideModal('addProductModal');
            loadProducts();
            updateProductSelect();
        });

        document.getElementById('bulkProductForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const bulkData = document.getElementById('bulkProductInput').value;
            if (bulkData) {
                await handleBulkProductAdd(bulkData);
            } else {
                showToast('Please enter data for bulk upload.', 'warning');
            }
        });
        
        document.getElementById('quickSaleBtn').addEventListener('click', async function() {
            await updateProductSelect();
            showModal('quickSaleModal');
        });
        
        document.getElementById('fabBtn').addEventListener('click', async function() {
            await updateProductSelect();
            showModal('quickSaleModal');
        });
        
        document.getElementById('quickSaleForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const productId = document.getElementById('saleProductSelect').value;
            const quantity = parseFloat(document.getElementById('saleQuantityInput').value);
            const customerPhone = document.getElementById('customerPhoneInput').value;
            
            if (!productId || !quantity) {
                showToast('Please select product and quantity', 'error');
                return;
            }
            
            const product = await getFirestoreDoc('products', productId);
            if (!product) {
                showToast('Product not found', 'error');
                return;
            }
            
            if (product.currentStock < quantity) {
                showToast('Insufficient stock', 'warning');
                return;
            }
            
            const saleData = {
                productId,
                quantity,
                customerPhone
            };
            
            await recordSale(saleData);
            hideModal('quickSaleModal');
            this.reset();
        });
        
        document.getElementById('saleProductSelect').addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption ? selectedOption.dataset.price : 0;
            const quantity = document.getElementById('saleQuantityInput').value;
            
            if (price && quantity) {
                document.getElementById('totalAmountInput').value = (price * quantity).toFixed(2);
            }
        });
        
        document.getElementById('saleQuantityInput').addEventListener('input', function() {
            const productSelect = document.getElementById('saleProductSelect');
            const selectedOption = productSelect.options[productSelect.selectedIndex];
            const price = selectedOption ? selectedOption.dataset.price : 0;
            
            if (price && this.value) {
                document.getElementById('totalAmountInput').value = (price * this.value).toFixed(2);
            }
        });
        
        document.getElementById('voiceInputBtn').addEventListener('click', startVoiceRecognition);
        document.getElementById('voiceSearchBtn').addEventListener('click', startVoiceSearch);
        document.getElementById('reorderBtn').addEventListener('click', generateReorderReport);
        document.getElementById('lowStockBtn').addEventListener('click', async function() {
            const products = await getFirestoreCollection('products');
            const lowStockProducts = products.filter(product => product.currentStock <= product.minStock);
            
            if (lowStockProducts.length > 0) {
                addNotification('warning', 'Low Stock Alert', `${lowStockProducts.length} products are running low on stock`);
                showToast(`${lowStockProducts.length} products need attention`, 'warning');
            } else {
                addNotification('success', 'Stock Status', 'All products are adequately stocked');
                showToast('All products are adequately stocked', 'success');
            }
        });
        
        document.getElementById('exportReorder').addEventListener('click', exportReorderReport);
        document.getElementById('refreshAnalytics').addEventListener('click', loadAnalytics);
        
        document.getElementById('customerSearch').addEventListener('input', function() {
            if (this.value.length === 10) {
                searchCustomerHistory(this.value);
            } else if (this.value.length === 0) {
                document.getElementById('customerHistoryList').innerHTML = '';
            }
        });
        
        document.getElementById('saveStoreInfo').addEventListener('click', saveStoreInfo);
        
        document.getElementById('smsAlertBtn').addEventListener('click', sendAlertViaMessage);
        
        document.querySelectorAll('.modal-close, [data-dismiss="modal"]').forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    hideModal(modal.id);
                }
            });
        });
        
        document.querySelector('.toast-close').addEventListener('click', function() {
            document.getElementById('toast').classList.remove('show');
        });
        
        document.getElementById('productSearch').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.products-grid .product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (currentTheme === 'auto') {
                applyTheme('auto');
            }
        });
        
        populateCategories();
        await updateProductSelect();
        updateConnectionStatus();
        updateLanguage();

    } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Error initializing app. Please refresh the page.', 'error');
        addNotification('error', 'Initialization Error', 'Failed to initialize the application');
    }
});

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.showModal = showModal;
window.hideModal = hideModal;
window.markNotificationAsRead = markNotificationAsRead;
window.toggleAnalyticsView = toggleAnalyticsView;
window.updateStock = updateStock;
