import { Algo, Xor128, Xorwow } from "./generators";
import { hslToRgb } from "./color-conversion-algorithms";

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

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

type Either<T, U> = Only<T, U> | Only<U, T>;

type Saturation = Either<
  {
    /**
     * Short form of the saturation property, range must be between 0 and 100, inclusive.
     */
    s?: number;
  },
  {
    /**
     * Long form of the saturation property, range must be between 0 and 100, inclusive.
     */
    saturation?: number;
  }
>;

type Lightness = Either<
  {
    /**
     * Short form of the lightness property, range must be between 0 and 100, inclusive.
     */
    l?: number;
  },
  {
    /**
     * Long form of the lightness property, range must be between 0 and 100, inclusive.
     */
    lightness?: number;
  }
>;

type Alpha = Either<
  {
    /**
     * Short form of the alpha property, range must be between 0 and 100, inclusive.
     */
    a?: number;
  },
  {
    /**
     * Long form of the alpha property, range must be between 0 and 100, inclusive.
     */
    alpha?: number;
  }
>;

/**
 * The options for the color generation.
 * It is possible to use the short form of the options (s, l, a) or the long form (saturation, lightness, alpha),
 * but not both at the same time. If both are present, the full property name takes precedence. Range must be between 0 and 100, inclusive.
 */
export type ColorOptions = {
  /**
   * The algorithm to use for the color generation.
   */
  algorithm?: Algo;
} & Saturation &
  Lightness &
  Alpha;

export const defaultColorOptions: ColorOptions = {
  saturation: 75,
  lightness: 50,
  alpha: 100,
};

const PHI = 1.618033988749895;

/**
 * Generates a random color from the given string, saturation and lightness can be controlled.
 * Inspired by https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 * @param input The input to generate the color from
 * @param options The custom options to use for the color generation
 */
export function generateColor(
  input: string,
  options: ColorOptions = {},
): string {
  const { saturation, lightness, alpha } = getOptions(options);
  const algorithm = options.algorithm || Xor128;
  const h = calculateHue(input, algorithm);
  return `hsl(
    ${Math.floor(h * 360)}
    , ${saturation}%, ${lightness}%, ${alpha}%
  )`;
}

/**
 * Generates a random color from the given string in the RGB format, same as {@link generateColor} but in the RGB format.
 * @param input The input string to generate the color from
 * @param options The custom options to use for the color generation
 * @returns The generated color in the RGB format
 */
export function generateColorRGB(
  input: string,
  options: ColorOptions = {},
): string {
  const { saturation, lightness, alpha } = getOptions(options);
  const algorithm = options.algorithm || Xor128;
  const h = calculateHue(input, algorithm);
  const [r, g, b] = hslToRgb(h, saturation! / 100, lightness! / 100);
  return `rgba(${r}, ${g}, ${b}, ${alpha! / 100})`;
}

/**
 * Same as generateColor() but with a different default algorithm that produces a different color.
 * @param input The input to generate the color from
 * @param options The custom options to use for the color generation
 */
export function generateSecondaryColor(
  input: string,
  options: ColorOptions = {},
): string {
  const { saturation, lightness, alpha } = getOptions(options);
  const algorithm = options.algorithm || Xorwow;
  const h = calculateHue(input, algorithm);
  return `hsl(
    ${Math.floor(h * 360)}
    , ${saturation}%, ${lightness}%, ${alpha}%
  )`;
}

/**
 * Same as {@link generateColorRGB} but with a different default algorithm that produces a different color.
 * @param input The input to generate the color from
 * @param options The custom options to use for the color generation
 */
export function generateSecondaryColorRGB(
  input: string,
  options: ColorOptions = {},
): string {
  const { saturation, lightness, alpha } = getOptions(options);
  const algorithm = options.algorithm || Xor128;
  const h = calculateHue(input, algorithm);
  const [r, g, b] = hslToRgb(h, saturation! / 100, lightness! / 100);
  return `rgba(${r}, ${g}, ${b}, ${alpha! / 100})`;
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
  secondaryOptions: ColorOptions = {},
): string {
  return `linear-gradient(
    ${angle}deg,
    ${generateColor(input, options)},
    ${generateSecondaryColor(input, secondaryOptions)}
  )`;
}

/**
 * Extracts the saturation, lightness, and alpha values from the given options and fills in the missing values with the default values.
 * @param options The options to extract the values from
 * @returns An object containing the extracted saturation, lightness, and alpha values
 */
function getOptions(options: ColorOptions = {}) {
  const {
    s,
    l,
    a,
    saturation = s ?? defaultColorOptions.saturation,
    lightness = l ?? defaultColorOptions.lightness,
    alpha = a ?? defaultColorOptions.alpha,
  } = options;
  return { saturation, lightness, alpha };
}

/**
 * Calculates the hue for a given input string.
 * @param input The input string to calculate the hue for
 * @param algorithm The algorithm to use for the calculation
 * @returns The calculated hue
 */
function calculateHue(input: string, algorithm: Algo): number {
  return (algorithm(input) + 1 / PHI) % 1;
}
