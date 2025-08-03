export function useEcwidLoader() {
    const waitForEcwidReady = (callback: () => void) => {
        const check = () => {
            if (window.Ecwid?.OnPageLoad) {
                window.Ecwid.OnPageLoad.add(callback)
            } else {
                setTimeout(check, 500)
            }
        }

        check()
    }

    return {
        waitForEcwidReady,
    }
}
