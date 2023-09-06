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

        next1: {
            vert: require('../assets/shaders/next1/vert.glsl'),
            frag: require('../assets/shaders/next1/frag.glsl'),
        },
        next2: {
            vert: require('../assets/shaders/next2/vert.glsl'),
            frag: require('../assets/shaders/next2/frag.glsl'),
        },
    },
};
