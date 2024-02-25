const NOOP = (): void => {
    //
};

interface ITimeStepConfig {
    min?: number;
    target?: number;
    limit?: number;
}

type IAnimCallback = (...args: any[]) => void;

class RequestAnimationFrame {
    public isRunning: boolean;
    public timeOutID: number;
    public callback: IAnimCallback;

    public constructor() {
        this.isRunning = false;
        this.callback = NOOP;
    }

    public start(callback: IAnimCallback): void {
        if (this.isRunning) {
            return;
        }

        this.callback = callback;
        this.isRunning = true;
        this.timeOutID = window.requestAnimationFrame(this._step);
    }

    public stop(): void {
        this.isRunning = false;

        window.cancelAnimationFrame(this.timeOutID);
    }

    public destroy(): void {
        this.stop();

        this.callback = NOOP;
    }

    private readonly _step = (time: number): void => {
        this.callback(time);

        if (this.isRunning) {
            this.timeOutID = window.requestAnimationFrame(this._step);
        }
    };
}

export class TimeStep {
    public raf: RequestAnimationFrame;
    public started: boolean;
    public running: boolean;
    public minFps: number;
    public targetFps: number;
    public fpsLimit: number;
    public hasFpsLimit: boolean;

    public callback: IAnimCallback;
    public actualFps: number;
    public nextFpsUpdate: number;
    public framesThisSecond: number;
    public time: number;
    public startTime: number;
    public lastTime: number;
    public frame: number;
    public inFocus: boolean;
    public delta: number;
    public deltaIndex: number;
    public rawDelta: number;
    public now: number;

    private _min: number;
    private _target: number;
    private _pauseTime: number;
    private _coolDown: number;
    private _limitRate: number;

    public constructor(config: ITimeStepConfig = {}) {
        this.raf = new RequestAnimationFrame();
        this.started = false;
        this.running = false;
        this.minFps = config.min || 5;
        this.targetFps = config.target || 60;
        this.fpsLimit = config.limit || 0;
        this.hasFpsLimit = this.fpsLimit > 0;

        this.callback = NOOP;
        this.actualFps = this.targetFps;
        this.nextFpsUpdate = 0;
        this.framesThisSecond = 0;
        this.time = 0;
        this.startTime = 0;
        this.lastTime = 0;
        this.frame = 0;
        this.inFocus = true;
        this.delta = 0;
        this.deltaIndex = 0;
        this.rawDelta = 0;
        this.now = 0;

        this._limitRate = this.hasFpsLimit ? 1000 / this.fpsLimit : 0;
        this._min = 1000 / this.minFps;
        this._target = 1000 / this.targetFps;
        this._pauseTime = 0;
        this._coolDown = 0;
    }

    public blur(): void {
        this.inFocus = false;
    }

    public focus(): void {
        this.inFocus = true;

        this.resetDelta();
    }

    public pause(): void {
        this._pauseTime = window.performance.now();
    }

    public resume(): void {
        this.resetDelta();

        this.startTime += this.time - this._pauseTime;
    }

    public resetDelta(): void {
        const now = window.performance.now();

        this.time = now;
        this.lastTime = now;
        this.nextFpsUpdate = now + 1000;
        this.framesThisSecond = 0;

        this.delta = 0;
        this.deltaIndex = 0;
    }

    public start(callback: IAnimCallback): this {
        if (this.started) {
            return this;
        }

        this.started = true;
        this.running = true;

        this.resetDelta();

        this.startTime = window.performance.now();

        this.callback = callback;

        const step = this.hasFpsLimit ? this.stepLimitFPS.bind(this) : this.step.bind(this);

        this.raf.start(step);

        return this;
    }

    public updateFPS(time: number): void {
        this.actualFps = 0.25 * this.framesThisSecond + 0.75 * this.actualFps;
        this.nextFpsUpdate = time + 1000;
        this.framesThisSecond = 0;
    }

    public stepLimitFPS = (time: number): void => {
        this.now = performance.now();

        //  delta time (time is in ms)
        //  Math.max because Chrome will sometimes give negative deltas
        const delta = Math.max(0, time - this.lastTime);

        this.rawDelta = delta;

        //  Real-world timer advance
        this.time += this.rawDelta;

        //  Set as the world delta value (after smoothing, if applied)
        this.delta += delta;

        if (time >= this.nextFpsUpdate) {
            this.updateFPS(time);
        }

        this.framesThisSecond++;

        if (this.delta >= this._limitRate) {
            this.callback(time, this.delta);

            this.delta = 0;
        }

        //  Shift time value over
        this.lastTime = time;

        this.frame++;
    };

    public step = (time: number): void => {
        this.now = performance.now();

        //  delta time (time is in ms)
        //  Math.max because Chrome will sometimes give negative deltas
        const delta = Math.max(0, time - this.lastTime);

        this.rawDelta = delta;

        //  Real-world timer advance
        this.time += this.rawDelta;

        //  Set as the world delta value (after smoothing, if applied)
        this.delta = delta;

        if (time >= this.nextFpsUpdate) {
            this.updateFPS(time);
        }

        this.framesThisSecond++;

        this.callback(time, delta);

        //  Shift time value over
        this.lastTime = time;

        this.frame++;
    };

    public tick(): void {
        const now = window.performance.now();

        if (this.hasFpsLimit) {
            this.stepLimitFPS(now);
        } else {
            this.step(now);
        }
    }

    public sleep(): void {
        if (this.running) {
            this.raf.stop();

            this.running = false;
        }
    }

    public wake(seamless: boolean): void {
        if (seamless === undefined) {
            seamless = false;
        }

        const now = window.performance.now();

        if (this.running) {
            return;
        } else if (seamless) {
            this.startTime += -this.lastTime + (this.lastTime + now);
        }

        const step = this.hasFpsLimit ? this.stepLimitFPS.bind(this) : this.step.bind(this);

        this.raf.start(step);

        this.running = true;

        this.nextFpsUpdate = now + 1000;
        this.framesThisSecond = 0;

        this.tick();
    }

    public getDuration(): number {
        return Math.round(this.lastTime - this.startTime) / 1000;
    }

    public getDurationMS(): number {
        return Math.round(this.lastTime - this.startTime);
    }

    public stop(): this {
        this.running = false;
        this.started = false;

        this.raf.stop();

        return this;
    }

    public destroy(): void {
        this.stop();

        this.raf.destroy();

        this.raf = null;
        this.callback = null;
    }
}
