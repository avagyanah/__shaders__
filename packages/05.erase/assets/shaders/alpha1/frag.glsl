precision highp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float u_alpha;

void main(void){
    vec4 color=texture2D(uSampler,vTextureCoord)*u_alpha;
    
    gl_FragColor=color;
}
