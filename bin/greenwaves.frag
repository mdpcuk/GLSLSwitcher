// Tenjix

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795

uniform float time;
uniform vec2 resolution;

const float position = 0.2;
const float scale = 0.25;
const float intensity = 1.0;

float band(vec2 pos, float amplitude, float frequency) {
	float wave = scale * amplitude * sin(7.75 * PI * frequency * pos.x + time) / 0.75;//Frequeny and height
	float light = clamp(amplitude * frequency * 0.002, 0.001 + 0.001 / scale, 2.0) * scale / abs(wave - pos.y);
	return light;
}

void main( void ) {

	vec3 color = vec3(0.2, 1.2, 0.4)*5.;
	color = color == vec3(0.0)? vec3(0.5, 0.5, 1.0) : color;
	vec2 pos = (gl_FragCoord.xy / resolution.xy);
	pos.y += - 0.5 - position;
	
	// +pk
	float spectrum = 0.05;
	const float lim = 18.;
	#define time time*0.032 + pos.x*10.
	for(float i = 0.; i < lim; i++){
		spectrum += band(pos, 1.0*sin(time*0.1), 1.0*sin(time*i/lim))/lim;
	}
	
	//spectrum += band(pos, 0.7, 2.5);
	//spectrum += band(pos, 0.4, 2.0);
	//spectrum += band(pos, 0.05, 4.5);
	//spectrum += band(pos, 0.1, 7.0);
	//spectrum += band(pos, 0.1, 1.0);
	
	gl_FragColor = vec4(color * spectrum, spectrum);
	
}