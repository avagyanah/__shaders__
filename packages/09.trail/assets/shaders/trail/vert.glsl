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

mat2 rotate(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

void main()
{
    // Stretching from center
    vec3 vertexPos=vec3(aVertexPosition,1.);
    
    // // float distY=mod(aVertexIndex,2.)*uWidth-uWidth*.5;
    // float distY=mod(aVertexIndex,2.)*uWidth;
    // // vertexPos.y+=distY;
    
    // vec2 curr=aVertexPosition;
    // vec2 prev=aVertexNeighbors.xy;
    // vec2 next=aVertexNeighbors.zw;
    
    // // vec2 v1=prev-curr;
    // // vec2 v2=next-curr;
    // vec2 v=(atan(prev,curr)+atan(next,curr))/.5;
    
    // // vec2 v1=next-curr;
    // // float dotx=dot(next,curr);
    // // atan(prev - curr) - atan();
    
    // RESULT
    vec4 pos=vec4((projectionMatrix*translationMatrix*vertexPos).xy,0.,1.);
    gl_Position=pos;
    
    // Varyings
    vTextureCoord=aTextureCoord;
    vAlpha=pow(aTextureCoord.x,0.);
}