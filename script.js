// checks whether content is visible to the user or not for fade animations, and sets the default svg width and height
document.addEventListener("DOMContentLoaded", function(){
    let svg_width = 1000;
    let svg_height = 200;
    svgs = document.querySelectorAll("svg");
    svgs.forEach((element) => {
        element.setAttribute("width", svg_width);
        element.setAttribute("height", svg_height);
        element.setAttribute("viewBox", "0 0 1000 200");
    });
})

// checks whether content is visible to the user or not for fade animations
const observer = new IntersectionObserver( function(entries) {
    entries.forEach((entry) => {
        //if visible, add class animate to start animation
        if (entry.isIntersecting){
            entry.target.classList.add("animate");
        }
        //resets so animation can be done again
        else{
            entry.target.classList.remove("animate");
        }
    })
})

y_height = [200, 160, 120];
x_pos = [100,200,300];
y_pos = 10;

d3.json("/Dataset/survey.json", function(data){
    console.log(data);
    console.log(1);
});
// d3.select("body")
//   .selectAll("rect")
//   .attr("fill", "black")
//   .data(y_height)
//   .attr("height", function (d){
//     return d
//   })
//   .data(x_pos)
//   .attr("x", function(d){
//     return d
//   })
//   .data(y_pos)
//   .attr("y", function(d){
//     return d;
//   });
    // let commentBtn = document.getElementById("comment-button");
    // let comments = document.getElementById("comments");
    //     commentBtn.addEventListener("click", function randomComment(){
    //         let randNum = Math.floor(Math.random()*48);
    //         d3.csv("Dataset/shortSurvey.csv")
    //         })
let submitButton = document.getElementById("submit-button");
//sets up fadeLeft and fadeRight and calls the function for each element in calss
const fadeLeft = document.querySelectorAll(".fade-left");
const fadeRight = document.querySelectorAll(".fade-right");
let navBar = document.getElementById("nav-bar");
fadeLeft.forEach((element) => observer.observe(element));
fadeRight.forEach((element) => observer.observe(element));
let darkMode = document.getElementById("dark-mode-button");
let home = document.getElementById("home");
let btns = document.querySelectorAll(".b1");
let count = 1;
window.onload = function(){
    home.style.fontSize = "80px";
    home.style.color = "white"
    setTimeout(function(){
        home.style.color = "black";
    }, 700)   
}
class buttons{
    constructor(button, color, borderStyle, backgroundColor){
        this.button = button;
        this.button.style.color = color;
        this.button.style.border = borderStyle;
        this.button.style.backgroundColor = backgroundColor;
    }
    colorSwitch(newColor, newBorderStyle, newBackgroundColor){
        this.button.style.color = newColor;
        this.button.style.border = newBorderStyle;
        this.button.style.backgroundColor = newBackgroundColor
    }

}
let buttonList = []
for (var i = 0; i<btns.length; i++)
{
    buttonList.push(new buttons(btns[i], "black", "1px solid black", "aquamarine"));
    let element = buttonList[i];
    buttonList[i].button.addEventListener("mouseout", function(){btnHover1(element)});
    buttonList[i].button.addEventListener("mouseover", function(){btnHover2(element)});
}
/**
 * Changes colour of button when the user hovers over it, and changes the colour back once the user stops hovering over it
 * @param {object} button - The button the user is hovering over
 */
function btnHover1(button){
    if (count % 2 == 1){
        button.colorSwitch("black", "1px solid black", "aquamarine");
    }
    else{
        button.colorSwitch("aquamarine", "1px solid aquamarine", "black");
    };
    button.button.style.borderRadius = "20px";
}

function btnHover2(element){
    if (count % 2 == 0){
        element.colorSwitch("black", "1px solid black", "aquamarine");
    }
    else{
        element.colorSwitch("aquamarine", "1px solid aquamarine", "black");
    }
    element.button.style.borderRadius = "0px";
}
home.style.color = "black";
document.body.style.backgroundColor = "#FFFDD1";
document.body.style.color = "#434343";
darkMode.addEventListener("click", switchColours);

function switchColours(){
    if (count % 2 == 1){
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        home.style.color = "white";
        darkMode.innerHTML = "Dark Mode";
        navBar.classList.remove("bg-info");
        navBar.classList.add ("bg-light");
        for (i = 0; i<buttonList.length-1; i++); {
            buttonList[i].colorSwitch("aquamarine", "1px solid aquamarine", "black");
        }
    }
    else{
        navBar.classList.remove("bg-light");
        navBar.classList.add ("bg-info");
        document.body.style.backgroundColor = "#FFFDD1";
        document.body.style.color = "#434343";
        home.style.color = "black";
        darkMode.innerHTML = "Light Mode";
        for (i = 0; i<btns.length-1; i++);{
            buttonList[i].colorSwitch("black", "1px solid black", "aquamarine");
        }
    }
    count = count + 1;
}
