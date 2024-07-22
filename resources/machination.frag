precision mediump float;

varying vec2 pos;

uniform float millis;
float time = millis / 1000.0;

uniform vec2 resolution;
uniform vec2 mouse;

#define PI     3.14159265

float degToRad(float d) {
    return PI * d / 180.;
}

mat2 rot2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// cosine based palette, 4 vec3 params
vec3 palette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

// Funtion Distance
float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// Distance to the scene
float map(vec3 p, float timeRad) {      
    vec3 squareSize = vec3(60., 60., 0.1);
    
    float distFract = 2.;
    
    float coefDist = (p.z - (mod(p.z, distFract))) * 0.1;
    
    float distCenter = (63. + max(0., coefDist - 5.) * 2.) - ((sin(timeRad/2.)+1.)/2.) * 2.5 * (1. + coefDist);
    
    vec3 pos = p;
    pos.z = mod(p.z, distFract) - (distFract / 2.);
    
    pos.y += sin(coefDist * 3. + timeRad * 2.) * 1.;
    pos.xy *= rot2D(timeRad * coefDist);
    
    float squareLeft = sdBox(pos - vec3(-distCenter, 0., 0.2), squareSize);
    float squareTop = sdBox(pos - vec3(0., -distCenter, 0.4), squareSize);
    float squareRight = sdBox(pos - vec3(distCenter, 0., 0.6), squareSize);
    float squareBottom = sdBox(pos - vec3(0., distCenter, 0.8), squareSize);
    
    return min(
        min(squareLeft, squareTop),
        min(squareRight, squareBottom)
    );
}

// https://iquilezles.org/articles/normalsSDF
vec3 calcNormal( vec3 pos, float timeRad )
{
    vec2 e = vec2(1.0,-1.0)*0.5773*0.0005;
    return normalize( e.xyy*map( pos + e.xyy, timeRad ) + 
					  e.yyx*map( pos + e.yyx, timeRad ) + 
					  e.yxy*map( pos + e.yxy, timeRad ) + 
					  e.xxx*map( pos + e.xxx, timeRad ) );    
}

// https://iquilezles.org/articles/nvscene2008/rwwtt.pdf
float calcAO( vec3 pos, vec3 nor, float timeRad )
{
	float occ = 0.0;
    float sca = 1.0;
    for( int i=0; i<5; i++ )
    {
        float h = 0.01 + 0.12*float(i)/4.0;
        float d = map( pos + h*nor, timeRad );
        occ += (h-d)*sca;
        sca *= 0.95;
        if( occ>0.35 ) break;
    }
    return clamp( 1.0 - 3.0*occ, 0.0, 1.0 ) * (0.5+0.5*nor.y);
}

void main()
{
    vec2 fragCoord = gl_FragCoord.xy - resolution.xy / 2.0;

    vec2 uv = (fragCoord * 2. - resolution.xy) / resolution.y;
    vec2 m = vec2(0.);//(iMouse.xy * 2. - resolution.xy) / resolution.y;
    
    vec3 ro = vec3(0, 0, 0);                     // ray origin
    vec3 rd = normalize(vec3(uv, 1));             // ray direction
    vec3 col = vec3(0);                           // final pixel color
    
    float t = 0.;                                 // total distance travelled
   
    
    float timeRad = degToRad(time) * 30.;
    
    ro.xy *= rot2D(timeRad);
    rd.xy *= rot2D(timeRad);
    
    // Raymarching
    int i;
    vec3 p;
    for (int iter = 0; iter < 80; iter++) {    
        i = iter;
        p = ro + rd * t;                     // position along the ray

        float d = map(p, timeRad);                         // current distance to the scene

        t += d;                                   // "march" the ray
        
        //col = vec3(i) / 80.;                    // iteration count
       
        if (d < .001 || t > 100.) break;          // early stop
    }
    
    // Coloring
    float distCoef = 0.05;
    float iterationCoef = 0.005;
    col = vec3(t * distCoef
        + iterationCoef * float(i)); // color based on distance
    
    gl_FragColor = vec4(col, 1);
    
    
    float distShadow = 100.;
    float shadow = 1. - (max(0., min(t, distShadow)) / distShadow);
    
    float ao = calcAO(p, calcNormal(p, timeRad), timeRad);
    ao = 0.5 + (0.5 * ao);
    
    col = shadow * ao * palette(log(t) * .05 + float(i) * 0.02 + (time * 0.1),
        
        vec3(0.558, 0.168, 0.338),
        vec3(0.358, 0.808, 0.418),
        vec3(-0.552, 0.338, 0.218),
        vec3(1.975, 1.975, -0.925)); // http://dev.thi.ng/gradients/
        
    gl_FragColor = vec4(col, 1);
}