precision highp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aVertexNeighbors;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;
varying float vAlpha;

void main()
{
    
    vec2 nbL=aVertexNeighbors.xy;
    vec2 nbR=aVertexNeighbors.zw;
    
    // GL Position
    vec4 pos=vec4((projectionMatrix*translationMatrix*vec3(aVertexPosition,1.)).xy,0.,1.);
    gl_Position=pos;
    
    vTextureCoord=aTextureCoord;
    vAlpha=pow(aTextureCoord.x,.0);
}