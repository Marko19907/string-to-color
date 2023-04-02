declare module "esm-seedrandom" {
  interface SeedRandom {
    (seed?: string, options?: { entropy?: boolean }): () => number;
    alea(seed?: string): () => number;
    xor128(seed?: string): () => number;
    xorwow(seed?: string): () => number;
    xorshift7(seed?: string): () => number;
    xor4096(seed?: string): () => number;
    tychei(seed?: string): () => number;
  }

  const seedrandom: SeedRandom;

  export function prng_arc4(seed?: string): () => number;

  export function prng_alea(seed?: string): () => number;

  export function prng_xor128(seed?: string): () => number;

  export function prng_xorwow(seed?: string): () => number;

  export function prng_xorshift7(seed?: string): () => number;

  export function prng_xor4096(seed?: string): () => number;

  export function prng_tychei(seed?: string): () => number;

  export default seedrandom;
}
