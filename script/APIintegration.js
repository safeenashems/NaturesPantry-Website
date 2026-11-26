// Api integration starts here
const url=`https://dummyjson.com/products?limit=100`;
const resultList = document.getElementById('productList');
let currentPage=1; const itemCount=100;
document.getElementById('searchInput').addEventListener('input',fetch_fltr_dispPdts);
// let allPdts=[];  

async function fetch_fltr_dispPdts() {
    const query = document.getElementById('searchInput').value.toLowerCase();  
 // const url = `https://dummyjson.com/products/search?q=${query}`;

 
    try {
         const response = await fetch(url);
         if(!response.ok){ throw new Error(`httpmerror! status:${response.status}`) }
        const data = await response.json();
        //filter pdts for speicified categories
        const filteredPdts=data.products.filter(product=>['beauty','groceries' ,'home-decoration' ,'kitchen-accessories','womens-jewellery','furniture','fragrances'].includes(product.category));

       // const allPdts=data.products.category.filter['beauty','skincare','fragrance'];
         resultList.innerHTML = ''; // Clear previous results
 
         //filtter pdts based on search query
    const filterPdts=filteredPdts.filter(pdt=>{
        return(
            (pdt.title && pdt.title.toLowerCase().includes(query)) ||
        (pdt.description && pdt.description.toLowerCase().includes(query)) ||
        (pdt.tags && pdt.tags.some(tag=>tag.toLowerCase().includes(query))) ||  //ensure tags exist b4 checking
        (pdt.brand && pdt.brand.toLowerCase().includes(query))
        );
    });
//display filtered pdts

        if (filterPdts.length > 0) {
            filterPdts.forEach(product => {
                const listItem = document.createElement('li');
                listItem.classList.add("listedItem");

                const img=document.createElement('img');
                img.src=product.thumbnail; img.alt=product.title;
                img.classList.add('item-img');

                const title=document.createElement('h6');
                title.innerText=product.title;

                const desc = document.createElement('p');
                desc.classList.add('desc');
                desc.innerText =  product.description;

                const price=document.createElement('span');
                price.classList.add('priceAmt');
                price.innerText="Rs " + product.price;

                const discPerc=document.createElement('span');
                discPerc.innerText= " ("+product.discountPercentage +"% off)";
                discPerc.classList.add('discPcnt');

                  // Create a container div for the price and discount
                const priceContainer = document.createElement('div');
                priceContainer.classList.add('priceContainer');
                  // Append price and discount to the container
                priceContainer.appendChild(price);
                priceContainer.appendChild(discPerc);

                const btn=document.createElement('button');
                btn.innerText="View Details";
                btn.classList.add('view-details-btn');
                btn.style.padding = "5px 0px";
                

                listItem.appendChild(img);
                listItem.appendChild(title);
                listItem.appendChild(desc);
                // listItem.appendChild(price);
                // listItem.appendChild(discPerc);
                listItem.appendChild(priceContainer);
                listItem.appendChild(btn);// need to add eventlistener

            //     listItem.innerHTML=`
            //     <img src="${product.thumbnail}"/>

            //    <h3>${product.title}</h3>
            //    <h4>$${product.price}</h4>
            //    <h6>${product.discountPercentage}% off<h6>
            //    <button>View Details</button>`

               // classlist is used to create a claasname for listitem ,so can style in css
             
             

               //appending img to the list item
              
                resultList.appendChild(listItem);
            });
        } else {
            resultList.innerHTML = `<li>No products found</li>`;
        }
    }catch (error) {
        document.getElementById('productList').innerText = `Error fetching data: ${error.message}`;
    }  
}
//view details button click
function viewdetails(productId){  alert('displaying details for product ID:${productId}'); }
//search section ends





// Reusable function to fetch and display products based on category
async function displayProducts(category) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP error! Status: ${response.status}');
      }
  
      const data = await response.json();

      //console.log("all categories in data:",data.products.map(pdt=>pdt.category));

      resultList.innerHTML = ''; // Clear previous results
  
      // Filter products by the provided category
      const filteredProducts = data.products.filter(pdt => pdt.category.trim().toLowerCase()=== category.trim().toLowerCase());
     //calculate start and end index based on current page
     const strtIndx=(currentPage-1)*itemCount;
     const endIndx=strtIndx+itemCount;

     //slice products for current page
     const currPagePdts=filteredProducts.slice(strtIndx,endIndx);

      if (currPagePdts.length > 0) {
       currPagePdts.forEach(pdt => {
          const li = document.createElement('li');
          li.classList.add('listedItem');
          
          const img = document.createElement('img');
          img.src = pdt.thumbnail;
          img.alt = pdt.title;
          img.classList.add('item-img');
          
          const title = document.createElement('h6');
          title.classList.add('title');
          title.innerText = pdt.title;

          const desc = document.createElement('p');
          desc.classList.add('desc');
          desc.innerText =  pdt.description;
          
          const price = document.createElement('span');
          price.classList.add('priceAmt');
          price.innerText = "Rs " + pdt.price;
          
          const discPerc = document.createElement('span');
          discPerc.innerText = `  (${pdt.discountPercentage}% off)`;
          discPerc.classList.add('discPcnt');

           // Create a container div for the price and discount
           const priceContainer = document.createElement('div');
            priceContainer.classList.add('priceContainer');
            // Append price and discount to the container
           priceContainer.appendChild(price);
           priceContainer.appendChild(discPerc);

          const btn=document.createElement('button');
          btn.innerText="View Details";
          btn.classList.add('view-details-btn');
          btn.style.padding = "5px 0px";
          
          li.appendChild(img);
          li.appendChild(title);
          li.appendChild(desc);
          // li.appendChild(price);
          // li.appendChild(discPerc);
          li.appendChild(priceContainer);
          li.appendChild(btn);// need to add eventlistener
          resultList.appendChild(li);
        });
      } else {
        resultList.innerHTML = '<li>No products found in this category.</li>';
      }
    } catch (error) {
      resultList.innerHTML = 'Error fetching data: ${error.message}';
    }
  }
  //load more products when scrolling near the bottom of page
  window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){
        currentPage++;
        displayProducts(category);
    }
  })
  //for default loading
  displayProducts('groceries');




  
  // Function to display Groceries
  function groceriesCtgrDisp() {
    displayProducts('groceries');
  }
  
  // Function to display Furniture
  function KitchenCtgrDisp() {
    displayProducts('kitchen-accessories');
  }

   // Function to display Groceries
   function beautyCtgrDisp() {
    displayProducts('beauty');
  }
   // Function to display Groceries
   function FragrancesCtgrDisp() {
    displayProducts('fragrances');
  }
   // Function to display Groceries
   function homeDecorationCtgrDisp() {
    displayProducts('home-decoration');
  }
  
  
 