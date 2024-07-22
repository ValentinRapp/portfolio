precision mediump float;

varying vec2 pos;

// varying float time;
uniform float millis;
float time = millis / 1000.0;

uniform vec2 resolution;
uniform vec2 mouse;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

#define PI 3.141592
#define TAU PI * 2.

const vec4 colorMain = vec4(1., 0.9, 0.1, 1.);
const vec4 colorBlack = vec4(0);
const vec4 colorWhite = vec4(1);
// float time = 0.;

float from(float x, float min, float max) {
    return (x - min) / (max - min);
}


float dither2x2(vec2 position, float brightness) {
  int x = int(mod(position.x, 2.0));
  int y = int(mod(position.y, 2.0));
  int index = x + y * 2;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.25;
    if (index == 1) limit = 0.75;
    if (index == 2) limit = 1.00;
    if (index == 3) limit = 0.50;
  }

  return brightness < limit ? 0.0 : 1.0;
}


float dither4x4(vec2 position, float brightness) {
  int x = int(mod(position.x, 4.0));
  int y = int(mod(position.y, 4.0));
  int index = x + y * 4;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.0625;
    if (index == 1) limit = 0.5625;
    if (index == 2) limit = 0.1875;
    if (index == 3) limit = 0.6875;
    if (index == 4) limit = 0.8125;
    if (index == 5) limit = 0.3125;
    if (index == 6) limit = 0.9375;
    if (index == 7) limit = 0.4375;
    if (index == 8) limit = 0.25;
    if (index == 9) limit = 0.75;
    if (index == 10) limit = 0.125;
    if (index == 11) limit = 0.625;
    if (index == 12) limit = 1.0;
    if (index == 13) limit = 0.5;
    if (index == 14) limit = 0.875;
    if (index == 15) limit = 0.375;
  }

  return brightness < limit ? 0.0 : 1.0;
}


float dither8x8(vec2 position, float brightness) {
  int x = int(mod(position.x, 8.0));
  int y = int(mod(position.y, 8.0));
  int index = x + y * 8;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.015625;
    if (index == 1) limit = 0.515625;
    if (index == 2) limit = 0.140625;
    if (index == 3) limit = 0.640625;
    if (index == 4) limit = 0.046875;
    if (index == 5) limit = 0.546875;
    if (index == 6) limit = 0.171875;
    if (index == 7) limit = 0.671875;
    if (index == 8) limit = 0.765625;
    if (index == 9) limit = 0.265625;
    if (index == 10) limit = 0.890625;
    if (index == 11) limit = 0.390625;
    if (index == 12) limit = 0.796875;
    if (index == 13) limit = 0.296875;
    if (index == 14) limit = 0.921875;
    if (index == 15) limit = 0.421875;
    if (index == 16) limit = 0.203125;
    if (index == 17) limit = 0.703125;
    if (index == 18) limit = 0.078125;
    if (index == 19) limit = 0.578125;
    if (index == 20) limit = 0.234375;
    if (index == 21) limit = 0.734375;
    if (index == 22) limit = 0.109375;
    if (index == 23) limit = 0.609375;
    if (index == 24) limit = 0.953125;
    if (index == 25) limit = 0.453125;
    if (index == 26) limit = 0.828125;
    if (index == 27) limit = 0.328125;
    if (index == 28) limit = 0.984375;
    if (index == 29) limit = 0.484375;
    if (index == 30) limit = 0.859375;
    if (index == 31) limit = 0.359375;
    if (index == 32) limit = 0.0625;
    if (index == 33) limit = 0.5625;
    if (index == 34) limit = 0.1875;
    if (index == 35) limit = 0.6875;
    if (index == 36) limit = 0.03125;
    if (index == 37) limit = 0.53125;
    if (index == 38) limit = 0.15625;
    if (index == 39) limit = 0.65625;
    if (index == 40) limit = 0.8125;
    if (index == 41) limit = 0.3125;
    if (index == 42) limit = 0.9375;
    if (index == 43) limit = 0.4375;
    if (index == 44) limit = 0.78125;
    if (index == 45) limit = 0.28125;
    if (index == 46) limit = 0.90625;
    if (index == 47) limit = 0.40625;
    if (index == 48) limit = 0.25;
    if (index == 49) limit = 0.75;
    if (index == 50) limit = 0.125;
    if (index == 51) limit = 0.625;
    if (index == 52) limit = 0.21875;
    if (index == 53) limit = 0.71875;
    if (index == 54) limit = 0.09375;
    if (index == 55) limit = 0.59375;
    if (index == 56) limit = 1.0;
    if (index == 57) limit = 0.5;
    if (index == 58) limit = 0.875;
    if (index == 59) limit = 0.375;
    if (index == 60) limit = 0.96875;
    if (index == 61) limit = 0.46875;
    if (index == 62) limit = 0.84375;
    if (index == 63) limit = 0.34375;
  }

  return brightness < limit ? 0.0 : 1.0;
}

float ditherTexture8x8(vec2 position, float brightness) {
  float limit = texture2D(iChannel2, (position / 1024. + 1.) * 0.5).x;
  return brightness < limit ? 0.0 : 1.0;
}

vec4 renderSun(vec2 fragcoord) {
    vec4 fragColor  = vec4(0);
    
    vec3 light = vec3(cos(time), .0, sin(time));
    vec2 ratio = vec2(resolution.x / resolution.y, 1.);
    vec2 pos = fragcoord / resolution.xy;
    vec2 npos = 2. * pos - 1.;
    vec2 cpos = npos * ratio;
    float apos = atan(cpos.y, cpos.x);
    vec3 norm = normalize(vec3(cpos, sqrt(1. - dot(cpos, cpos))));
    vec2 tpos = vec2(
      atan(norm.z, norm.x) / TAU,
      asin(norm.y) / TAU
    );
    
    vec2 tdpos0 = vec2(
        mod(time * .1, 1.),
        mod(-time* 0.01, 1.)
    ) + tpos;
    vec4 tex0 = texture2D(
      iChannel0,
      (tdpos0 + 1.) * 0.5
    );
    
    vec2 tdpos1 = vec2(
        mod(time * .1, 1.),
        mod(time * 0.01, 1.)
   	) + tpos;
    vec4 tex1 = texture2D(
        iChannel1,
        (tdpos1 + 1.) * 0.5
    );
    
    float rx = atan(norm.y, norm.x) / PI;
    float ry = mod(time * 0.01, 1.);
    vec2 rpos = vec2(rx, ry);
    vec4 rtex0 = texture2D(
        iChannel0,
        (rpos + 1.) * 0.5
    );
    vec4 rtex1 = texture2D(
        iChannel1,
        (rpos + 1.) * 0.5
    );
    float incidence = dot(light, norm);
    float dist = length(cpos);
    float ndist = 1. - dist;
    if (dist > 1.0) {
        fragColor = vec4(0);
        fragColor += mix(
            colorMain,
            colorBlack,
            pow(dist - 1., .25)
        );
        
        float ldist = 1.0 + rtex1.x * .75;
        if (dist < ldist) {
            vec4 corona = mix(
                colorMain * 0.1,
                colorBlack,
                from(dist, 1.0, ldist)
            );
            fragColor += corona;
        }
        
        float hdist = 1.0 + rtex0.x * 0.05 + rtex1.x * 0.1;
        if (dist < hdist) {
            vec4 corona = mix(
                colorMain * 0.5,
                colorBlack,
                from(dist, 1.0, hdist)
            );
            fragColor += corona;
        }
        
        float rdist = 1.0 + rtex0.x * 0.1;
        if (dist < rdist) {
            vec4 corona = mix(
                colorMain + vec4(0.5, 0.5, 0.5, 1.),
                colorBlack,
                from(dist, 1.0, rdist)
            );
            fragColor += corona;
        }
    } else {
    	fragColor = vec4(
            mix(
                colorWhite * 0.1,
                colorMain,
            	(tex0.x + tex1.x) * 0.5
            )
        ) * ndist;
        
        fragColor += vec4(
            mix(
                colorMain,
                colorBlack,
                pow(ndist, 0.8)
            )
        );
        
        fragColor += vec4(
            mix(
                colorMain * 0.7,
                colorBlack,
                pow(ndist, 0.09)
            )
        );
    }
    return fragColor;
}

void main()
{
    vec2 fragcoord = gl_FragCoord.xy - resolution.xy / 2.0;
    vec4 color = renderSun(fragcoord);
    float brightness = (color.x + color.y + color.z) / 3.0;
    gl_FragColor = vec4(dither8x8(fragcoord, brightness));
    // gl_FragColor = color;
}