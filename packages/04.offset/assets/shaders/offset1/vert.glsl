attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform mat3 projectionMatrix;
uniform vec2 u_offset;

void main()
{
    vec2 pos=vec2(aVertexPosition)+u_offset;
    vec3 view=projectionMatrix*vec3(vec2(pos),1.);
    float x=view.x;
    float y=view.y;
    
    gl_Position=vec4(x,y,0.,1.);
    vTextureCoord=aTextureCoord;
}