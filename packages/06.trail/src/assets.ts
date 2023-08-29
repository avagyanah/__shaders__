export const assets = {
    images: {
        bg: require('../assets/images/bg.jpg'),
        clouds: require('../assets/images/clouds.png'),
    },

    shaders: {
        default: {
            vert: require('../assets/shaders/default/vert.glsl'),
            frag: require('../assets/shaders/default/frag.glsl'),
        },
        alpha1: {
            vert: require('../assets/shaders/alpha1/vert.glsl'),
            frag: require('../assets/shaders/alpha1/frag.glsl'),
        },
        trail1: {
            vert: require('../assets/shaders/trail1/vert.glsl'),
            frag: require('../assets/shaders/trail1/frag.glsl'),
        },
        test: {
            vert: require('../assets/shaders/test/vert.glsl'),
            frag: require('../assets/shaders/test/frag.glsl'),
        },
    },
};
