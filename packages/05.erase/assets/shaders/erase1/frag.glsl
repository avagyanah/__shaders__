precision highp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
    vec4 color=texture2D(uSampler,vTextureCoord);
    
    if(color.rgb==vec3(1.)*color.a){
        float alpha=0.;
        color.r=alpha;
        color.g=alpha;
        color.b=alpha;
    }
    
    gl_FragColor=color;
}
