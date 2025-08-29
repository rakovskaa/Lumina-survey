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
const closeBtn = document.getElementById("close-form-btn");

surveyBtn.addEventListener("click", () => {
  form.classList.add("show"); // fade in
  surveyBtn.style.visibility = "hidden";
  
  navBtn.forEach((btn) => {
    const hiddenText = btn.nextElementSibling;
  if (hiddenText && hiddenText.classList.contains("show")) {
    hiddenText.classList.remove("show");
  };
  })


  // hide nav buttons
  navBtn.forEach(btn => btn.style.display = "none");

  // change background
  body.style.backgroundImage = 'url("face-mask.jpg")';
  body.style.backgroundSize = 'cover';
  body.style.backgroundRepeat = 'no-repeat';
  body.style.backgroundPosition = 'center';
});

closeBtn.addEventListener("click", () => {
  form.classList.remove("show"); // fade out
  surveyBtn.style.visibility = "visible";

  // restore nav buttons
  navBtn.forEach(btn => btn.style.display = "block");

  // restore background
  body.style.backgroundImage = 'url("lumina-bg.jpg")';
});

// optional: handle form submission normally
form.addEventListener("submit", e => {
  const checkboxes = document.querySelectorAll('input[name="used-products"]');
  const oneChecked = Array.from(checkboxes).some(c => c.checked);

  if (!oneChecked) {
    e.preventDefault();
    alert("Please select at least one product you used.");
  }
});


 
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
