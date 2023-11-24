import type { RGBA, XY, b2Draw, b2World } from '@box2d/core';
import { DrawAABBs, DrawCenterOfMasses, DrawJoints, DrawPairs, DrawShapes, b2Color, b2Transform } from '@box2d/core';
import type { Graphics } from 'pixi.js';
import type { ITestbedOptions } from './types';
import { addVector, colorToString, nope, rotateVector } from './utils';

let LINE_WIDTH = 0;

export class Box2dDraw implements b2Draw {
    protected gr!: Graphics;
    protected tr!: b2Transform;

    public Prepare(gr: Graphics, scale = 1, resolution: number, drawConfig: ITestbedOptions = { shapes: true }): void {
        this.tr = new b2Transform();

        this.gr = gr;
        this.gr.setTransform(gr.x, gr.y, scale, -scale);

        const { shapes, joints, pairs, aabbs, massCenters, particles } = drawConfig;

        !shapes && (this._drawShapes = nope);
        !joints && (this._drawJoints = nope);
        !pairs && (this._drawPairs = nope);
        !aabbs && (this._drawAABBs = nope);
        !massCenters && (this._drawCenterOfMasses = nope);
        !particles && (this._drawParticleSystems = nope);

        LINE_WIDTH = (1 / scale) * resolution;
    }

    public Update(world: b2World): void {
        this.gr.clear();

        this._drawShapes(world);
        this._drawJoints(world);
        this._drawPairs(world);
        this._drawAABBs(world);
        this._drawCenterOfMasses(world);
        this._drawParticleSystems(world);
    }

    public PushTransform(xf: b2Transform): void {
        this.tr.p.Set(xf.p.x, xf.p.y);
        this.tr.q.Set(xf.q.GetAngle());
    }

    public PopTransform(xf: b2Transform): void {
        this.tr.p.Set(0, 0);
        this.tr.q.Set(0);
    }

    public DrawTransform(xf: b2Transform): void {
        this.PushTransform(xf);

        const { gr, tr } = this;
        const { p, q } = tr;
        const { x, y } = p;
        const { c, s } = q;

        const { x: x1, y: y1 } = addVector(p, rotateVector({ x: 1, y: 0 }, c, -s));
        const { x: x2, y: y2 } = addVector(p, rotateVector({ x: 0, y: 1 }, c, -s));

        gr.lineStyle(LINE_WIDTH, colorToString(b2Color.RED, 1));
        gr.moveTo(x, y);
        gr.lineTo(x1, y1);

        gr.lineStyle(LINE_WIDTH, colorToString(b2Color.GREEN, 1));
        gr.moveTo(x, y);
        gr.lineTo(x2, y2);

        this.PopTransform(xf);
    }

    public DrawSegment(p1: XY, p2: XY, color: RGBA): void {
        const { gr, tr } = this;
        const { p, q } = tr;

        const { x: x1, y: y1 } = addVector(p, rotateVector(p1, q.c, -q.s));
        const { x: x2, y: y2 } = addVector(p, rotateVector(p2, q.c, -q.s));

        gr.lineStyle(LINE_WIDTH, colorToString(color));
        gr.moveTo(x1, y1);
        gr.lineTo(x2, y2);

        gr.lineStyle(0, 0xffffff);
    }

    public DrawPolygon(vertices: XY[], vertexCount: number, color: RGBA): void {
        const { gr } = this;

        gr.lineStyle(LINE_WIDTH, colorToString(color));
        for (let i = 0; i < vertices.length; ++i) {
            const { x: xi, y: yi } = vertices[i];
            if (i === 0) {
                gr.moveTo(xi, yi);
            }
            gr.lineTo(xi, yi);
        }
        gr.closePath();
    }

    public DrawSolidPolygon(vertices: XY[], vertexCount: number, color: RGBA): void {
        const { gr, tr } = this;
        const { p, q } = tr;

        gr.lineStyle(LINE_WIDTH, colorToString(color));
        gr.beginFill(colorToString(color), 0.5);

        for (let i = 0; i < vertices.length; ++i) {
            const { x: xi, y: yi } = addVector(p, rotateVector(vertices[i], q.c, -q.s));

            if (i === 0) {
                gr.moveTo(xi, yi);
            } else {
                gr.lineTo(xi, yi);
            }
        }

        gr.closePath();
        gr.endFill();
    }

    public DrawCircle(center: XY, radius: number, color: RGBA): void {
        const { gr, tr } = this;
        const { p, q } = tr;
        const { x, y } = addVector(p, rotateVector(center, q.c, -q.s));

        gr.lineStyle(LINE_WIDTH, colorToString(color));
        gr.drawCircle(x, y, radius);
    }

    public DrawSolidCircle(center: XY, radius: number, axis: XY, color: RGBA): void {
        const { gr, tr } = this;
        const { p, q } = tr;
        const { x, y } = addVector(p, rotateVector(center, q.c, -q.s));

        gr.beginFill(colorToString(color), 0.5);

        gr.lineStyle(LINE_WIDTH, colorToString(color));
        gr.drawCircle(x, y, radius);

        gr.moveTo(x, y);
        gr.lineTo(x + radius * q.c, y + radius * q.s);

        gr.endFill();
    }

    public DrawPoint(p0: XY, size: number, color: RGBA): void {
        const { gr, tr } = this;
        const { p, q } = tr;
        const { x, y } = addVector(p, rotateVector(p0, q.c, -q.s));

        const s = size * LINE_WIDTH * 0.8;
        const hs = s * 0.5;

        gr.beginFill(colorToString(color));
        gr.drawRect(x - hs, y - hs, s, s);
        gr.endFill();

        gr.lineStyle(0, 0xffffff);
    }

    public DrawParticles(centers: XY[], radius: number, colors: RGBA[] | null, count: number): void {
        console.info('DrawParticles: Method not implemented');
    }

    private _drawShapes(world: b2World): void {
        DrawShapes(this, world);
    }

    private _drawPairs(world: b2World): void {
        DrawPairs(this, world);
    }

    private _drawJoints(world: b2World): void {
        DrawJoints(this, world);
    }

    private _drawCenterOfMasses(world: b2World): void {
        DrawCenterOfMasses(this, world);
    }

    private _drawAABBs(world: b2World): void {
        DrawAABBs(this, world);
    }

    private _drawParticleSystems(world: b2World): void {
        console.log('draw particle system');

        // import { DrawParticleSystems } from '@box2d/particles';
        // DrawParticleSystems(this, world);
    }
}
