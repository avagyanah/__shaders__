export const getElementById = <T extends HTMLElement>(id: string): T => {
    return <T>document.getElementById(id);
};

export function getResolution(): number {
    return window.devicePixelRatio;
}
