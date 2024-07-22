precision mediump float;

varying vec2 pos;

uniform float millis;
uniform vec2 resolution;
uniform vec2 mouse;
varying float time;

uniform sampler2D iChannel0;


void main() {
    vec4 color = texture2D(iChannel0, gl_FragCoord.xy / resolution.xy * 0.5);
    float c = 0.0;
    int i;
    for (int iter = 0; iter < 10; iter++) {
        // color = texture2D(iChannel0, color.xy / resolution.xy * 0.5);
        c += 1.;
        i = iter;
    }
    gl_FragColor = vec4(vec3(float(i) - 8.5), 1.0);
}