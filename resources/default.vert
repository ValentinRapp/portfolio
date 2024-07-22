attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

// uniform float millis;

// varying float time;

void main() {
  pos = aTexCoord;
  // time = millis / 1000.0;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  gl_Position = positionVec4;
}
