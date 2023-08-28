export const assets = {
    images: {
        bg1: require('../assets/images/bg1.jpg'),
        bg2: require('../assets/images/bg2.jpg'),
    },

    shaders: {
        default: {
            vert: require('../assets/shaders/default/vert.glsl'),
            frag: require('../assets/shaders/default/frag.glsl'),
        },
        color: {
            frag: require('../assets/shaders/color/frag.glsl'),
        },
    },
};
