// document.addEventListener('DOMContentLoaded', function () {
//   const addToCartButtons = document.querySelectorAll('.add-to-cart');
//   const cartCount = document.getElementById('cartCount');
//   const cartTable = document.getElementById('cartTable');
//   let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//   // Update cart count
//   function updateCartCount() {
//     cartCount.textContent = cartItems.length;
//   }

//   // Update cart items table
//   function updateCartTable() {
//     cartTable.innerHTML = '';
//     cartItems.forEach((item, index) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//               <td>${index + 1}</td>
//               <td>${item.name}</td>
//               <td>${item.quantity}</td>
//               <td>$${item.price}</td>
//               <td><button class="btn btn-danger delete-item">X</button></td>
//               <td>$${item.quantity * item.price}</td>
//           `;
//       cartTable.appendChild(row);

//       // Add event listener to delete button
//       const deleteButton = row.querySelector('.delete-item');
//       deleteButton.addEventListener('click', function () {
//         cartItems.splice(index, 1);
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//         updateCartCount();
//         updateCartTable();
//       });
//     });
//   }

//   // Add item to cart
//   function addToCart(name, price, quantity) {
//     const existingItemIndex = cartItems.findIndex((item) => item.name === name);
//     if (existingItemIndex !== -1) {
//       cartItems[existingItemIndex].quantity += quantity;
//     } else {
//       cartItems.push({ name, price, quantity });
//     }
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     updateCartCount();
//     updateCartTable();
//   }

//   addToCartButtons.forEach((button) => {
//     button.addEventListener('click', function () {
//       const productName = this.parentNode.querySelector('.product__name').textContent;
//       const productPrice = parseFloat(
//         this.parentNode.querySelector('.product__price').textContent.slice(1)
//       ); // Remove '$' and parse as float
//       const quantityInput = this.parentNode.querySelector('.order-quantity');

//       if (!quantityInput) {
//         // If quantity input field is not found, default to quantity of 1
//         addToCart(productName, productPrice, 1);
//       } else {
//         const quantity = parseInt(quantityInput.value) || 1; // Use 1 if quantity is not specified
//         addToCart(productName, productPrice, quantity);
//         // Reset quantity input to default value (1)
//         quantityInput.value = 1;
//       }
//     });
//   });

//   // Initial setup
//   updateCartCount();
//   updateCartTable();
// });

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cartCount');
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let cartTableHTML = localStorage.getItem('cartTableHTML') || getDefaultCartTableHTML();

  // Update cart count
  function updateCartCount() {
      cartCount.textContent = cartItems.length;
  }

  // Update cart items table
  function updateCartTable() {
      const cartTableContainer = document.getElementById('cartTableContainer');
      if (cartTableContainer) {
          cartTableContainer.innerHTML = cartTableHTML;
          const cartTableBody = cartTableContainer.querySelector('tbody');
          if (!cartTableBody) {
              console.error('tbody element not found in cartTableHTML');
              return;
          }
          cartTableBody.innerHTML = '';
          cartItems.forEach((item, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price}</td>
                  <td><button class="btn btn-danger delete-item" data-index="${index}">X</button></td>
                  <td>$${item.quantity * item.price}</td>
              `;
              cartTableBody.appendChild(row);
          });
      } else {
          console.error('cartTableContainer element not found');
      }
  }

  // Add item to cart
  function addToCart(name, price, quantity) {
      const existingItemIndex = cartItems.findIndex(item => item.name === name);
      if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += quantity;
      } else {
          cartItems.push({ name, price, quantity });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      updateCartTable();
      updateLocalStorageCartTable();
  }

  // Delete item from cart
  function deleteCartItem(index) {
      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      updateCartTable();
      updateLocalStorageCartTable();
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.parentNode.querySelector('.product__name').textContent;
        const productPrice = parseFloat(this.parentNode.querySelector('.product__price').textContent.slice(1)); // Remove '$' and parse as float
        const quantityInput = this.parentNode.querySelector('.order-quantity');

        if (!quantityInput) {
            // If quantity input field is not found, default to quantity of 1
            addToCart(productName, productPrice, 1);
        } else {
            const quantity = parseInt(quantityInput.value) || 1; // Use 1 if quantity is not specified
            addToCart(productName, productPrice, quantity);
            // Reset quantity input to default value (1)
            quantityInput.value = 1;
        }
    });
});


  // Delete item event listener
  document.addEventListener('click', function (event) {
      if (event.target.classList.contains('delete-item')) {
          const index = parseInt(event.target.dataset.index);
          if (!isNaN(index)) {
              deleteCartItem(index);
          }
      }
  });

  // Function to update the cart table in local storage
  function updateLocalStorageCartTable() {
      cartTableHTML = document.getElementById('cartTableContainer').innerHTML;
      localStorage.setItem('cartTableHTML', cartTableHTML);
  }

  // Function to get default cart table HTML
  function getDefaultCartTableHTML() {
      // Return your default cart table HTML structure here
      return `
          <table id="cartTable" class="table table-striped table-hover table-bordered">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Total</th>
                  </tr>
              </thead>
              <tbody>
                  <!-- Cart items will be inserted here dynamically -->
              </tbody>
          </table>
      `;
  }

  // Initial setup
  updateCartCount();
  updateCartTable();
});
