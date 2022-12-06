/**
 * checks if content is visible to the user for fade in animations, if visible, adds class animate, otherwise, removes it.
 * @param {object} entries - The object fading in.
 */
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
});

let text = '';
let count3 = 0;
/**
 * Creates a stacked bar chart, code for stacked bar chart, with edits from
 * (Holtz, 2022), see README for more details
 * @param {string} word - specifies what column of the dataset to select to make bar chart.
 */
function createChart (word) {
    /**
     * Variables declared at the beginning of the function.
     * Colours is an array of the hex code of the colours for the bars.
     * c contains the countries being surveyed
     * r contains the responses to the question
     * numR corresponds to the number of each response, 2d array
     * newData contains the array of objects with keys being the responses and the country and the values the number of each response and the name of the country.
     * cols is the number of columns in the 2d array
     * chart is the div within which the chart is made
     * margin defines the margins of the svg
     * height and width are the height and width of the svg
     */
    const colours = ['#ADD8E6', '#0000FF', '#D3D3D3', '#808080', '#454545'];
    let c = [];
    const r = [];
    const numR = [];
    const newData = [];
    let cols = 0;
    const chart = document.getElementById('myChart');
    const margin = { top: chart.offsetWidth / 20, right: 0, bottom: chart.offsetHeight / 10, left: chart.offsetWidth / 10 };
    const width = chart.offsetWidth / 1.3;
    const height = chart.offsetWidth / 2;
    /**
     * Creates svg within div named myChart of the height previously specified.
     */
    const svg = d3.select('#myChart')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');
    /**
    * Goes through dataset (survey) and makes a new dataset where each country appears once,
    * Has percentages of each response for the chosen column, then makes stacked bar chart from that new dataset.
    * @param {object} data - the dataset.
    */
    d3.csv('/Dataset/survey.csv').then(function (data) {
        for (let i = 0; i < 1259; i++) {
                if (!r.includes(data[i][word])) {
                    r.push(data[i][word]);
                    numR.push([]);
                    cols += 1;
                }
            if (!c.includes(data[i].Country)) {
                c.push(data[i].Country);
            }
        }
        // only select first few countries as not enough data on other countries for good visualisation, and not enough space to include all countries.
        c = c.slice(0, 11);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < c.length; j++) {
                numR[i].push(0);
            }
        }
        for (let i = 0; i < 1259; i++) {
            for (let j = 0; j < c.length; j++) {
                if (data[i].Country === c[j]) {
                    for (let k = 0; k < cols; k++) {
                        if (data[i][word] === r[k]) {
                            numR[k][j] += 1;
                        }
                    }
                }
            }
        }
        const a = [...c];
        /**
         * @name shortenCountryNames
         * For loop to shorten country names to fit nicely in bar chart.
         */
        for (let i = 0; i < c.length; i++) {
            if (c[i] === 'United States') {
                c[i] = 'US';
            } else if (c[i] === 'United Kingdom') {
                c[i] = 'UK';
            } else {
                c[i] = c[i].slice(0, 2).toUpperCase();
            }
        }
        let total = 0;
        /**
         * For loop to convert number of each response to percentage of each response
         */
        for (let i = 0; i < c.length; i++) {
            for (let j = 0; j < cols; j++) {
                total += numR[j][i];
            }
            for (let j = 0; j < cols; j++) {
                numR[j][i] = (numR[j][i] / total) * 100;
            }
            total = 0;
        }
        for (let i = 0; i < c.length; i++) {
            newData.push(
                {
                    Country: c[i]
                }
            );
            for (let j = 0; j < r.length; j++) {
                newData[i][r[j]] = numR[j][i];
            }
        }
        const subgroups = r;
        const groups = c;
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.5]);
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).tickSizeOuter(0));
        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);
        svg.append('g')
            .call(d3.axisLeft(y));
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colours);
        const stackedData = d3.stack().keys(subgroups)(newData);
        svg.append('g')
            .selectAll('g')
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append('g')
            .attr('fill', function (d) { return color(d.key); })
            .selectAll('rect')
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) { return d; })
            .enter().append('rect')
                .attr('x', function (d) { return x(d.data.Country); })
                .attr('y', function (d) { return y(d[1]); })
                .attr('height', function (d) { return y(d[0]) - y(d[1]); })
                .attr('width', x.bandwidth())
                .attr('class', 'bar')
                .on('mouseover', function () {
                    d3.select(this)
                      .style('opacity', '0.5')
                      /**
                       * Function to create text for each bar for popup.
                       * @param {array} - updated dataset
                       */
                      .text(function (d) {
                        for (let i = 0; i < a.length; i++) {
                            if (a[i].slice(0, 2).toUpperCase() === d.data.Country) {
                                text = 'Country: ' + String(a[i]);
                            }
                        }
                       if (d.data.Country === 'UK') {
                            text = 'Country: United Kingdom';
                        } else if (d.data.Country === 'US') {
                            text = 'Country: United States';
                        }
                    for (let i = 0; i < r.length; i++) {
                        text += ', ' + r[i] + ': ' + d.data[r[i]].toFixed(2) + '%';
                    }
                });
                })
                .on('mouseout', function () {
                    d3.select(this)
                        .style('opacity', '1');
                    });
            });

    /**
     * @name timeoutFunction
     * After 200ms, function called to change opacity of bars (for animation) and makes bars more interactive.
     * This is applied after a 200ms timer to ensure everything else has been loaded first.
     * Count3 used to determine if popup present or not.
     * Adds event so that when the user clicks anywhere when the popup if up, the popup if removed.
     */
    setTimeout(
        function () {
        d3.selectAll('rect')
          .style('opacity', 1);
        const bars = document.querySelectorAll('.bar');
        const popup = document.querySelector('.popup');
        if (count3 === 0) {
        document.addEventListener('click', function () {
            if (count3 % 2 === 1) {
                count3 += 1;
            } else {
                popup.style.display = 'none';
            }
        });
}
        bars.forEach(
        /**
         * Adds event so that when the user clicks on a bar, the popup with that bar's information pops up, and pop up position depends on location of cursor.
         * @param {object} element - bar that the popup is being added to
         */
        function (element) {
        element.addEventListener('click', function (event) {
            popup.style.display = 'block';
            const popupInfo = document.getElementById('popup-info');
            popupInfo.innerHTML = text;
            popupInfo.style.width = 'fit-content';
            popupInfo.style.height = 'fit-content';
            popupInfo.style.top = event.clientY + 'px';
            popupInfo.style.left = event.clientX + 'px';
            if (count3 % 2 === 0) {
                count3 += 1;
            }
        });
      });
    }, 200);
}
/**
 * Function deleteChart
 * Deletes chart, used when user wants to change chart.
 */
function deleteChart () {
    d3.select('svg').remove();
}
/**
 * Making parts of website into JS variables for manipulation later on.
 * @name Initiliasing-Variables
 */
const submitButton = document.getElementById('submit-button');
const fadeLeft = document.querySelectorAll('.fade-left');
const fadeRight = document.querySelectorAll('.fade-right');
const navBar = document.getElementById('nav-bar');
const darkMode = document.getElementById('dark-mode-button');
const home = document.getElementById('home');
const btns = document.querySelectorAll('.b1');
const dropdown = document.getElementById('criteria');
let count = 1;
let count2 = 1;
let prevValue = dropdown.value;
const rightDropdown = document.querySelector('.right-dropdown');
const rightModal = document.querySelector('.right-modal');
const references = document.querySelectorAll('.reference');
/**
 * Function so that any element with class fade left or fade right is monitored
 * @param {object} - element with class fadeleft/faderight
 */
fadeLeft.forEach((element) => observer.observe(element));
fadeRight.forEach((element) => observer.observe(element));
/**
 * Sets up animation for title when the website loads, sets a 0.7 second timer to change colour of title, also changes size of title.
 * @name onLoad
 */
window.onload = function () {
    home.style.fontSize = '80px';
    home.style.color = 'white';
    setTimeout(function () {
        home.style.color = 'black';
    }, 700);
};

class Buttons {
    /**
     * Initialises class of buttons
     * @param {object} button - The DOM representation of the button
     * @param {string} color - Colour of button
     * @param {string} borderStyle - Border style of button
     * @param {string} backgroundColor - Background colour of button
     * @constructor
     */
    constructor (button, color, borderStyle, backgroundColor) {
        this.button = button;
        this.button.style.color = color;
        this.button.style.border = borderStyle;
        this.button.style.backgroundColor = backgroundColor;
    }

    /**
     * Instance method to change colour of button
     * @param {string} newColor - specifies new colour of button
     * @param {string} newBorderStyle - specifies new border style of button
     * @param {string} newBackgroundColor - specifies new background colour of button
     */
    colorSwitch (newColor, newBorderStyle, newBackgroundColor) {
        this.button.style.color = newColor;
        this.button.style.border = newBorderStyle;
        this.button.style.backgroundColor = newBackgroundColor;
    }
}
const buttonList = [];
/**
 * For loop used to add buttons to class and to array button list
 */
for (let i = 0; i < btns.length; i++) {
    buttonList.push(new Buttons(btns[i], 'black', '1px solid black', 'aquamarine'));
    const element = buttonList[i];
    buttonList[i].button.addEventListener('mouseout', function () { btnHover1(element); });
    buttonList[i].button.addEventListener('mouseover', function () { btnHover2(element); });
}
/**
 * Changes colour of button when the user hovers over it, and changes the colour back once the user stops hovering over it
 * @param {object} button - The button the user is hovering over
 */
function btnHover1 (button) {
    if (count % 2 === 1) {
        button.colorSwitch('black', '1px solid black', 'aquamarine');
    } else {
        button.colorSwitch('aquamarine', '1px solid aquamarine', 'black');
    };
    button.button.style.borderRadius = '20px';
}
/**
 * Changes colour of button when the user hovers over it, and changes the colour back once the user stops hovering over it
 * @param {object} button - The button the user is hovering over
 */
function btnHover2 (element) {
    if (count % 2 === 0) {
        element.colorSwitch('black', '1px solid black', 'aquamarine');
    } else {
        element.colorSwitch('aquamarine', '1px solid aquamarine', 'black');
    }
    element.button.style.borderRadius = '0px';
}
home.style.color = 'black';
document.body.style.backgroundColor = '#FFFDD1';
document.body.style.color = '#434343';
darkMode.addEventListener('click', switchColours);
submitButton.addEventListener('click', function () { alert('Email submitted'); });
/**
 * Adds an event listener so that when the object is clicked, the references show on the right side of the screen
 * @param {object} element - the specific reference in the list
 */
references.forEach(function (element) {
    element.addEventListener('click', shiftModal);
});
createChart('family_history');
/**
 * Makes svg responsive
 * When size of window changes, deletes the chart and makes a new one with the right size.
 */
window.addEventListener('resize', function () {
    deleteChart();
    createChart(dropdown.value);
});
/**
 * Adds functionality to dropdown
 * If the value of dropdown changes (i.e. new one selected), creates a new chart with the value currently in the dropdown
 * Also first changes opacity of bars to 0 for smoother animation
 * Upadates previous dropdown value for next time user changes the value of dropdown
 */
dropdown.addEventListener('click', function () {
    if (dropdown.value !== prevValue) {
        d3.selectAll('rect')
          .style('opacity', 0);
        setTimeout(function () {
            deleteChart();
            createChart(dropdown.value);
        }, 700);
    }
    prevValue = dropdown.value;
});
/**
 * Function which adds the class shift-modal and shift drop-down, which move the bilbiography and its button to the left so it can be seen when the button is clicked.
 * Also changes left arrow to right arrow and vice versa.
 * count2 used to determine if biliography is open or not, so that the appropriate action happens when the button is clicked multiple times.
 */
function shiftModal () {
    count2 += 1;
    if (count2 % 2 === 0) {
        rightModal.classList.add('shift-modal');
        rightDropdown.classList.add('shift-dropdown');
        rightDropdown.innerHTML = '&#8594';
    } else {
        rightModal.classList.remove('shift-modal');
        rightDropdown.classList.remove('shift-dropdown');
        rightDropdown.innerHTML = '&#8592';
    }
}
/**
 * Called when the Dark/Light Mode button is clicked, changes the everything's colour.
 * Count used to know whether the webstie is in dark mode or light mode.
 */
function switchColours () {
    if (count % 2 === 1) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        home.style.color = 'white';
        darkMode.innerHTML = 'Dark Mode';
        navBar.classList.remove('bg-info');
        navBar.classList.add('bg-light');
        for (let i = 0; i < buttonList.length; i++) {
            buttonList[i].colorSwitch('aquamarine', '1px solid aquamarine', 'black');
        }
        rightModal.style.backgroundColor = 'black';
        rightModal.style.borderColor = 'white';
    } else {
        navBar.classList.remove('bg-light');
        navBar.classList.add('bg-info');
        document.body.style.backgroundColor = '#FFFDD1';
        document.body.style.color = '#434343';
        home.style.color = 'black';
        darkMode.innerHTML = 'Light Mode';
        for (let i = 0; i < btns.length; i++) {
            buttonList[i].colorSwitch('black', '1px solid black', 'aquamarine');
        }
        rightModal.style.backgroundColor = 'aquamarine';
        rightModal.style.borderColor = 'black';
    }
    count = count + 1;
}
