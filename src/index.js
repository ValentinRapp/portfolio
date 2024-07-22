// Import a module that was installed with npm
import p5 from 'p5'
// Import a variable from a JavaScript file from the project folder
import { highQualitySketch, lowQualitySketch, highQuality, checkFrameRate } from './sketch.js'
// Import CSS styles in JavaScript
import './sketch.css'

let intervalID;

function sketchSwitchingHandler(currentSketch) {
    if (highQuality) return;
    if (!checkFrameRate) clearInterval(intervalID);
    currentSketch.remove();
    currentSketch = new p5(lowQualitySketch, document.getElementById('sketch'));
    clearInterval(intervalID);
    return;
}

// Initialize p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
const Sketch = new p5(highQualitySketch, document.getElementById('sketch'));

intervalID = setInterval(() => sketchSwitchingHandler(Sketch), 100);