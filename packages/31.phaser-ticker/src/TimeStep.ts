import { EventEmitter } from 'eventemitter3';

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

    public addTask(config: ITickerTaskConfig): TickerTask {
        const task = new TickerTask(config);

        task.events.on('complete', this.removeTask, this);
        task.events.on('dispose', this.removeTask, this);

        this.add(task.update);

        return task;
    }

    public removeTask(task: TickerTask): void {
        this.remove(task.update);
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

interface ITickerTaskConfig {
    delay: number;
    repeat?: number;
    speed?: number;
}

type TickerTaskEvents = {
    start: [task: TickerTask];
    repeat: [task: TickerTask];
    complete: [task: TickerTask];
    dispose: [task: TickerTask];
};

export class TickerTask {
    public events: EventEmitter<TickerTaskEvents>;
    public speed: number;
    public paused: boolean;

    private _repeat: number;
    private _remaining: number;
    private _started: boolean;
    private _config: ITickerTaskConfig;

    public constructor(config: ITickerTaskConfig) {
        const { delay, repeat = 0, speed = 1 } = config;

        this._config = config;
        this._remaining = delay;
        this._repeat = repeat;
        this._started = false;

        this.speed = speed;
        this.paused = false;
        this.events = new EventEmitter();
    }

    public get running(): boolean {
        return this._remaining > 0;
    }

    public get remaining(): number {
        return this._remaining;
    }

    public get repeat(): number {
        return this._repeat;
    }

    public pause(): void {
        this.paused = true;
    }

    public resume(): void {
        this.paused = false;
    }

    public setSpeed(value: number): void {
        this.speed = value;
    }

    public dispose(): void {
        this.events.emit('dispose', this);
        this._dispose();
    }

    public update = (time: number, dt: number): void => {
        if (this.paused || this.speed === 0) {
            return;
        }

        if (!this._started) {
            this.events.emit('start', this);
            this._started = true;
        }

        this._remaining -= dt * this.speed;

        if (this._remaining <= 0) {
            if (this._repeat === 0) {
                this._processComplete();
            } else {
                this._processRepeat();
            }
        }
    };

    private _processComplete(): void {
        this._remaining = 0;
        this.events.emit('complete', this);
        this._dispose();
    }

    private _processRepeat(): void {
        this._remaining = this._config.delay;
        this._repeat--;
        this.events.emit('repeat', this);
    }

    private _dispose(): void {
        this._remaining = 0;
        this._repeat = 0;

        this.update = NOOP;
        this.events.removeAllListeners();
    }
}
