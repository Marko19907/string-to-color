import {
  prng_alea,
  prng_arc4,
  prng_tychei,
  prng_xor128,
  prng_xor4096,
  prng_xorshift7,
  prng_xorwow,
} from "esm-seedrandom";

export type Algo = (seed: string) => number;

/**
 * The Alea PRNG algorithm, based on a simple multiplicative congruential generator.
 * It is very fast (★★★★★) and has a good balance between simplicity and statistical properties.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Alea: Algo = (seed) => prng_alea(seed)();

/**
 * The Arc4 (Alleged RC4) PRNG algorithm, based on a stream cipher.
 * It is slow (★★☆☆☆) and generates random numbers with good statistical properties but has been considered cryptographically insecure.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Arc4: Algo = (seed) => prng_arc4(seed)();

/**
 * The Tychei PRNG algorithm, based on a variant of the Xorshift family.
 * It is fast (★★★★☆) and has good statistical properties.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Tychei: Algo = (seed) => prng_tychei(seed)();

/**
 * The Xor128 PRNG algorithm, based on the Xorshift family.
 * It is very fast (★★★★★), simple, and statistically good but has a relatively small state space.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Xor128: Algo = (seed) => prng_xor128(seed)();

/**
 * The Xor4096 PRNG algorithm, based on the Xorshift family.
 * It is fast (★★★★☆) and has a larger state space than Xor128, making it more suitable for applications requiring more randomness.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Xor4096: Algo = (seed) => prng_xor4096(seed)();

/**
 * The Xorshift7 PRNG algorithm, based on the Xorshift family.
 * Somewhat slower than others (★★★☆☆), has good statistical properties, and a larger state space than Xor128.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Xorshift7: Algo = (seed) => prng_xorshift7(seed)();

/**
 * The Xorwow PRNG algorithm, a combination of a linear feedback shift register and Xorshift.
 * It is fast (★★★★☆), simple, and has good statistical properties.
 * @param seed - The input seed string.
 * @returns The next random number in the sequence.
 */
export const Xorwow: Algo = (seed) => prng_xorwow(seed)();
