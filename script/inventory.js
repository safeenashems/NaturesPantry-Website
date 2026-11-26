
  // Initialize products array
  let products = [];

  // Add product function
  function addPdt(event) {
    event.preventDefault(); // Prevent form submission

    const pdtID = document.getElementById('pdtID').value;
    const pdtName = document.getElementById('pdtName').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const pdtCtgr = document.getElementById('pdtCtgr').value;
    const qty = document.getElementById('qty').value;
    const desc = document.getElementById('desc').value;

    // Get existing products from localStorage or initialize an empty array
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Check if the product already exists
    const PdtExists = products.find(pdt => pdt.pdtID === pdtID);

    if (PdtExists) {
      alert("It's an existing product!");
    } else if (!pdtID || !pdtName || !unitPrice || !pdtCtgr || !qty) {
      alert("Fields cannot be empty!");
    } else {
      // Add the new product to the array
      products.push({ pdtID, pdtName, unitPrice, pdtCtgr, qty, desc });

      // Save updated products array to localStorage
      localStorage.setItem("products", JSON.stringify(products));

      // Re-render the product table
      renderProductTable();

      // Clear the form and close the modal
      document.getElementById("addPdtForm").reset();
      var modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
      modal.hide();

      //showing success toast for adding
      // showToast('<i class="fa-thin fa-thumbs-up"></i>Product Added Successfully..!');
      showToast('success','product added successfully..!');


    }
  }

  // Function to delete a product
  function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.splice(index, 1); // Remove product from array
      localStorage.setItem("products", JSON.stringify(products)); // Update localStorage
      renderProductTable(); // Re-render the table
      //showing success toast for deleting
      showToast("danger","Product deleted Successfully..!");
    }
  }



  
  // Function to render the product table
  function renderProductTable() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    console.log(products);
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';  // Clear previous rows

    // Loop through products and add them to the table
    products.forEach((product, index) => {
      let row = table.insertRow();

      row.insertCell(0).innerHTML = product.pdtID;
      row.insertCell(1).innerHTML = product.pdtName.toUpperCase();
      row.insertCell(2).innerHTML = product.unitPrice;
      row.insertCell(3).innerHTML = product.pdtCtgr.toUpperCase();;
      row.insertCell(4).innerHTML = product.qty;
      row.insertCell(5).innerHTML = product.desc.toUpperCase();;

      if (product.qty <= 10) {
        for(let i=0;i<row.cells.length;i++){
      row.cells[i].style.backgroundColor = 'red';
       
      }}
      
      row.insertCell(6).innerHTML = `<button class="btn btn-primary btn-sm" onclick="editProduct(${index})">EDIT <i class="fas fa-edit"></i></button>
                                      <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">DELETE <i class="fas fa-trash"></i></button>`;
  
   
     });
  }
  

  // Render the product table on page load
  window.onload = function() {
    renderProductTable();
    renderSalesTable();
  }


  function renderSalesTable() {
          
      let soldProduct = JSON.parse(localStorage.getItem("soldProduct")) || [];
      const table = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
      table.innerHTML = '';  // Clear previous rows

    // Loop through products and add them to the table
    soldProduct.forEach((product, index) => {
      const row = table.insertRow();

      if(parseInt(product.qty)<=10) row.style.backgroundColor='red';

      row.insertCell(0).innerHTML = product.pdtID;
      row.insertCell(1).innerHTML = product.pdtName.toUpperCase();
      row.insertCell(2).innerHTML = product.unitPrice;
      row.insertCell(3).innerHTML = product.pdtCtgr.toUpperCase();;
      row.insertCell(4).innerHTML = product.qty;
      row.insertCell(5).innerHTML = product.desc.toUpperCase();
      row.insertCell(6).innerHTML = `<button class="btn btn-danger btn-sm" onclick="deleteSalesEntry(${index})">DELETE <i class="fas fa-trash"></i></button>`;
  
     });
        }


   // Edit product functionality
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products[index];

    // Fill the modal form with existing product details
    document.getElementById('pdtID').value = product.pdtID;
    document.getElementById('pdtName').value = product.pdtName;
    document.getElementById('unitPrice').value = product.unitPrice;
    document.getElementById('pdtCtgr').value = product.pdtCtgr;
    document.getElementById('qty').value = product.qty;
    document.getElementById('desc').value = product.desc;

    // Update the form submission to handle updates
    document.getElementById('addPdtForm').onsubmit = function(event) {
        event.preventDefault();
        updateProduct(index);
    };

    // Show the modal
    var modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
}

// Update product function
function updateProduct(index) {
    const pdtID = document.getElementById('pdtID').value;
    const pdtName = document.getElementById('pdtName').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const pdtCtgr = document.getElementById('pdtCtgr').value;
    const qty = document.getElementById('qty').value;
    const desc = document.getElementById('desc').value;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    // Update the product details
    products[index] = { pdtID, pdtName, unitPrice, pdtCtgr, qty, desc };

    // Save updated products array to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Re-render the product table
    renderProductTable();

  
    // Clear the form and close the modal
    document.getElementById("addPdtForm").reset();
    var modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();

      //showing success toast for editing
      showToast('warning',"Product updated Successfully..!");

}

// Sell product function
function sellProduct(event) {
    event.preventDefault();

    const sellPdtID = document.getElementById('sellPdtID').value;
    const sellQty = document.getElementById('sellQty').value;

    let products = JSON.parse(localStorage.getItem("products")) || [];
    const productToSell = products.find(pdt => pdt.pdtID === sellPdtID);


    if (productToSell ) {
      if (parseInt(sellQty) > productToSell.qty) {
        alert(`Only ${product.qty} quantity in stock!`);
      } else {
        productToSell.qty -= sellQty;
        localStorage.setItem("products", JSON.stringify(products));

//add sold products to an array

let soldProduct=JSON.parse(localStorage.getItem("soldProduct"))||[];
soldProduct.push({pdtID:productToSell.pdtID,pdtName:productToSell.pdtName,unitPrice:productToSell.unitPrice,pdtCtgr:productToSell.pdtCtgr, qty:sellQty,desc:productToSell.desc});

localStorage.setItem("soldProduct", JSON.stringify(soldProduct));
renderSalesTable();
        renderProductTable();
document.getElementById("sellPdtForm").reset();
        var modal = bootstrap.Modal.getInstance(document.getElementById('sellProductModal'));
        modal.hide();
      }
    } else {
      alert("Incorrect Product ID!");
    }
  }


   // Function to delete a sales entry from table and add back to stock
   function deleteSalesEntry(index) {
    if (confirm('Do you need to delete this Sale?')) {
      let soldProduct = JSON.parse(localStorage.getItem("soldProduct")) || [];
      const returnProduct=soldProduct[index];
      soldProduct.splice(index, 1); // Remove product from array
       const returnQTY = parseInt(returnProduct.qty); 
       const returnProductID = returnProduct.pdtID; 
    
      localStorage.setItem("soldProduct", JSON.stringify(soldProduct)); // Update sales(soldProduct) localStorage
       renderSalesTable(); // Re-render the table
   
     

      //updating salesreturn back to inventory
      let products = JSON.parse(localStorage.getItem("products")) || [];
      const product = products.find(pdt=>pdt.pdtID===returnProductID);
      if(product){
      product.qty =parseInt(product.qty)+returnQTY;
      localStorage.setItem("products", JSON.stringify(products));//update stock(product) local storage
    renderProductTable();
      showToast("danger","Sales entry deleted  & stock updated..!");
    }
    else{alert("Product not found in inventory!!");}
  }}


 // Function to show specific toast
 function showToast(type, message) {
    let toastElement;

    // Set the appropriate toast element based on type
    if (type === 'success') {
      toastElement = document.getElementById('successToast');
      toastElement.querySelector('.toast-body').innerText = message;
    } else if (type === 'warning') {
      toastElement = document.getElementById('warningToast');
      toastElement.querySelector('.toast-body').innerText = message;
    } else if (type === 'danger') {
      toastElement = document.getElementById('dangerToast');
      toastElement.querySelector('.toast-body').innerText = message;
    }

    // Initialize Bootstrap toast
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toastElement.style.display = 'block'; // Ensure it is visible
    toast.show(); // Show the toast

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      toastElement.style.display = 'none';
    }, 3000);
  }

  // logout
  function logout(){
   // localStorage.removeItem("loggedInUser");
   // window.location.href="superMarketLogin.html";
   window.history.back();
  }
