export const assets = {
    images: {
        clouds: require('../assets/images/clouds.png'),
    },

    shaders: {
        default: {
            vert: require('../assets/shaders/default/vert.glsl'),
            frag: require('../assets/shaders/default/frag.glsl'),
        },
        water: {
            vert: require('../assets/shaders/water/vert.glsl'),
            frag: require('../assets/shaders/water/frag.glsl'),
        },
    },
};
