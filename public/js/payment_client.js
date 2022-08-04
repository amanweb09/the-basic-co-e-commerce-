const user = {
    name: 'Aman Khanna',
    email: 'amankhanna224466@gmail.com',
    tel: '7894561230'
}

const options = {
    "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    "amount": '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "The Basic Company",
    "description": "pay securely with Razorpay",
    "image": "https://example.com/your_logo",
    "order_id": '62dd5ef509843ee5805048dc', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": user.name,
        "email": user.email,
        "contact": user.tel
    },
    "notes": {
        "Contact Number": "+91-1234567890"
    },
    "theme": {
        "color": "#3399cc"
    }
};
const rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
}
