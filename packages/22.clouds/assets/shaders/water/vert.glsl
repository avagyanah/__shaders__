precision mediump float;

uniform float uTime;
uniform float uRepeat;
uniform float uNoiseRepeat;

varying vec2 vUv;
varying vec2 vNoiseUv;

void main(){
    vUv=uv*uRepeat;
    vNoiseUv=uv*uNoiseRepeat;
    
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;

varying vec2 vTextureCoord;
uniform float uTime;
uniform float uRepeat;
uniform float uNoiseRepeat;

varying vec2 vUv;
varying vec2 vNoiseUv;

void main()
{
    gl_Position=vec4((projectionMatrix*translationMatrix*vec3(aVertexPosition,1.)).xy,0.,1.);
    vTextureCoord=aTextureCoord;
}