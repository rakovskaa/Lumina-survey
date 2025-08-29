const navBtn = document.querySelectorAll(".header");
 navBtn.forEach((navBtn) => {
 navBtn.addEventListener("click", () => {
 const hiddenText = navBtn.nextElementSibling;
 hiddenText.classList.toggle("show");    
})
 });

const surveyBtn = document.getElementById("open-form-btn");
const form = document.querySelector("form");
const body = document.body;

surveyBtn.addEventListener("click", () => {
form.style.display = "block";  
body.style.backgroundImage = 'url("face-mask.jpg")';  
body.style.backgroundSize = 'cover';
body.style.backgroundRepeat = 'no-repeat';
body.style.backgroundPosition = 'center';

surveyBtn.style.visibility = "hidden";

 navBtn.forEach((btn) => {
    btn.style.display = "none";
})
});

form.addEventListener("submit", (e) => {
const checkboxes = document.querySelectorAll('input[name="used-products"]');
const oneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

if(!oneChecked) {
e.preventDefault();
alert("Please select at least one product you used.");    
return;
}

navBtn.forEach((btn) => {
    btn.style.display = "block";
})
});

const closeBtn = document.getElementById("close-form-btn");

 closeBtn.addEventListener("click", () => {
 form.style.display = "none";
 surveyBtn.style.visibility = "visible";   
 body.style.backgroundImage = 'url("lumina-bg.jpg")';

 navBtn.forEach((btn) => {
    btn.style.display = "block";
})
 })


 
/*const products = [
{name: "Shampoo and Conditioner", price: 18},
{name: "Face mask", price: 12},
{name: "Eye cream", price: 21},
{name: "Daily moisturizer", price: 18}
{name: "Nighttime moisturizer", price: 21},
{name: "Facial cleanser", price:  12},];

class Cart {
constructor (name, price) {
this.name = name;
this.price = price;    
}    
}*/
