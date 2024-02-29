float incrementRainbow(float value, float increment) {
    return value + increment;
}

float decrementRainbow(float value, float increment) {
    return value - increment;
}

vec4 Rainbow(vec4 rainbow, float increment = 0.01f) {
    if (rainbow.x >= 1.f && rainbow.y < 1.f && rainbow.z <= 0.f) return vec4(1.f, incrementRainbow(rainbow.y, increment), 0.f, rainbow.w);
    else if (rainbow.x > 0.f && rainbow.y >= 1.f && rainbow.z <= 0.f) return vec4(decrementRainbow(rainbow.x, increment), 1.f, 0.f, rainbow.w);
    else if (rainbow.x <= 0.f && rainbow.y >= 1.f && rainbow.z < 1.f) return vec4(0.f, 1.f, incrementRainbow(rainbow.z, increment), rainbow.w);
    else if (rainbow.x <= 0.f && rainbow.y > 0.f && rainbow.z >= 1.f) return vec4(0.f, decrementRainbow(rainbow.y, increment), 1.f, rainbow.w);
    else if (rainbow.x < 1.f && rainbow.y <= 0.f && rainbow.z >= 1.f) return vec4(incrementRainbow(rainbow.x, increment), 0.f, 1.f, rainbow.w);
    else if (rainbow.x >= 1.f && rainbow.y <= 0.f && rainbow.z > 0.f) return vec4(1.f, 0.f, decrementRainbow(rainbow.z, increment), rainbow.w);
    else return vec4(1.f, 0.f, 0.f, rainbow.w);
}