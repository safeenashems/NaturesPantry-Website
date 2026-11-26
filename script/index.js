
  // theme changing fn
// const themeButton=document.getElementById("themeButton");
// themeButton.addEventListener('click',()=>{
//   const body=document.body;
//   if(body.classList.contains('light-theme')){
//     body.classList.replace('light-theme','dark-theme');
//   }
//   else{
//     body.classList.replace('dark-theme','light-theme');
//   }
// });


  function toggleForms(){
    var form1=document.getElementById('signIn');//login form
    var form2=document.getElementById('signup');
    if (form1.style.display === "none") {
                form1.style.display = "block";
                form2.style.display = "none";
            } else {
                form1.style.display = "none";
                form2.style.display = "block";
            }

  }
   // Signup function
   function signup(event) {
    event.preventDefault();
           const mobile = document.getElementById('mob').value;
           const fullName = document.getElementById('fulName').value;
           const  username = document.getElementById('signupuName').value;
           const  password = document.getElementById('signupPswd').value;
           
       // Get the existing users array from localStorage, or create an empty array if it doesn't exist
      let users = JSON.parse(localStorage.getItem("users")) || [];

// Check if the username already exists
const userExists = users.find(user => user.username === username);

if (userExists) {
  alert("Username is already registered!");
}
else if(mobile===''||fullName===''||username===''||password==='')
{ alert("fields cannot be empty...!");} 
else {
  // Add the new user as an object to the array
  users.push({ mobile:mobile,fullName:fullName, username: username, password: password });

  // Save the updated array back to localStorage
  localStorage.setItem("users", JSON.stringify(users));
  
  document.getElementById('signup').style.display = 'none';

  // Switch to login form
  alert("Signup successful! Please login..."); 
             
            
            // toggleForms();
            //  if (confirm("Signup successful! Please login...")) {
            //   document.getElementById('signIn').style.display = 'block';     } 
        }
      }
    
  //login fn
  function login(event){
    event.preventDefault();
   const username = document.getElementById('loginuName').value;
           const password = document.getElementById('loginPswd').value;
            
            // Retrieve the stored username and password from localStorage
           const users=JSON.parse(localStorage.getItem("users"))||[];
          
            // Check if entered credentials match the stored credentials

    //         function validateLogin(username, password) {   
   
    // if (users[username] && users[username] === password) {  
    // // document.write('Login successful!');  
    // window.location.href = 'indexProfile.html';


            const usercheck = users.find(user => user.username === username && user.password===password);
            if (usercheck) {
              // alert("successfully logged in...");
               window.location.href = 'view/Inventory.html'; 
               localStorage.setItem("loggedInUser",username);
            }
            
            else {
             alert("Login failed! Invalid username or password.");
            }
        }
  
// When the user clicks anywhere outside of the modal, close it

//   window.onclick = function(event) {
//   if (event.target ==signup) {
//     signup.style.display = "none";}
//   else{
//    signIn.style.display ='none';
//   }
//  }


//aboutus section read more button
// Get the button and content elements
const readMoreBtn = document.getElementById("readMoreBtn");
const hiddenContent = document.querySelector(".hidden-content");

// Add an event listener to the button
readMoreBtn.addEventListener("click", function() {
    // Toggle the visibility of the hidden content
    if (hiddenContent.style.display === "none" || hiddenContent.style.display === "") {
        hiddenContent.style.display = "flex"; // Show content
        readMoreBtn.textContent = "Read Less"; // Change button text to "Read Less"
    } else {
        hiddenContent.style.display = "none"; // Hide content
        readMoreBtn.textContent = "Read More"; // Change button text back to "Read More"
    }
});
     
        //  theme toggle  
   
      const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
document.body.classList.toggle("dark-theme")
})












