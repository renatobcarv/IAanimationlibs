export const atmosphereVertex = /* glsl */ `
 varying vec2 vUv;
 void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
export const atmosphereFragment = /* glsl */ `
 uniform float uTime;uniform vec3 uColor;uniform float uIntensity;varying vec2 vUv;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
 void main(){vec2 p=vUv*3.;float n=noise(p+vec2(uTime*.045,0.));float mist=smoothstep(.22,.76,n)*uIntensity;float edge=smoothstep(0.,.32,vUv.y)*(1.-smoothstep(.7,1.,vUv.y));gl_FragColor=vec4(uColor,mist*edge*.32);}
`;
