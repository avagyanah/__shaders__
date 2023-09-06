export const assets = {
    images: {
        bg: require('../assets/images/bg.jpg'),
        snake: require('../assets/images/snake.png'),
        clouds: require('../assets/images/clouds.png'),
        treadmill: require('../assets/images/treadmill.png'),
        displacement: require('../assets/images/displacement.jpg'),
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
    },
};
