document.addEventListener('DOMContentLoaded', function() {
  var cartItems = [];

  // Load cart items from cookies
  var cartItemsCookie = getCookie('cartItems');
  if (cartItemsCookie) {
    cartItems = JSON.parse(cartItemsCookie);
    renderCart();
  }

  function addToCart(productName, price) {
    var item = {
      name: productName,
      price: price
    };

    cartItems.push(item);

    // Update the cart display
    renderCart();

    // Save cart items to cookies
    setCookie('cartItems', JSON.stringify(cartItems), 7);
  }

  function renderCart() {
    var cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = ''; // Clear previous content

    cartItems.forEach(function(item) {
      var itemElement = document.createElement('li');
      itemElement.textContent = item.name + ' - $' + item.price.toFixed(2);
      cartElement.appendChild(itemElement);
    });
  }

  function addProductButton(productButton) {
    var productName = productButton.dataset.product;
    var price = parseFloat(productButton.dataset.price);

    productButton.addEventListener('click', function() {
      addToCart(productName, price);
    });
  }

  // Get all product buttons
  var productButtons = document.getElementsByClassName('product-button');

  // Loop through each product button and add the click event listener
  for (var i = 0; i < productButtons.length; i++) {
    addProductButton(productButtons[i]);
  }

  // Toggle the side menu cart
  var cartContainer = document.getElementById('cart-container');
  var cartToggle = document.getElementById('cart-toggle');

  cartToggle.addEventListener('click', function() {
    cartContainer.classList.toggle('open');
  });

  // Checkout button functionality
  var checkoutButton = document.getElementById('checkout-button');
  checkoutButton.addEventListener('click', function() {
    // Perform checkout logic here
    calculateTotal();
  });

  // Helper function to set a cookie
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  // Helper function to get a cookie value
  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  // Calculate the total price including GST tax and delivery charges
  function calculateTotal() {
    var subtotal = 0;
    cartItems.forEach(function(item) {
      subtotal += item.price;
    });

    var gstTax = subtotal * 0.18;
    var deliveryCharges = 40;
    var total = subtotal + gstTax +deliveryCharges;

    alert('Subtotal: $' + subtotal.toFixed(2) + '\nGST Tax (18%): $' + gstTax.toFixed(2) + '\nDelivery Charges: $' + deliveryCharges.toFixed(2) + '\nTotal: $' + total.toFixed(2));
  }
});
