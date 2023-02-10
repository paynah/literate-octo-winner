// document.addEventListener('DOMContentLoaded', () => {
//     // a variable for each color picker
//     // add an eventlistener to each color variable (event : change)
//     const bgInputElement = document.querySelector('#background');
//     const txtInputElement = document.querySelector('#text');
//     const linkInputElement = document.querySelector('#link');
  
//     bgInputElement.addEventListener('change', onColorChange);
//     txtInputElement.addEventListener('change', onColorChange);
//     linkInputElement.addEventListener('change', onColorChange);
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
        func: testFn,
        args: [input]
    });
}

function testFn(input) {
    console.log(`testFn input: ${input}`);
    onTriggerRender(input);
}

function onColorChange(event) {
    console.log('onColorChange invoked');
    // Grab all color values
    const background = document.querySelector('#background').value;
    const text = document.querySelector('#text').value;
    const link = document.querySelector('#link').value;
    // Build input obj and set new color value accordingly
    triggerRender({'background' : background, 'text' : text, 'link' : link});
}

