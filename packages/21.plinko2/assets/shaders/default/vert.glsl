attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;

varying vec2 vTextureCoord;

uniform float uWidth;
uniform float uHeight;

void main()
{
    // vec2 bottom=vec2(.5,1);
    // float aaa=u_heigh;
    // float aaa=(aVertexPosition.y/uHeight)*(max_segment);
    
    // vec2 dim=vec2(uWidth,uHeight);
    // vec2 pt=aTextureCoord-BOTTOM;
    // float l=aTextureCoord.y-bottom.y;
    vec3 vertexPos=vec3(aVertexPosition.xy,1.);
    // vertexPos.y+=l*100.;
    
    gl_Position=vec4((projectionMatrix*translationMatrix*vertexPos).xy,0.,1.);
    vTextureCoord=vec2(aTextureCoord.x,aTextureCoord.y);
}