precision lowp float;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec2 vVertexCoord;
varying float vAlpha;

void main()
{
    vec4 color=texture2D(uSampler,vTextureCoord);
    gl_FragColor=color*vAlpha;
}