const NOOP = (): void => {
    //
};

export interface ITimeStepConfig {
    limit?: number;
    speed?: number;
}

export type IAnimCallback = (time: number, delta: number) => void;

class RequestAnimationFrame {
    public isRunning: boolean;
    public timeOutID: number;
    public callback: FrameRequestCallback;

    public constructor(callback: FrameRequestCallback = NOOP) {
        this.isRunning = false;
        this.callback = callback ?? NOOP;
    }

    public setCallback(callback: FrameRequestCallback): void {
        this.callback = callback;
    }

    public start(): void {
        if (this.isRunning) {
            return;
        }

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
    private _raf: RequestAnimationFrame;
    private _started: boolean;
    private _running: boolean;
    private _hasFpsLimit: boolean;

    private _callbacks: Array<IAnimCallback>;
    private _nextFpsUpdate: number;
    private _time: number;
    private _speed: number;
    private _startTime: number;
    private _pauseTime: number;
    private _lastTime: number;
    private _delta: number;
    private _now: number;

    private _fpsLimit: number;
    private _limitRate: number;

    public constructor(config: ITimeStepConfig = {}) {
        const fpsLimit = config.limit || 0;
        const hasFpsLimit = fpsLimit > 0;
        const step = hasFpsLimit ? this._stepLimitFPS.bind(this) : this._step.bind(this);

        this._raf = new RequestAnimationFrame(step);
        this._started = false;
        this._running = false;
        this._speed = config.speed || 1;
        this._fpsLimit = fpsLimit;
        this._limitRate = hasFpsLimit ? 1000 / fpsLimit : 0;

        this._callbacks = [];
        this._nextFpsUpdate = 0;

        this._now = 0;
        this._time = 0;
        this._startTime = 0;
        this._pauseTime = 0;
        this._lastTime = 0;
        this._delta = 0;
    }

    public get elapsedMS(): number {
        return this._lastTime - this._startTime;
    }

    public get lastMS(): number {
        return this._lastTime;
    }

    public get deltaMS(): number {
        return this._delta;
    }

    public get nowMS(): number {
        return this._now;
    }

    public get isStarted(): boolean {
        return this._started;
    }

    public get isRunning(): boolean {
        return this._running;
    }

    public get hasFpsLimit(): boolean {
        return this._hasFpsLimit;
    }

    public get fpsLimit(): number {
        return this._fpsLimit;
    }

    public get fps(): number {
        return 1000 / this.deltaMS;
    }

    public get speed(): number {
        return this._speed;
    }

    public pause(): this {
        this._raf.stop();

        this._running = false;

        this._pauseTime = window.performance.now();

        return this;
    }

    public resume(): this {
        if (this._running) {
            return this;
        }

        this._running = true;

        this._resetDelta();

        this._startTime += this._time - this._pauseTime;

        this._raf.start();

        return this;
    }

    public start(): this {
        if (this._started) {
            return this;
        }

        this._started = true;
        this._running = true;

        this._resetDelta();

        this._startTime = window.performance.now();

        this._raf.start();

        return this;
    }

    public stop(): this {
        this._started = false;

        this._raf.stop();

        return this;
    }

    public add(callback: IAnimCallback): void {
        this._callbacks.push(callback);
    }

    public remove(callback: IAnimCallback): void {
        this._callbacks.splice(this._callbacks.indexOf(callback), 1);
    }

    public destroy(): void {
        this.stop();

        this._raf.destroy();
        this._raf = null;

        this._callbacks.length = 0;
    }

    private _resetDelta(): void {
        const now = window.performance.now();

        this._time = now;
        this._lastTime = now;
        this._nextFpsUpdate = now + 1000;

        this._delta = 0;
    }

    private _updateFPS(time: number): void {
        this._nextFpsUpdate = time + 1000;
    }

    private _stepLimitFPS(time: number): void {
        this._now = performance.now();

        const delta = time - this._lastTime;

        this._time += delta;

        this._delta += delta;

        if (time >= this._nextFpsUpdate) {
            this._updateFPS(time);
        }

        if (this._delta >= this._limitRate) {
            const speedDelta = delta * this._speed;
            const speedTime = time * this._speed;

            this._callbacks.forEach((c) => c(speedTime, speedDelta));

            this._delta = 0;
        }

        this._lastTime = time;
    }

    private _step(time: number): void {
        this._now = performance.now();

        const delta = time - this._lastTime;

        this._time += delta;

        this._delta = delta;

        if (time >= this._nextFpsUpdate) {
            this._updateFPS(time);
        }

        const speedDelta = delta * this._speed;
        const speedTime = time * this._speed;

        this._callbacks.forEach((c) => c(speedTime, speedDelta));

        this._lastTime = time;
    }
}
