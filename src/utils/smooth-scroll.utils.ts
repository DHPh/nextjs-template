/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
type EasingFunction = (t: number, b: number, c: number, d: number) => number;
type EasingFunctions = { [key: string]: EasingFunction };

export default function smoothScrollTo({
    elementId,
    duration = 1500,
    offset = 0,
    easing = "easeInOutQuad",
}: {
    elementId: string;
    duration?: number;
    offset?: number;
    easing?: keyof EasingFunctions;
}) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const start = window.scrollY || window.pageYOffset;
    const rectTop = element.getBoundingClientRect().top;
    const target = start + rectTop - offset;
    let startTime: number | null = null;

    const easingFunctions: EasingFunctions = {
        linear(t, b, c, d) {
            return (c * t) / d + b;
        },
        easeInOutQuad(t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        },
        easeOutQuad(t: number, b: number, c: number, d: number) {
            t /= d;
            return -c * t * (t - 2) + b;
        },
        easeInCubic(t: number, b: number, c: number, d: number) {
            t /= d;
            return c * t * t * t + b;
        },
        easeOutCubic(t: number, b: number, c: number, d: number) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        },
    };

    function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easingFunctions[easing](timeElapsed, start, target - start, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}
