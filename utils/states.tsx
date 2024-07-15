export const useTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
