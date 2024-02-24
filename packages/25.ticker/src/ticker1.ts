type TickerListener = (dt: number, last: number, elapsed: number) => void;

export class Ticker1 {
    #now = 0;
    #last = 0;
    #rafID = -1;
    #interval = 0;
    #elapsed = 0;
    #callbacks = new Array<TickerListener>();

    public constructor() {
        document.addEventListener('visibilitychange', () => {
            document.hidden ? this.pause() : this.resume();
        });
    }

    public get now(): number {
        return this.#now;
    }

    public get elapsed(): number {
        return this.#elapsed;
    }

    public setMaxFPS(fps: number): void {
        this.#interval = 1000 / fps;
    }

    public add(callback: TickerListener): void {
        this.#callbacks.push(callback);
    }

    public remove(callback: TickerListener): void {
        const callbacks = [...this.#callbacks];
        callbacks.splice(callbacks.indexOf(callback), 1);

        this.#callbacks = callbacks;
    }

    public start(): void {
        this.resume();
    }

    public stop(): void {
        this.pause();
    }

    public pause(): void {
        cancelAnimationFrame(this.#rafID);
        //     console.warn('pause');
    }

    public resume(): void {
        console.warn('resume');

        this.#now = performance.now();
        this._update();
        // this.#rafID = requestAnimationFrame(this._update);
    }

    private readonly _update = (now = performance.now()): void => {
        this.#rafID = requestAnimationFrame(this._update);

        const dt = now - this.#now;

        this.#elapsed += dt;

        this.#callbacks.forEach((c) => c(dt, this.#elapsed, now));
        this.#now = now;
    };
}

export const lerp = (start: number, end: number, amplitude: number): number => {
    return (1 - amplitude) * start + amplitude * end;
};

/*
    All you can control is when you're going to skip a frame. A 60 fps monitor always draws at 16ms intervals.
    For example if you want your game to run at 50fps, you want to skip every 6th frame.
    You check if 20ms (1000/50) has elapsed, and it hasn't (only 16ms has elapsed) so you skip a frame,
    then the next frame 32ms has elapsed since you drew, so you draw and reset.
    But then you'll skip half the frames and run at 30fps. So when you reset you remember
    you waited 12ms too long last time. So next frame another 16ms passes but you count it as
    16+12=28ms so you draw again and you waited 8ms too long
*/
