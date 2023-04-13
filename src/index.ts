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

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

type Either<T, U> = Only<T, U> | Only<U, T>;

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type ColorRange = IntRange<0, 101>;

type Saturation = Either<
  {
    /**
     * Short form of the saturation property, range must be between 0 and 100, inclusive.
     */
    s?: ColorRange;
  },
  {
    /**
     * Long form of the saturation property, range must be between 0 and 100, inclusive.
     */
    saturation?: ColorRange;
  }
>;

type Lightness = Either<
  {
    /**
     * Short form of the lightness property, range must be between 0 and 100, inclusive.
     */
    l?: ColorRange;
  },
  {
    /**
     * Long form of the lightness property, range must be between 0 and 100, inclusive.
     */
    lightness?: ColorRange;
  }
>;

type Alpha = Either<
  {
    /**
     * Short form of the alpha property, range must be between 0 and 100, inclusive.
     */
    a?: ColorRange;
  },
  {
    /**
     * Long form of the alpha property, range must be between 0 and 100, inclusive.
     */
    alpha?: ColorRange;
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
  options: ColorOptions = {}
): string {
  const {
    s,
    l,
    a,
    saturation = s || defaultColorOptions.saturation,
    lightness = l || defaultColorOptions.lightness,
    alpha = a || defaultColorOptions.alpha,
  } = options;
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
  const {
    s,
    l,
    a,
    saturation = s || defaultColorOptions.saturation,
    lightness = l || defaultColorOptions.lightness,
    alpha = a || defaultColorOptions.alpha,
  } = options;
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
  return `linear-gradient(
    ${angle}deg,
    ${generateColor(input, options)},
    ${generateSecondaryColor(input, secondaryOptions)}
  )`;
}
