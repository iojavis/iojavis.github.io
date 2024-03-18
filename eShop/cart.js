// document.addEventListener('DOMContentLoaded', function () {
//   // Load cart items from localStorage if available
//   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

//   // Function to update cart count
//   function updateCartCount() {
//     const cartCountElement = document.getElementById('cartCount');
//     cartCountElement.textContent = cartItems.length;
//   }

//   // Function to add item to cart
//   function addToCart(productName, price) {
//     cartItems.push({ productName, price, quantity: 1 });
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//     updateCartCount();
//     displayCartItems();
//   }

//   // Function to display cart items
//   function displayCartItems() {
//     const cartTableBody = document.querySelector('#cartTable tbody');
//     cartTableBody.innerHTML = '';
//     let totalPayable = 0;

//     cartItems.forEach((item, index) => {
//       const { productName, price, quantity } = item;
//       const row = document.createElement('tr');
//       row.innerHTML = `
//                 <th scope="row">${index + 1}</th>
//                 <td>${productName}</td>
//                 <td>${price}</td>
//                 <td>${quantity}</td>
//             `;
//       cartTableBody.appendChild(row);
//       totalPayable += price * quantity;
//     });

//     // Update total payable
//     const totalRow = document.querySelector('#cartTable tbody tr:last-child');
//     const totalPayableCell = totalRow.querySelector('td:last-child');
//     totalPayableCell.textContent = '$' + totalPayable.toFixed(2);
//   }

//   // Event listener for Add to Cart button
//   const addToCartButtons = document.querySelectorAll('.add-to-cart');
//   addToCartButtons.forEach((button) => {
//     button.addEventListener('click', function () {
//       const productDiv = this.parentElement;
//       const productName = productDiv.querySelector('.product__name').textContent;
//       const productPrice = parseFloat(
//         productDiv.querySelector('.product__price').textContent.replace('$', '')
//       );
//       addToCart(productName, productPrice);
//     });
//   });

//   // Initialize cart count and display cart items
//   updateCartCount();
//   displayCartItems();
//   console.log('Added to cart.');
// });

/*new code */

// Function to add item to localStorage
// function addToLocalStorage(productName, quantity, price, total) {
//   var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   var newItem = {
//     productName: productName,
//     quantity: quantity,
//     price: price,
//     total: total,
//   };
//   cartItems.push(newItem);
//   localStorage.setItem('cartItems', JSON.stringify(cartItems));
// }

// // Function to load items from localStorage
// function loadFromLocalStorage() {
//   var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   cartItems.forEach(function (item) {
//     var newRow =
//       '<tr>' +
//       '<td>' +
//       (document.querySelectorAll('#cartTable tbody tr').length + 1) +
//       '</td>' +
//       '<td>' +
//       item.productName +
//       '</td>' +
//       '<td>' +
//       item.quantity +
//       '</td>' +
//       '<td>$' +
//       item.price.toFixed(2) +
//       '</td>' +
//       "<td><button class='btn btn-danger' onclick='removeFromCart(this)'>X</button></td>" +
//       '<td>$' +
//       item.total.toFixed(2) +
//       '</td>' +
//       '</tr>';
//     document.querySelector('#cartTable tbody').insertAdjacentHTML('beforeend', newRow);
//   });
//   updateCartTotal();
// }

// // Add event listener to all "Add to Cart" buttons
// var addToCartButtons = document.querySelectorAll('.add-to-cart');
// addToCartButtons.forEach(function (button) {
//   button.addEventListener('click', function () {
//     var productName = this.parentElement
//       .querySelector('.buy-product__name')
//       .textContent.trim();
//     var quantity = parseInt(this.parentElement.querySelector('.order-quantity').value);
//     var price = parseFloat(
//       this.parentElement.querySelector('.buy-product__price').textContent.replace('$', '')
//     );
//     var total = quantity * price;

//     // Add item to localStorage
//     addToLocalStorage(productName, quantity, price, total);

//     // Create a new row for the cart table
//     var newRow =
//       '<tr>' +
//       '<td>' +
//       (document.querySelectorAll('#cartTable tbody tr').length + 1) +
//       '</td>' +
//       '<td>' +
//       productName +
//       '</td>' +
//       '<td>' +
//       quantity +
//       '</td>' +
//       '<td>$' +
//       price.toFixed(2) +
//       '</td>' +
//       "<td><button class='btn btn-danger' onclick='removeFromCart(this)'>X</button></td>" +
//       '<td>$' +
//       total.toFixed(2) +
//       '</td>' +
//       '</tr>';

//     // Append the new row to the cart table
//     document.querySelector('#cartTable tbody').insertAdjacentHTML('beforeend', newRow);

//     // Update the total
//     updateCartTotal();
//   });
// });

// // Function to remove item from cart
// function removeFromCart(button) {
//   var row = button.closest('tr');
//   row.remove();
//   updateCartTotal();
// }

// // Function to update cart total
// function updateCartTotal() {
//   var total = 0;
//   var rows = document.querySelectorAll('#cartTable tbody tr');
//   rows.forEach(function (row) {
//     var price = parseFloat(row.cells[3].textContent.replace('$', ''));
//     total += price;
//   });
//   document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
// }

// // Load items from localStorage when the page loads
// loadFromLocalStorage();


// Initialize cart count from localStorage or default to 0
var cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
document.getElementById("cartCount").textContent = cartCount;

// Add event listener to all "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    var productName = this.parentElement.querySelector(".buy-product__name").textContent.trim();
    var quantity = parseInt(this.parentElement.querySelector(".order-quantity").value);
    var price = parseFloat(this.parentElement.querySelector(".buy-product__price").textContent.replace("$", ""));
    var total = quantity * price;
    
    // Create a new row for the cart table
    var newRow = "<tr>" +
                 "<td>" + (document.querySelectorAll("#cartTable tbody tr").length + 1) + "</td>" +
                 "<td>" + productName + "</td>" +
                 "<td>" + quantity + "</td>" +
                 "<td>$" + price.toFixed(2) + "</td>" +
                 "<td><button class='btn btn-danger' onclick='removeFromCart(this)'>X</button></td>" +
                 "<td>$" + total.toFixed(2) + "</td>" +
                 "</tr>";

    // Append the new row to the cart table
    document.querySelector("#cartTable tbody").insertAdjacentHTML("beforeend", newRow);
    
    // Update the total
    updateCartTotal();
    
    // Update cart count and store in localStorage
    cartCount += quantity;
    localStorage.setItem("cartCount", cartCount);
    document.getElementById("cartCount").textContent = cartCount;
  });
});

// Function to remove item from cart
function removeFromCart(button) {
  var row = button.closest("tr");
  var quantity = parseInt(row.cells[2].textContent);
  
  // Update cart count and store in localStorage
  cartCount -= quantity;
  localStorage.setItem("cartCount", cartCount);
  document.getElementById("cartCount").textContent = cartCount;
  
  row.remove();
  updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
  var total = 0;
  var rows = document.querySelectorAll("#cartTable tbody tr");
  rows.forEach(function(row) {
    var price = parseFloat(row.cells[3].textContent.replace("$", ""));
    total += price;
  });
  document.getElementById("cartTotal").textContent = "$" + total.toFixed(2);
}
