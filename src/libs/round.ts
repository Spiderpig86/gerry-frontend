/**
 * Given a number, round the value.
 *
 * @param number - the number to round.
 */
export function round(number: number): string | number {
    return !number ? 'N/A' : Math.round(number);
}