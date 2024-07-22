export let highQuality = true;
export let checkFrameRate = true;
let frameArray = [];
let framesRendered = 0;

const frameArrayLength = 60;
for (let i = 0; i < frameArrayLength; i++) {
  frameArray.push(120);
}

const moveElementsToTheLeft = (arr, toAdd) => {
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr[arr.length - 1] = toAdd;
  return arr;
}

const palette = (t, a, b, c, d) => {
  return [
    a[0] + b[0] * Math.cos(6.28318 * (c[0] * t + d[0])),
    a[1] + b[1] * Math.cos(6.28318 * (c[1] * t + d[1])),
    a[2] + b[2] * Math.cos(6.28318 * (c[2] * t + d[2]))
  ];
}

// Exporting a function called 'highQualitySketch'
export const highQualitySketch = (p) => {
  let shader;
  let tex1;
  let tex2;
  let tex3;

  p.preload = () => {
    shader = p.loadShader('resources/default.vert', 'resources/opal.frag');
    
    tex1 = p.loadImage('resources/textures/dither/tex1.png');
    tex2 = p.loadImage('resources/textures/dither/tex2.png');
    tex3 = p.loadImage('resources/textures/dither/tex3.png');
  }

  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.visualViewport.width, window.visualViewport.height, p.WEBGL);
    // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.shader(shader);
    console.log('p5.js setup function executed!');
    console.log(window.visualViewport.width, window.visualViewport.height);
  }

  p.draw = () => {
    shader.setUniform('millis', p.millis());
    shader.setUniform('resolution', [p.width, p.height]);
    shader.setUniform('mouse', [p.mouseX, p.mouseY]);

    shader.setUniform('iChannel0', tex1);
    shader.setUniform('iChannel1', tex2);
    shader.setUniform('iChannel2', tex3);
      
    p.rect(0, 0, p.width, p.height);
    
    if (checkFrameRate) {
      moveElementsToTheLeft(frameArray, p.getFrameRate());
      highQuality = (frameArray.reduce((acc, curr) => acc + curr, 0) / frameArrayLength < 47) ? false : highQuality;
      checkFrameRate = (framesRendered > frameArrayLength * 5) ? false : checkFrameRate;
      framesRendered++;
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(window.visualViewport.width, window.visualViewport.height);
  }
}

export const lowQualitySketch = (p) => {
  let maxSize = 800;
  let wspeed = 1.66;
  let hspeed = 1.33;
  let w = 0;
  let h = maxSize;
  let r = 0;
  let color;

  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.strokeWeight(5);
    p.background(0);
    console.log('p5.js setup function executed!');
  }

  p.draw = () => {
      p.background(0, 50);

      // Draw an ellipse
      p.translate(p.width / 2, p.height / 2);
      p.rotate(r);
      p.fill(0, 1);
      color = palette(p.millis() * 0.000025, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1, 1, 1], [0.0, 0.333, 0.667]);
      p.stroke(color[0] * 255, color[1] * 255, color[2] * 255);
      p.ellipse(0, 0, w, h);
  
      // Updating rotation and increment values
      r = r + 0.015;
      w = w + wspeed;
      h = h + hspeed;
      if (w < 0 || w > maxSize) wspeed *= -1;
      if (h < 0 || h > maxSize) hspeed *= -1;
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  }
}