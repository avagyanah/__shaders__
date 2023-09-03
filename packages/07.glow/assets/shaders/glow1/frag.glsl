precision lowp float;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec2 vVertexCoord;

uniform vec4 u_color;
uniform float u_intensity;

void main()
{
    vec2 v1=vec2(vTextureCoord);
    vec2 v2=vec2(.5,.5);
    
    float dx=pow(v1.x-v2.x,2.);
    float dy=pow(v1.y-v2.y,2.);
    float dist=min(1.,sqrt(dx+dy)*2.);
    float alpha=1.-pow(dist,u_intensity);
    
    gl_FragColor=u_color*alpha;
}