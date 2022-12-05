/**
 * checks if content is visible to the user for fade in animations, if visible, adds class animate, otherwise, removes it.
 * @constructor
 * @param {object} entries - The object fading in.
 */
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

//code taken from https://bl.ocks.org/mbostock/6fead6d1378d6df5ae77bb6a719afcb2 with changes
//from https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

/**
 * Creates a stacked bar chart, code for stacked bar chart, with edits from 
 * https://bl.ocks.org/mbostock/6fead6d1378d6df5ae77bb6a719afcb2, legend, with changes from 
 * https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
 * @constructor
 * @param {string} word - specifies what column of the dataset to select to make bar chart.
 */
var text = ""
function createChart(word){
    let colours = ["#ADD8E6", "#0000FF","#D3D3D3","#808080","#454545"]
    let c = []
    let r = []
    let numR = []
    let newData = []
    let cols = 0
    let chart = document.getElementById("myChart")
    var margin = {top: chart.offsetWidth/20, right:chart.offsetWidth/20, bottom: chart.offsetHeight/10, left: chart.offsetWidth/10},
        width = chart.offsetWidth - margin.right - margin.left;
        height = width/2
    var svg = d3.select("#myChart")
        .attr("viewBox", "0 0 " + width + " " + height)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    /**
    * Goes through dataset (survey) and makes a new dataset where each country appears once, 
    * and has percentages of each response for the chosen column, then makes stacked bar chart from that new dataset.
    * @constructor
    * @param {object} data - the dataset.
    */
    d3.csv("/Dataset/survey.csv").then(function(data){
        for (let i =0;i < 1259;i++){
                if (!r.includes(data[i][word])){
                    r.push(data[i][word])
                    numR.push([])
                    cols +=1
                }
            if (!c.includes(data[i].Country)){
                c.push(data[i].Country)
            }
        }
        // only select first few countries as not enough data on other countries for good visualisation, and not enough space to include all countries.
        c = c.slice(0,11)
        for (let i = 0; i<cols; i++){
            for (let j =0; j<c.length;j++){
                numR[i].push(0)
            }
        }
        for (let i = 0; i<1259; i++){
            for (let j =0; j<c.length;j++){
                if (data[i].Country == c[j]){
                    for (let k =0; k<cols;k++){
                        if(data[i][word] == r[k]){
                            numR[k][j]+=1
                        }
                    } 
                }
                
            }
        }
        var a = [...c]
        for(let i = 0; i<c.length;i++){
            if (c[i]=="United States"){
                c[i] = "US"
            }
            if (c[i]=="United Kingdom"){
                c[i] = "UK"
            }
            else{
                c[i] = c[i].slice(0,2).toUpperCase()
            }
        }
        let total = 0
        for(let i =0; i<c.length;i++){
            for(let j = 0; j<cols; j++){
                total += numR[j][i]
            }
            for(let j = 0; j<cols; j++){
                numR[j][i] = (numR[j][i]/total)*100
            }
            total = 0
        }
        for(let i = 0; i<c.length; i++){
            newData.push(
                {
                    Country: c[i]
                }
            )
            for(let j =0; j<r.length; j++){
                newData[i][r[j]] = numR[j][i]
            }
        }
        console.log(a)
        var subgroups = r
        var groups = c
        var x = d3.scaleBand()
            .domain(groups)
            .range([0,width])
            .padding([0.5])
        svg.append("g")
            .attr("transform", "translate(0," + height +")")
            .call(d3.axisBottom(x).tickSizeOuter(0));
        var y = d3.scaleLinear()
            .domain([0,100])
            .range([height, 0])
        svg.append("g")
            .call(d3.axisLeft(y))
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colours)
        var stackedData = d3.stack()
            .keys(subgroups)
            (newData)        
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { return d; })
            .enter().append("rect")
                .attr("x", function(d) { return x(d.data.Country); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())
                .attr("class", "bar")
                .on("mouseover", function(){
                    
                    d3.select(this)
                      .style("opacity", "0.5")
                      .text(function(d){
                        for (let i =0; i<a.length; i++){
                            if (a[i].slice(0,2).toUpperCase() == d.data.Country){
                                text =  "Country: " + String(a[i]) 
                            }
                            
                        }
                       if (d.data.Country == "UK"){
                            text =  "Country: United Kingdom"
                        }
                        else if (d.data.Country == "US"){
                            text =  "Country: United States"
                        }
                    for(let i =0; i<r.length; i++){
                        text += ", " + r[i] + ": " + d.data[r[i]].toFixed(2) + "%"
                    }

                }) 
                    
                })
                .on("mouseout", function(){
                    d3.select(this)
                        .style("opacity", "1")
                    })
        //legend from https://d3-graph-gallery.com/graph/custom_legend.html
        // create a list of keys
            })
        
    
    setTimeout(function(){
        d3.selectAll("rect")
          .style("opacity", 1)
    }, 400)
    
    
}
/**
 * Deletes chart, used when user wants to change chart.
 * @constructor
 */
function deleteChart(){
    d3.select("svg").remove()
}
let submitButton = document.getElementById("submit-button");
//sets up fadeLeft and fadeRight and calls the function for each element in calss
const fadeLeft = document.querySelectorAll(".fade-left");
const fadeRight = document.querySelectorAll(".fade-right");
let navBar = document.getElementById("nav-bar");
fadeLeft.forEach((element) => observer.observe(element));
fadeRight.forEach((element) => observer.observe(element));
let darkMode = document.getElementById("dark-mode-button");
const home = document.getElementById("home");
const btns = document.querySelectorAll(".b1");
const dropdown = document.getElementById("criteria")
let count = 1;
let count2 = 1;
let prevValue = dropdown.value
const submit = document.getElementById("submit-button")
let rightDropdown = document.querySelector(".right-dropdown")
let rightModal = document.querySelector(".right-modal")
let references = document.querySelectorAll(".reference")

/**
 * sets up animation for title when the website loads, sets a 0.7 second timer to change colour of title
 * @constructor
 */

window.onload = function(){
    home.style.fontSize = "80px";
    home.style.color = "white"
    setTimeout(function(){
        home.style.color = "black";
        let bars = document.querySelectorAll(".bar")
        let popup = document.querySelector(".popup")
        console.log(bars)
        bars.forEach(function(element){
        element.addEventListener("click", function(){
            popup.style.display = "block";
            let popupInfo = document.getElementById("popup-info")
            popupInfo.innerHTML = text
            popupInfo.style.width = "fit-content"
            popupInfo.style.height = "fit-content"
            popupInfo.style.top = event.clientY + "px"
            popupInfo.style.left = event.clientX + "px"
            console.log(text)
        })
        element.addEventListener("mouseout", function(){
            popup.style.display = "none";

        })
    })
    }, 700)
    
}

/**
 * Initialises class of buttons
 * @param {object} button - The DOM representation of the button
 * @param {string} color - Colour of button
 * @param {string} borderStyle - Border style of button
 * @param {string} backgroundColor - Background colour of button
 * @constructor
 */
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
/**
 * Changes colour of button when the user hovers over it, and changes the colour back once the user stops hovering over it
 * @param {object} button - The button the user is hovering over
 */
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
submitButton.addEventListener("click", function() {alert("Email submitted")})
/**
 * Adds an event listener so that when the object is clicked, the references show on the right side of the screen
 * @param {object} element - the specific reference in the list
 * @constructor
 */
references.forEach(function(element){
    element.addEventListener("click", shiftModal)
})
createChart("family_history")
console.log(text)
window.addEventListener("resize", function(){
    deleteChart();
    createChart(dropdown.value)
    bars = document.querySelectorAll(".bar")
    popup = document.querySelector(".popup")
    console.log(bars)
    bars.forEach(function(element){
        element.addEventListener("mouseover", function(){
            popup.style.display = "block";
            document.getElementById("popup-info").innerText = text
        })
    })
})

dropdown.addEventListener("click", function(){  
    if (dropdown.value != prevValue){
        d3.selectAll("rect")
          .style("opacity",0)
        setTimeout(function(){
            deleteChart()
            createChart(dropdown.value)
        }, 700)
        prevValue = dropdown.value
    }  
})
/**
 * 
 */
function shiftModal(){
    count2 += 1
    if (count2 %2 == 0){
        rightModal.classList.add("shift-modal")
        rightDropdown.classList.add("shift-dropdown")
        rightDropdown.innerHTML = "&#8594"
    }   
    else{
        rightModal.classList.remove("shift-modal")
        rightDropdown.classList.remove("shift-dropdown")
        rightDropdown.innerHTML = "&#8592"
    }
}
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
        rightModal.style.backgroundColor = "black";
        rightModal.style.borderColor = "white";
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
        rightModal.style.backgroundColor = "aquamarine";
        rightModal.style.borderColor = "black"
    }
    count = count + 1;
}
