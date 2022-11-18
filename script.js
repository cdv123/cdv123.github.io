// checks whether content is visible to the user or not for fade animations
document.addEventListener("DOMContentLoaded", function(){
    let svg_width = 1000
    let svg_height = 200
    svgs = document.querySelectorAll("svg")
    svgs.forEach((element) => {
        element.setAttribute("width", svg_width)
        element.setAttribute("height", svg_height)
    });
})

// const btn2 = document.getElementById("dark-mode-button")
// const button2 = new buttons(btn2, "black", "1px solid white", "black")
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

y_height = [200, 160, 120]
x_pos = [100,200,300]
y_pos = 10

d3.select("body")
  .selectAll("rect")
  .attr("fill", "black")
  .data(y_height)
  .attr("height", function (d){
    return d
  })
  .data(x_pos)
  .attr("x", function(d){
    return d
  })
  .data(y_pos)
  .attr("y", function(d){
    return d
  })

text = ["quis nostrud exercitation ullamco laboris", "nisi ut aliquip ex ea commodo", "consequat. Duis aute irure dolor in reprehenderit"]
// d3.select("body")
//   .selectAll("#comments")
//   .data(text)
//   .text(function (d){
//     return d
//   })
//   .enter()
//   .append("p")
//   .text(function(d){
//     return d
//   })
// function randomComment(){
//     let randNum = Math.floor(Math.random()*48)
//     d3.csv("Dataset/shortSurvey.csv", function(data){
//         while (data[randNum] == "NA");{
//             randNum = Math.floor(Math.random()*48)
//         }
//         let newText = data[randNum]
//     d3.select("body")
//       .selectAll("comments")
//       .data(newText)
//       .text(function (d){
//         return d
//       })

//     })
// }
let commentBtn = document.getElementById("comment-button")
let comments = document.getElementById("comments")
commentBtn.addEventListener("click", function (){
    comments.style.display = "block"
})
let submitButton = document.getElementById("submit-button")
submitButton.addEventListener("click", function(){
    alert("message sent")
})
let adjectives = [];
let noun = [];
let verb = [];
let adverb = [];
let dummy = ""
const adjBox = document.getElementById("adj")
adjBox.innerHTML = null
const nounBox = document.getElementById("noun")
nounBox.value = null
const verbBox = document.getElementById("verb")
verbBox.value = null
const adverbBox = document.getElementById("adverb")
adverbBox.value = null
adjBox.addEventListener("keypress", function(){
    if (event.key == "Enter"){
        adjectives.push(adjBox.value)
        adjBox.value = ""        
    }
})
nounBox.addEventListener("keypress", function(){
    if (event.key == "Enter"){
        noun.push(nounBox.value)
        nounBox.value = ""        
    }
})
verbBox.addEventListener("keypress", function(){
    if (event.key == "Enter"){
        verb.push(verbBox.value)
        verbBox.value = ""        
    }
})
adverbBox.addEventListener("keypress", function(){
    if (event.key == "Enter"){
        adverb.push(adverbBox.value)
        adverbBox.value = ""        
    }
})
const randomBtn = document.getElementById("random-button")
const randomSentence = document.getElementById("comments2")
let sentence = ""
let randAdj = ""
let randNoun = ""
let randVerb = ""
let randAdverb = ""
randomBtn.addEventListener("click", function(){
    randomSentence.style.display = "block"
    randAdj = adjectives[Math.floor(Math.random()*(adjectives.length-1))]
    randNoun = noun[Math.floor(Math.random()*(noun.length-1))]
    randVerb = verb[Math.floor(Math.random()*(verb.length-1))]
    randAdverb = adverb[Math.floor(Math.random()*(adverb.length-1))]
    sentence = "The " + randAdj + " " + randNoun + " " + randVerb + " " + randAdverb
    randomSentence.innerHTML = sentence
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

//count to determine whether to change colour to light mode or dark mode

class buttons{
    constructor(button, color, borderStyle, backgroundColor){
        this.button = button
        this.button.style.color = color
        this.button.style.border = borderStyle
        this.button.style.backgroundColor = backgroundColor
    }
    colorSwitch(newColor, newBorderStyle, newBackgroundColor){
        this.button.style.color = newColor
        this.button.style.border = newBorderStyle
        this.button.style.backgroundColor = newBackgroundColor
    }

}
let buttonList = []
for (var i = 0; i<btns.length; i++)
{
    console.log("hi")
    buttonList.push(new buttons(btns[i], "black", "1px solid black", "aquamarine"))
    let element = buttonList[i]
    buttonList[i].button.addEventListener("mouseout", function(){btnHover1(element)})
    buttonList[i].button.addEventListener("mouseover", function(){btnHover2(element)})
}
function btnHover1(element){
    if (count % 2 == 1){
        element.colorSwitch("black", "1px solid black", "aquamarine")
        // btn.style.color = "black"
        // btn.style.border = "1px solid black"
        // btn.style.backgroundColor = "aquamarine"
    }
    else{
        element.colorSwitch("aquamarine", "1px solid aquamarine", "black")
        // btn.style.color = "aquamarine"
        // btn.style.border = "1px solid aquamarine"
        // btn.style.backgroundColor = "black"
    }
    element.button.style.borderRadius = "20px"
}

function btnHover2(element){
    if (count % 2 == 0){
        element.colorSwitch("black", "1px solid black", "aquamarine")
        // btn.style.color = "black"
        // btn.style.border = "1px solid black"
        // btn.style.backgroundColor = "aquamarine"
    }
    else{
        element.colorSwitch("aquamarine", "1px solid aquamarine", "black")
        // btn.style.color = "aquamarine"
        // btn.style.border = "1px solid aquamarine"
        // btn.style.backgroundColor = "black"
    }
    element.button.style.borderRadius = "0px"
}
home.style.color = "black"
document.body.style.backgroundColor = "#FFFDD1";
document.body.style.color = "#434343"
darkMode.addEventListener("click", switchColours)

function switchColours(){
    if (count % 2 == 1){
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white"
        home.style.color = "white"
        darkMode.innerHTML = "Dark Mode"
        navBar.classList.remove("bg-info")
        navBar.classList.add ("bg-light")
        for (i = 0; i<buttonList.length; i++) {
            buttonList[i].colorSwitch("aquamarine", "1px solid aquamarine", "black")
            
            // btn.style.color = "aquamarine"
            // btn.style.border = "1px solid aquamarine"
            // btn.style.backgroundColor = "black"
        }
    }
    else{
        navBar.classList.remove("bg-light")
        navBar.classList.add ("bg-info")
        document.body.style.backgroundColor = "#FFFDD1";
        document.body.style.color = "#434343"
        home.style.color = "black"
        darkMode.innerHTML = "Light Mode"
        for (i = 0; i<btns.length; i++){
            buttonList[i].colorSwitch("black", "1px solid black", "aquamarine")
                // btn.style.color = "black"
                // btn.style.border = "1px solid black"
                // btn.style.backgroundColor = "aquamarine"
        }
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
