precision mediump float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aVertexNeighbors;
attribute float aVertexIndex;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

uniform float uWidth;
uniform float uNodes;

varying vec2 vTextureCoord;
varying float vAlpha;

void main()
{
    // Stretching from center
    vec3 vertexPos=vec3(aVertexPosition,1.);
    vertexPos.y+=mod(aVertexIndex,2.)*uWidth-uWidth*.5;
    
    vec2 prev=aVertexNeighbors.xy;
    vec2 next=aVertexNeighbors.zw;
    
    // Varyings
    vTextureCoord=aTextureCoord;
    vAlpha=pow(aTextureCoord.x,0.);
    
    // RESULT
    vec4 pos=vec4((projectionMatrix*translationMatrix*vertexPos).xy,0.,1.);
    gl_Position=pos;
}