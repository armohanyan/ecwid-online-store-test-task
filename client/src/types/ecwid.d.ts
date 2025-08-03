export {}

declare global {
    interface Window {
        Ecwid?: {
            init: () => void,
            Cart?: {
                addProduct: (id: number) => void
            },
            OnPageLoad: {
                add: (callback: () => void) => void
            }
            OnPageLoaded: {
                add: (callback: (page: { type: string }) => void) => void
            }
        }
        xProductBrowser: (...args: string[]) => void;
    }
}
