precision mediump float;

#define PI radians(180.)
#define TAU radians(360.)
#define CENTER vec2(.5)

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec2 vVertexCoord;

uniform float u_intensity;
uniform float u_count;
uniform float u_gap;
uniform vec4 u_color;

void main(){
    vec2 pt=CENTER-vTextureCoord;
    float angle=atan(pt.y,pt.x);
    float radius=length(pt);
    float alpha=1.-pow(radius*2.,u_intensity);
    
    float traction=step(u_gap,fract(atan(pt.y,pt.x)/TAU*u_count));
    
    gl_FragColor=u_color*alpha*traction;
}