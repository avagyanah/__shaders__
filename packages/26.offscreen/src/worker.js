/* eslint-disable */

let last = 0;
const response = { delta: 0 };

onmessage = function (e) {
    const animate = (now = performance.now()) => {
        requestAnimationFrame(animate);

        const delta = now - last;
        response.delta = delta;

        postMessage(response);
        last = now;
    };

    animate();
};
