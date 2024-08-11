precision mediump float;

varying vec2 pos;

uniform float millis;
uniform vec2 resolution;
uniform vec2 mouse;

vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy - 1.0;
    uv.x *= resolution.x / resolution.y;
    // uv = uv - 1.0;

    float time = millis / 1000.0;

    vec2 m = vec2(mouse.x / resolution.x, 1.0 - mouse.y / resolution.y);
    vec2 MousePos = m * 2.0 - 1.0;
    MousePos.x *= resolution.x / resolution.y;

    float distFromMouse = distance(uv, MousePos);

    vec2 uv0 = uv;

    vec2 direction = normalize(uv - MousePos);

    // displacement effect around the cursor
    float strength = 1.0;
    float factor = exp(-distFromMouse * 5.0);
    uv += -direction * strength * factor;

    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + time*.4);

        d = sin(d*8. + time)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}