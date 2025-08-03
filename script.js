// Payment data object
let paymentData = {};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadPaymentData();
    setupFormValidation();
    setupFormSubmission();
});

// Load payment data from URL parameters
function loadPaymentData() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
        try {
            // Decode base64 data
            const decodedData = atob(dataParam);
            paymentData = JSON.parse(decodedData);
            
            // Update UI with payment data
            updatePaymentInfo();
        } catch (error) {
            console.error('Error parsing payment data:', error);
            // Set default values if parsing fails
            setDefaultPaymentData();
        }
    } else {
        // Set default values if no data parameter
        setDefaultPaymentData();
    }
}

// Set default payment data
function setDefaultPaymentData() {
    paymentData = {
        customerName: 'Guest User',
        amount: 0,
        description: 'Payment',
        id: generateTransactionId()
    };
    updatePaymentInfo();
}

// Update payment information in the UI
function updatePaymentInfo() {
    document.getElementById('customerName').textContent = paymentData.customerName || 'N/A';
    document.getElementById('amount').textContent = `$${parseFloat(paymentData.amount || 0).toFixed(2)}`;
    document.getElementById('description').textContent = paymentData.description || 'N/A';
    document.getElementById('invoiceId').textContent = paymentData.id || 'N/A';
}

// Setup form validation
function setupFormValidation() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    
    // Format card number input
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
        
        // Validate card number
        validateCardNumber(e.target);
    });
    
    // Format expiry date input
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        
        // Validate expiry date
        validateExpiryDate(e.target);
    });
    
    // Format CVV input (numbers only)
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
        validateCVV(e.target);
    });
    
    // Add real-time validation to other fields
    document.getElementById('cardName').addEventListener('blur', function(e) {
        validateCardName(e.target);
    });
    
    document.getElementById('email').addEventListener('blur', function(e) {
        validateEmail(e.target);
    });
}

// Validation functions
function validateCardNumber(input) {
    const value = input.value.replace(/\s/g, '');
    const isValid = value.length >= 13 && value.length <= 19;
    
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else if (value.length > 0) {
        input.classList.remove('success');
        input.classList.add('error');
    } else {
        input.classList.remove('success', 'error');
    }
    
    return isValid;
}

function validateExpiryDate(input) {
    const value = input.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const isValid = regex.test(value);
    
    if (isValid) {
        // Check if date is not in the past
        const [month, year] = value.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const now = new Date();
        const isNotExpired = expiry > now;
        
        if (isNotExpired) {
            input.classList.remove('error');
            input.classList.add('success');
            return true;
        }
    }
    
    if (value.length > 0) {
        input.classList.remove('success');
        input.classList.add('error');
    } else {
        input.classList.remove('success', 'error');
    }
    
    return false;
}

function validateCVV(input) {
    const value = input.value;
    const isValid = value.length >= 3 && value.length <= 4;
    
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else if (value.length > 0) {
        input.classList.remove('success');
        input.classList.add('error');
    } else {
        input.classList.remove('success', 'error');
    }
    
    return isValid;
}

function validateCardName(input) {
    const value = input.value.trim();
    const isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
    
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else if (value.length > 0) {
        input.classList.remove('success');
        input.classList.add('error');
    } else {
        input.classList.remove('success', 'error');
    }
    
    return isValid;
}

function validateEmail(input) {
    const value = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);
    
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else if (value.length > 0) {
        input.classList.remove('success');
        input.classList.add('error');
    } else {
        input.classList.remove('success', 'error');
    }
    
    return isValid;
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('paymentForm');
    const submitButton = form.querySelector('.pay-button');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processPayment(submitButton);
        }
    });
}

// Validate entire form
function validateForm() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('cardName');
    const email = document.getElementById('email');
    
    const isValidCardNumber = validateCardNumber(cardNumber);
    const isValidExpiryDate = validateExpiryDate(expiryDate);
    const isValidCVV = validateCVV(cvv);
    const isValidCardName = validateCardName(cardName);
    const isValidEmail = validateEmail(email);
    
    return isValidCardNumber && isValidExpiryDate && isValidCVV && isValidCardName && isValidEmail;
}

// Process payment (simulation)
function processPayment(button) {
    // Disable button and show loading state
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.classList.add('loading');
    
    // Simulate payment processing delay
    setTimeout(() => {
        // Reset button state
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-lock"></i> Pay Now';
        button.classList.remove('loading');
        
        // Show success modal
        showSuccessModal();
    }, 2000);
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const transactionId = generateTransactionId();
    const currentDate = new Date().toLocaleDateString();
    
    // Update transaction details
    document.getElementById('transactionId').textContent = transactionId;
    document.getElementById('paidAmount').textContent = `$${parseFloat(paymentData.amount || 0).toFixed(2)}`;
    document.getElementById('transactionDate').textContent = currentDate;
    
    // Show modal
    modal.style.display = 'block';
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Generate random transaction ID
function generateTransactionId() {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Create payment URL with data
function createPaymentURL(customerName, amount, description, id) {
    const data = {
        customerName: customerName,
        amount: amount,
        description: description,
        id: id
    };
    
    const encodedData = btoa(JSON.stringify(data));
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?data=${encodedData}`;
}

// Utility function to copy payment URL to clipboard
function copyPaymentURL() {
    const url = createPaymentURL(
        paymentData.customerName || 'Guest',
        paymentData.amount || 0,
        paymentData.description || 'Payment',
        paymentData.id || generateTransactionId()
    );
    
    navigator.clipboard.writeText(url).then(() => {
        alert('Payment URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy URL:', err);
    });
}

// Handle ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add some console logs for debugging
console.log('Payment Gateway initialized');
console.log('Current payment data:', paymentData);