export const assets = {
    images: {
        bg: require('../assets/images/bg.jpg'),
        snake: require('../assets/images/snake.png'),
        clouds: require('../assets/images/clouds.png'),
        treadmill: require('../assets/images/treadmill.png'),
        displacement: require('../assets/images/displacement.jpg'),
        ball: require('../assets/images/ball.png'),
    },

    shaders: {
        default: {
            vert: require('../assets/shaders/default/vert.glsl'),
            frag: require('../assets/shaders/default/frag.glsl'),
        },

        rope: {
            vert: require('../assets/shaders/rope/vert.glsl'),
            frag: require('../assets/shaders/rope/frag.glsl'),
        },
        trail: {
            vert: require('../assets/shaders/trail/vert.glsl'),
            frag: require('../assets/shaders/trail/frag.glsl'),
        },
    },
};
