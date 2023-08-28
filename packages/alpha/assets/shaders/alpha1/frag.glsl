varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float u_alpha;

void main(void){
    vec4 color=texture2D(uSampler,vTextureCoord)*clamp(u_alpha,0.,1.);
    gl_FragColor=color;
}
