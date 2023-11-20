varying vec2 vTextureCoord;

// uniform sampler2D uSampler;

uniform float uWidth;
uniform float uHeigh;
uniform float uRows;
uniform float uColumns;
uniform float uGap;

void main(void){
    /* traction */
    float tractionFactor=1.-uGap/(uWidth/uColumns);
    float fractionX=fract(vTextureCoord.x*uColumns);
    float fractionY=fract(vTextureCoord.y*uRows);
    float stepX=step(fractionX,tractionFactor);
    float stepY=step(fractionY,tractionFactor);
    
    float traction=stepX*stepY;
    
    /* color */
    vec4 color=vec4(1.,1.,1.,1.);
    
    /* alpha */
    float alpha=pow(vTextureCoord.y,0.);
    
    gl_FragColor=color*alpha*traction;
}
