precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;
varying vec2 vVertexCoord;

void main(){
    vec4 pos=vec4((projectionMatrix*translationMatrix*vec3(aVertexPosition,1.)).xy,0.,1.);
    gl_Position=pos;
    
    vTextureCoord=aTextureCoord;
    vVertexCoord=aVertexPosition;
}