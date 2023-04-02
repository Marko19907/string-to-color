import { Algo, Xor128, Xorwow } from "./generators";

export {
  Algo,
  Alea,
  Arc4,
  Tychei,
  Xor128,
  Xor4096,
  Xorshift7,
  Xorwow,
} from "./generators";

const PHI = 1.618033988749895;

export interface ColorOptions {
  algorithm?: Algo;
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
 * @param input The input to generate the color from
 * @param options The custom options to use for the color generation
 */
export function generateColor(
  input: string,
  options: ColorOptions = {}
): string {
  const { alpha, lightness, saturation }: ColorOptions = {
    ...defaultColorOptions,
    ...options,
  };
  const algorithm = options.algorithm || Xor128;
  return `hsl(
    ${Math.floor(((algorithm(input) + 1 / PHI) % 1) * 360)}
    , ${saturation}%, ${lightness}%, ${alpha}%
  )`;
}

/**
 * Same as generateColor() but with a different default algorithm that produces a different color.
 * @param input The input to generate the color from
 * @param options The custom options to use for the color generation
 */
export function generateSecondaryColor(
  input: string,
  options: ColorOptions = {}
): string {
  const { alpha, lightness, saturation }: ColorOptions = {
    ...defaultColorOptions,
    ...options,
  };
  const algorithm = options.algorithm || Xorwow;
  return `hsl(
    ${Math.floor(((algorithm(input) + 1 / PHI) % 1) * 360)}
    , ${saturation}%, ${lightness}%, ${alpha}%
  )`;
}

/**
 * Generates a linear gradient from the given input.
 * @param input The input to generate the gradient from
 * @param angle The angle of the gradient
 * @param options The custom options to use for the color generation of the primary color
 * @param secondaryOptions The custom options to use for the color generation of the secondary color
 */
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
