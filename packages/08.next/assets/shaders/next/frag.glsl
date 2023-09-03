precision lowp float;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec2 vVertexCoord;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main()
{
    vec4 color=texture2D(uSampler,vTextureCoord);
    gl_FragColor=color;
}