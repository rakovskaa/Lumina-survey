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
});

form.addEventListener("submit", (e) => {
const checkboxes = document.querySelectorAll('input[name="used-products"]');
const oneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

if(!oneChecked) {
e.preventDefault();
alert("Please select at least one product you used.");    
return;
}

/*const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());    

console.log(data);
alert("Thank you for your feedback!");

form.reset();
form.style.display = "none";
surveyBtn.style.visibility = "visible";

body.style.backgroundImage = 'url("lumina-bg.jpg")';
body.style.backgroundSize = 'contain';
body.style.backgroundRepeat = 'repeat';
body.style.backgroundPosition = 'center';
}*/
});

const closeBtn = document.getElementById("close-form-btn");

 closeBtn.addEventListener("click", () => {
 form.style.display = "none";
 surveyBtn.style.visibility = "visible";   
 body.style.backgroundImage = 'url("lumina-bg.jpg")';
 })
