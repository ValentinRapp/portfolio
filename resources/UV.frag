precision mediump float;

varying vec2 pos;

uniform float millis;
// float time = millis / 1000.0;

uniform vec2 resolution;

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord / resolution.xy / 2.0;

    // if (uv.x > .99 || uv.y > .99 || uv.x < 0. || uv.y < 0.) {
    //     gl_FragColor = vec4(1.0);
    // } else {
        gl_FragColor = vec4(uv, 0.0, 1.0);
    // }
}