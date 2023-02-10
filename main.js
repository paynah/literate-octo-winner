console.log("this is a test");
// import { thisTest } from ".index.js";

invertPageColors();

function onTriggerRender(input) {
    console.log(input);
}

function invertPageColors() {
    if (localStorage.getItem('test') === null) {
        console.log('nothing in local storage, adding test key');
        localStorage.setItem('test', 30);
    } else {
        console.log(localStorage.getItem('test'));
    }

    const body = document.querySelector("body");
    const children = body.getElementsByTagName("*");

    // Invert color of body
    const bodyStyle = window.getComputedStyle(body);
    const bodyBGColor = bodyStyle.getPropertyValue('background-color');
    const bodyTextColor = bodyStyle.getPropertyValue('color');
    if (bodyBGColor !== '') body.style.backgroundColor = invertColor(bodyBGColor);
    if (bodyTextColor !== '') body.style.color = invertColor(bodyTextColor);

    // Iterate through children array
    for (let child = children.length - 1; child >= 0; child--) {    
        // For each child:
    // Get the CSSStyleDeclaration obj
      const childStyleObj = window.getComputedStyle(children[child]);
    // If the CSSStyleDeclaration obj exists:
      if (childStyleObj) {
        // declare a variable for the background color property
        const bgColor = childStyleObj.getPropertyValue('background-color');
        // Declare a variable for the color property
        const textColor = childStyleObj.getPropertyValue('color');
        // If the background color property exists, invoke invertColor
        if (bgColor !== '') children[child].style.backgroundColor = invertColor(bgColor);
        // Set child's new background color to result of invertColor

        // If the color property exists, invoke invertColor
        if (textColor !== '') children[child].style.color = invertColor(textColor);
        // Set child's new color to result of invertColor
      }
    }
}

function invertColor(colorStr) {
    if (colorStr[0] === '#') {
        // Remove the #
        colorStr = colorStr.slice(1);
        // Check the length - if it's 3, convert to 6 digit hex
        if (colorStr.length === 3) {
            colorStr = colorStr[0] + colorStr[0] + colorStr[1] + colorStr[1] + colorStr[2] + colorStr[2];
        }
        // Convert 6 digit colorStr to rgb value
        const red = (255 - ((parseInt(colorStr[0], 16) * 16) + parseInt(colorStr[1], 16)));
        const green = (255 - ((parseInt(colorStr[2], 16) * 16) + parseInt(colorStr[3], 16)));
        const blue = (255 - ((parseInt(colorStr[4], 16) * 16) + parseInt(colorStr[5], 16)));
        return `rgb(${red}, ${green}, ${blue})`;
    } else {
        // Slice 'rgb(' and ')'
        let colorNumIdx;
        for (let i = 0; i < colorStr.length; i++) {
            if (!Number.isNaN(Number(colorStr[i]))) {
                colorNumIdx = i;
                break;
            }
        }
        colorStr = colorStr.slice(colorNumIdx, -1);
        // Split string into array 
        const colorArr = colorStr.split(',');
        // Declare const red, initialized to 255 - Number(array[0])
        const red = 255 - Number(colorArr[0]);
        // Declare const green, initialized to 255 - Number(array[1])
        const green = 255 - Number(colorArr[1]);
        // Declare const blue, initialized to 255 - Number(array[2])
        const blue = 255 - Number(colorArr[2]);
        const alpha = colorArr.length === 4 ? colorArr[3] : null;

        return alpha ? `rgba(${red}, ${green}, ${blue}, ${alpha})` : `rgb(${red}, ${green}, ${blue})`;
    }
}



// document.addEventListener('DOMContentLoaded', () => {
//     // a variable for each color picker
//     // add an eventlistener to each color variable (event : change)
//     const bgInputElement = document.querySelector('#dhhfghgjghjgfjgfjghjgerewatrey657645');
//     const txtInputElement = document.querySelector('#kfjukyuuserttbwerttr5676897698679n');
//     const linkInputElement = document.querySelector('#liyhtrdh676457658ehghfg67eqam5334nk');
  
//     bgInputElement.addEventListener('input', onColorChange);
//     txtInputElement.addEventListener('input', onColorChange);
//     linkInputElement.addEventListener('input', onColorChange);
// });

// {
// background : 'hex'
// text:
// link:
// inverseColor: boolean
// }

async function triggerRender(input) {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: renderTheme,
        args: [input]
    });
}

function onColorChange(event) {
    console.log('onColorChange invoked');
    // Grab all color values
    const background = document.querySelector('#dhhfghgjghjgfjgfjghjgerewatrey657645d').value;
    const text = document.querySelector('#kfjukyuuserttbwerttr5676897698679n').value;
    const link = document.querySelector('#liyhtrdh676457658ehghfg67eqam5334nk').value;
    // Build input obj and set new color value accordingly
    triggerRender({'background' : background, 'text' : text, 'link' : link});
}

// create a new function(obj)
// grab every element from chrome window
// look if its a link change color of link color
// if not link change color property to text color
// background change to new value
function renderTheme(inputObj) {
    console.log('rendertheme');
}