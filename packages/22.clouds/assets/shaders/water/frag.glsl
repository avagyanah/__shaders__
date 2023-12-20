precision highp float;

uniform float uTime;
uniform float uRepeat;
uniform vec3 uColor;

uniform sampler2D uTexture;
uniform sampler2D uNoiseTexture;
uniform float uOpacity;
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying vec2 vUv;
varying vec2 vNoiseUv;

float inverseLerp(float a, float b, float v) {
  return (v - a)/(b - a);
}

float remap(float origFrom, float origTo, float targetFrom, float targetTo, float value) {
  float rel = inverseLerp(origFrom, origTo, value);
  
  return mix(targetFrom, targetTo, rel);
}

void main() {
  vec4 noise = texture2D(uNoiseTexture, vec2(vNoiseUv.x, vNoiseUv.y + uTime * 0.2 ));

  vec3 alphaR = texture2D(uNoiseTexture, vec2(vNoiseUv.x - uTime * 0.1, vNoiseUv.y - uTime * 0.1)).rrr;
  vec3 alphaG = texture2D(uNoiseTexture, vec2(vNoiseUv.x - uTime * 0.1, vNoiseUv.y - uTime * 0.1)).ggg;
  
  float distortionX = -alphaG.x * 0.05;
  float distortionY = -alphaR.y * 0.05;

  gl_FragColor = vec4((texture2D(uTexture, vec2(vUv.x + distortionX, vUv.y + distortionY + uTime * 0.15)) * vec4(uColor, 1.)).xyz, uOpacity);
}