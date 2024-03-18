document.addEventListener('DOMContentLoaded', function () {
  // Load cart items from localStorage if available
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to update cart count
  function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cartItems.length;
  }

  // Function to add item to cart
  function addToCart(productName, price) {
    cartItems.push({ productName, price, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    displayCartItems();
  }

  // Function to display cart items
  function displayCartItems() {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';
    let totalPayable = 0;

    cartItems.forEach((item, index) => {
      const { productName, price, quantity } = item;
      const row = document.createElement('tr');
      row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${productName}</td>
                <td>${price}</td>
                <td>${quantity}</td>
            `;
      cartTableBody.appendChild(row);
      totalPayable += price * quantity;
    });

    // Update total payable
    const totalRow = document.querySelector('#cartTable tbody tr:last-child');
    const totalPayableCell = totalRow.querySelector('td:last-child');
    totalPayableCell.textContent = '$' + totalPayable.toFixed(2);
  }

  // Event listener for Add to Cart button
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const productDiv = this.parentElement;
      const productName = productDiv.querySelector('.product__name').textContent;
      const productPrice = parseFloat(
        productDiv.querySelector('.product__price').textContent.replace('$', '')
      );
      addToCart(productName, productPrice);
    });
  });

  // Initialize cart count and display cart items
  updateCartCount();
  displayCartItems();
  console.log('Added to cart.');
});
