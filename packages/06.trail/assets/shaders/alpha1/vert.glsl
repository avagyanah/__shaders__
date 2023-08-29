attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec2 aUvs;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main()
{
    gl_Position=vec4((projectionMatrix*vec3(aVertexPosition,1.)).xy,0.,1.);
    vTextureCoord=aTextureCoord;
}
