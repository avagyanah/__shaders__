precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main()
{
    vec4 pos=vec4((projectionMatrix*translationMatrix*vec3(aVertexPosition,1.)).xy,0.,1.);
    gl_Position=vec4(pos.x,pos.y,pos.z,pos.w);
    
    vTextureCoord=aTextureCoord;
}