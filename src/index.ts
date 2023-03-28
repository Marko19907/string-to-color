import seedrandom from "seedrandom";

const PHI = 1.618033988749895;

/**
 * Generates a random color from the given string, saturation and lightness can be controlled.
 * Inspired by https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 */
export function generateColor(input: string, saturation = 85, lightness = 50): string {
  return `hsl(
    ${Math.floor(((seedrandom.xor128(input)() + 1 / PHI) % 1) * 360)}
    , ${saturation}%, ${lightness}%
  )`;
}

/**
 * Same as generateColor() but with a different algorithm that produces a different color.
 */
export function generateSecondaryColor(
    input: string,
    saturation = 85,
    lightness = 25
): string {
  return `hsl(
    ${Math.floor(((seedrandom.xorwow(input)() + 1 / PHI) % 1) * 360)}
    , ${saturation}%, ${lightness}%
  )`;
}
