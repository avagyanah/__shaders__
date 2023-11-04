precision mediump float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aVertexNeighbors;
attribute float aVertexIndex;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

uniform float uWidth;

varying vec2 vTextureCoord;
varying float vAlpha;

vec2 rotateAround(vec2 v1,vec2 v2,float angle){
    float cos=cos(angle);
    float sin=sin(angle);
    
    float dx=v2[0]-v1[0];
    float dy=v2[1]-v1[1];
    
    float x=cos*(dx)+sin*(dy)+v1[0];
    float y=cos*(dy)-sin*(dx)+v1[1];
    
    return vec2(x,y);
}

void main()
{
    // Stretching from center
    vec3 vertexPos=vec3(aVertexPosition,1.);
    
    float distY=mod(aVertexIndex,2.)*uWidth-uWidth*.5;
    
    vec2 curr=aVertexPosition;
    vec2 prev=aVertexNeighbors.xy;
    vec2 next=aVertexNeighbors.zw;
    
    float angle=atan(next.y-prev.y,next.x-prev.x);
    
    vec2 vp=rotateAround(curr,vec2(curr[0],curr[1]+distY),-angle);
    
    vertexPos.x=vp.x;
    vertexPos.y=vp.y;
    
    // RESULT
    vec4 pos=vec4((projectionMatrix*translationMatrix*vertexPos).xy,0.,1.);
    gl_Position=pos;
    
    // Varyings
    vTextureCoord=aTextureCoord;
    vAlpha=pow(aTextureCoord.x,3.);
}