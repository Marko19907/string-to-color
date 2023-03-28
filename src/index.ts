import seedrandom from "seedrandom";

const PHI = 1.618033988749895;

export interface ColorOptions {
  saturation?: number;
  lightness?: number;
  alpha?: number;
}

export const defaultColorOptions: ColorOptions = {
  saturation: 75,
  lightness: 50,
  alpha: 100,
};

/**
 * Generates a random color from the given string, saturation and lightness can be controlled.
 * Inspired by https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 */
export function generateColor(
  input: string,
  options: ColorOptions = {}
): string {
  const mergedOptions: ColorOptions = { ...defaultColorOptions, ...options };
  return `hsl(
    ${Math.floor(((seedrandom.xor128(input)() + 1 / PHI) % 1) * 360)}
    , ${mergedOptions.saturation}%, ${mergedOptions.lightness}%, ${
    mergedOptions.alpha
  }%
  )`;
}

/**
 * Same as generateColor() but with a different algorithm that produces a different color.
 */
export function generateSecondaryColor(
  input: string,
  options: ColorOptions = {}
): string {
  const mergedOptions: ColorOptions = { ...defaultColorOptions, ...options };
  return `hsl(
    ${Math.floor(((seedrandom.xorwow(input)() + 1 / PHI) % 1) * 360)}
    , ${mergedOptions.saturation}%, ${mergedOptions.lightness}%, ${
    mergedOptions.alpha
  }%
  )`;
}

export function generateGradient(
  input: string,
  angle = 45,
  options: ColorOptions = {},
  secondaryOptions: ColorOptions = {}
): string {
  const mergedOptions: ColorOptions = { ...defaultColorOptions, ...options };
  const mergedSecondaryOptions: ColorOptions = {
    ...defaultColorOptions,
    ...secondaryOptions,
  };
  return `linear-gradient(
    ${angle}deg,
    ${generateColor(input, mergedOptions)},
    ${generateSecondaryColor(input, mergedSecondaryOptions)}
  )`;
}
