# Payment Gateway System

A modern, responsive payment gateway interface that replicates the functionality of the original kntpyment.netlify.app website.

## Features

- 🎨 **Modern UI Design** - Beautiful gradient backgrounds with glassmorphism effects
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Form Validation** - Real-time validation for all payment fields
- ⚡ **Fast Loading** - Optimized for quick page loads
- 🔗 **URL-based Data** - Payment information encoded in URLs for easy sharing
- 💳 **Credit Card Formatting** - Automatic formatting for card numbers and dates
- ✨ **Smooth Animations** - Professional animations and transitions
- 🛡️ **Security Indicators** - Visual security assurance for users

## Project Structure

```
payment-gateway/
├── index.html          # Main payment page
├── style.css           # All styling and animations
├── script.js           # JavaScript functionality
├── generator.html      # Payment URL generator tool
├── README.md          # This file
└── pay/
    └── index.html     # Redirect handler for /pay/ routes
```

## How to Use

### 1. Basic Payment Page
Open `index.html` in your browser to access the payment form.

### 2. Payment URL with Data
You can pass payment information via URL parameters using base64 encoded JSON data:

```
index.html?data=eyJjdXN0b21lck5hbWUiOiJUYXAiLCJhbW91bnQiOjIsImRlc2NyaXB0aW9uIjoiaW52b2ljZSIsImlkIjoiazhrbHd3bW13In0=
```

This URL contains the following decoded data:
```json
{
  "customerName": "Tap",
  "amount": 2,
  "description": "invoice",
  "id": "k8klwwmmw"
}
```

### 3. URL Generator Tool
Use `generator.html` to easily create payment URLs:
1. Fill in the customer details
2. Click "Generate Payment URL"
3. Copy the generated URL
4. Share with customers

### 4. Pay Route Structure
The `/pay/` directory handles payment routing similar to the original site structure.

## API/Data Format

The payment data is passed as a base64-encoded JSON object with the following structure:

```json
{
  "customerName": "string",    // Customer's name
  "amount": number,           // Payment amount (numeric)
  "description": "string",    // Payment description
  "id": "string"             // Unique payment/invoice ID
}
```

## Form Validation

The payment form includes comprehensive validation:

- **Card Number**: 13-19 digits with automatic spacing
- **Expiry Date**: MM/YY format with future date validation
- **CVV**: 3-4 digit security code
- **Cardholder Name**: Alphabetic characters only
- **Email**: Valid email format

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icons
- **Base64 Encoding** - Data transmission

## Security Note

⚠️ **Important**: This is a frontend demonstration only. For production use:

1. Implement proper backend payment processing
2. Use HTTPS for all transactions
3. Integrate with secure payment providers (Stripe, PayPal, etc.)
4. Add server-side validation
5. Implement proper error handling
6. Add authentication and authorization

## Customization

### Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #28a745;
  --error-color: #dc3545;
}
```

### Styling
All styles are contained in `style.css` with organized sections:
- Base styles
- Payment card design
- Form styling
- Modal components
- Animations
- Responsive design

### Functionality
Modify `script.js` to:
- Change validation rules
- Add payment processors
- Customize success/error handling
- Add analytics tracking

## Development

To run locally:
1. Clone or download the files
2. Open `index.html` in a modern web browser
3. Or serve via a local web server for testing

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For questions or issues:
1. Check the browser console for errors
2. Ensure all files are in the correct directory structure
3. Verify that JavaScript is enabled in your browser

---

**Note**: This is a demonstration payment gateway. Do not use for actual financial transactions without proper backend integration and security measures.