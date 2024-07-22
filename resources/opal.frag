precision mediump float;

varying vec2 pos;

uniform float millis;
float time = millis / 1000.0;

uniform vec2 resolution;
uniform vec2 mouse;

#define count 15.

// 2D Random
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float DrawScanline( vec2 uv )
{
    float scanline 	= clamp( 0.95 + 5.0 * cos( 3.14 * ( uv.y + 0.008 * time ) * 240.0 * 1.0 ), 0.0, 1.0 );
    float grille 	= 0.85 + 0.15 * clamp( 1.5 * cos( 3.14 * uv.x * 640.0 * 1.0 ), 0.0, 1.0 );
    return scanline * grille * 1.2;
}

vec3 palette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main()
{
    vec2 fragCoord = gl_FragCoord.xy - resolution.xy / 2.0;
    // Get the normalized coordinates (0 to 1)
    vec2 uv = fragCoord / resolution.xy;

    // Correct the aspect ratio
    uv = uv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.);
    
    // float count = 50.;
    
    for (float i = 0.; i < count; i++) {

        // Calculate the distance and angle from the center of the circle
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);

        // Set the base radius of the circle
        float radius = 0.5 +(count-i)*.009;

        // Set the base thickness of the outline
        float thickness = 0.01;
        
        float amp = .4;
        float sep = .03;

        float noisyRadius= radius + noise(uv + time-i*sep)*amp;
        // Calculate the edge using smoothstep
        float edge = smoothstep(noisyRadius - thickness, noisyRadius, dist) - smoothstep(noisyRadius, noisyRadius + thickness, dist);
        
        color+=vec3(edge)*pow((count-i)/count, 2.)*.3;
    }

    // Set the output color
    // gl_FragColor = vec4(vec3(DrawScanline(uv)), 1.);
    float filmgrain = random(uv + time);
    // vec3 coloring = palette(time * 0.25,
    //     vec3(0.938,0.328,0.718),
    //     vec3(0.659,0.438,0.328),
    //     vec3(0.388,0.388,0.296),
    //     vec3(2.538,2.478,0.168));
    vec3 coloring = palette(time * 0.025,
        vec3(.5),
        vec3(.5),
        vec3(1.),
        vec3(0., 0.333, 0.667));
    gl_FragColor = vec4((color * coloring * DrawScanline(uv) * filmgrain * 4.5), 1.);
}
