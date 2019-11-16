export function round(number: number): string | number {
    return !number ? 'N/A' : Math.round(number);
}