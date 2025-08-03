declare module 'process' {
    export function nextTick(callback: () => void): void;
}
