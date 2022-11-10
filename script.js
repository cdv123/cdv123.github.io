// checks whether content is visible to the user or not for fade animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //if visible, add class animate to start animation
        if (entry.isIntersecting){
            entry.target.classList.add("animate")
        }
        //resets so animation can be done again
        else{
            entry.target.classList.remove("animate")
        }
    })
})

//sets up fadeLeft and fadeRight and calls the function for each element in calss
const fadeLeft = document.querySelectorAll(".fade-left")
const fadeRight = document.querySelectorAll(".fade-right")
let navBar = document.getElementById("nav-bar")
fadeLeft.forEach((element) => observer.observe(element));
fadeRight.forEach((element) => observer.observe(element));
let darkMode = document.getElementById("dark-mode-button");
let home = document.getElementById("home");
let btns = document.querySelectorAll(".b1");
let count = 1
window.onload = function(){
    home.style.fontSize = "80px";
    home.style.color = "white"
    setTimeout(animationLoop, 1000)
    
}

function animationLoop(){
    home.style.fontSize = "60px";
    home.style.color = "black"
}
//sets up initial colours of page
home.style.color = "black"
document.body.style.backgroundColor = "#FFFDD1";
document.body.style.color = "#434343"
darkMode.addEventListener("click", switchColours)
//count to determine whether to change colour to light mode or dark mode

btns.forEach((btn) => {
    btn.style.color = "black"
    btn.style.border = "1px solid black"
    btn.style.backgroundColor = "aquamarine"
    btn.addEventListener("mouseout", function hoverBtn(){
        if (count % 2 == 1){
            btn.style.color = "black"
            btn.style.border = "1px solid black"
            btn.style.backgroundColor = "aquamarine"
        }
        else{
            btn.style.color = "aquamarine"
            btn.style.border = "1px solid aquamarine"
            btn.style.backgroundColor = "black"
        }
        btn.style.borderRadius = "20px"
    })
    btn.addEventListener("mouseover", function hoverBtn(){
        if (count % 2 == 0){
            btn.style.color = "black"
            btn.style.border = "1px solid black"
            btn.style.backgroundColor = "aquamarine"
        }
        else{
            btn.style.color = "aquamarine"
            btn.style.border = "1px solid aquamarine"
            btn.style.backgroundColor = "black"
        }
        btn.style.borderRadius = "0px"
    })
    
})
function switchColours(){
    if (count % 2 == 1){
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white"
        home.style.color = "white"
        darkMode.innerHTML = "Dark Mode"
        navBar.classList.remove("bg-info")
        navBar.classList.add ("bg-light")
        btns.forEach((btn) => {
            btn.style.color = "aquamarine"
            btn.style.border = "1px solid aquamarine"
            btn.style.backgroundColor = "black"
        })
    }
    else{
        navBar.classList.remove("bg-light")
        navBar.classList.add ("bg-info")
        document.body.style.backgroundColor = "#FFFDD1";
        document.body.style.color = "#434343"
        home.style.color = "black"
        darkMode.innerHTML = "Light Mode"
        btns.forEach((btn) => {
            btn.style.color = "black"
            btn.style.border = "1px solid black"
            btn.style.backgroundColor = "aquamarine"
        })
    }
    count = count + 1
}
    // let message = document.getElementById("mental-health-button")
    // let navbar = document.querySelector("nav")
    // let p = document.querySelectorAll("h2")
    // p.forEach(function(element){
    // element.addEventListener("mouseover", interesting)
    // })
    // function interesting(){
    //     alert("I hope you find this interesting")
    // }
    // message.addEventListener("mouseover", sendAlert)
    // navbar.addEventListener("mouseover", sendAlert)
    // function sendAlert(){
    //     alert("CLICK ME!!!!")
    // }
