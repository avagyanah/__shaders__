attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform mat3 projectionMatrix;

void main()
{
    gl_Position=vec4((projectionMatrix*vec3(aVertexPosition,1.)).xy,0.,1.);
    vTextureCoord=aTextureCoord;
}