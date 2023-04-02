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

export const Alea: Algo = (seed) => prng_alea(seed)();

export const Arc4: Algo = (seed) => prng_arc4(seed)();

export const Tychei: Algo = (seed) => prng_tychei(seed)();

export const Xor128: Algo = (seed) => prng_xor128(seed)();

export const Xor4096: Algo = (seed) => prng_xor4096(seed)();

export const Xorshift7: Algo = (seed) => prng_xorshift7(seed)();

export const Xorwow: Algo = (seed) => prng_xorwow(seed)();
