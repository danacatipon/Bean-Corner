document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // You can collect other form data here if needed
        const buyerName = document.getElementById('buyer-name').value;
        const buyerPhone = document.getElementById('buyer-phone').value;
        const postalCode = document.getElementById('postal-code').value;
        const streetAddress = document.getElementById('street-address').value;
        const province = document.getElementById('province').value;
        const city = document.getElementById('city').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        console.log({
            buyerName,
            buyerPhone,
            postalCode,
            streetAddress,
            province,
            city,
            paymentMethod
        });

        // Simulate order successful alert
        alert('Order Successful!');

        // Redirect back to index.html
        window.location.href = 'index.html';
    });
});
