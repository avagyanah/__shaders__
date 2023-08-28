export const assets = {
    images: {
        bg: require('../assets/images/bg.jpg'),
    },

    shaders: {
        default: {
            vert: require('../assets/shaders/default/vert.glsl'),
            frag: require('../assets/shaders/default/frag.glsl'),
        },
        alpha1: {
            frag: require('../assets/shaders/alpha1/frag.glsl'),
        },
    },
};
