varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
    vec4 color=texture2D(uSampler,vTextureCoord);
    float alpha=pow(vTextureCoord.y*2.,2.);
    
    gl_FragColor=color*alpha;
}
