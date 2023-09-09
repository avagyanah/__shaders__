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
    // float distY=mod(aVertexIndex,2.)*uWidth-uWidth*.5;
    // vertexPos.y+=mod(aVertexIndex,2.)*uWidth-uWidth*.5;
    
    vec2 prev=aVertexNeighbors.xy;
    vec2 next=aVertexNeighbors.zw;
    
    // vec3 bone1=vec3(aVertexPosition-prev,0.);
    // vec3 bone2=vec3(next-aVertexPosition,0.);
    
    // vec3 normal=vec3(0.,0.,1.);
    
    // vec3 direction1=cross(normal,normalize(bone1));
    // vec3 direction2=cross(normal,normalize(bone2));
    // vertexPos+=(direction1+direction2);
    
    // vertexPos=nodePosition-dir2D*uTrailWidth/2.*interpolation;
    
    // float angle1=dot(next,vertexPos.xy)/length(next-vertexPos.xy);
    // float angle1=atan(prev.y-aVertexPosition.y,prev.x-aVertexPosition.x);
    
    // float angle2=atan(aVertexPosition.y-next.y,aVertexPosition.x-next.x);
    // float angle2=dot(next,vertexPos.xy)/length(next-vertexPos.xy);
    // vertexPos=vec3(aVertexPosition.xy*rotate(angle1),1.);
    
    // float angle1=atan(prev.y-aVertexPosition.y,prev.x-aVertexPosition.x);
    // float angle2=atan(next.y-aVertexPosition.y,next.x-aVertexPosition.x);
    // float angle=(angle1-angle2)/2.;
    // float angle=angle1;
    // vertexPos.y+=mod(aVertexIndex,2.)*uWidth*sin(30.);
    // vertexPos.x+=mod(aVertexIndex,2.)*uWidth*cos(30.);
    // vertexPos.x+=25.*cos(((angle1+angle2)/2.)*radians(90.));
    // vertexPos.y+=25.*sin(((angle1+angle2)/2.)*radians(90.));
    // vertexPos.x+=sin(angle);
    
    // Varyings
    vTextureCoord=aTextureCoord;
    vAlpha=pow(aTextureCoord.x,0.);
    
    // RESULT
    vec4 pos=vec4((projectionMatrix*translationMatrix*vertexPos).xy,0.,1.);
    gl_Position=pos;
}