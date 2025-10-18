// A simple helper function to add an alpha channel to a hex color
export const transparentize = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha > 1) {
        alpha = 1;
    } else if (alpha < 0) {
        alpha = 0;
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
