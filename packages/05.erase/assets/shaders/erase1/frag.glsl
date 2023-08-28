precision highp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
    vec4 color=texture2D(uSampler,vTextureCoord);
    
    if(color.rgb==vec3(1.)*color.a){
        color*=0.;
    }
    
    gl_FragColor=color;
}
