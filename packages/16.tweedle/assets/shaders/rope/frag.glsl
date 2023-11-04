precision lowp float;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main()
{
    vec4 color=texture2D(uSampler,vTextureCoord);
    gl_FragColor=color;
}