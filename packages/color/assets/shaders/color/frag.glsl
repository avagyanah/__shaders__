varying vec2 vTextureCoord;

uniform sampler2D uSampler;
// uniform vec3 u_alpha;
uniform float u_r;
uniform float u_g;
uniform float u_b;
uniform float u_a;

void main(void){
    vec4 color=texture2D(uSampler,vTextureCoord)*u_a;
    
    color.r=color.r*u_r;
    color.g=color.g*u_g;
    color.b=color.b*u_b;
    
    gl_FragColor=color;
}
