import { describe, expect, it } from "vitest";
import {
  Alea,
  Arc4,
  generateColor,
  generateGradient,
  generateSecondaryColor,
  Tychei,
  Xor128,
  Xor4096,
  Xorshift7,
  Xorwow,
} from "../src";
import type { ColorOptions } from "../src";

const hslaRegex =
  /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i;

describe("Both generateColor() and generateSecondaryColor() should not return null", () => {
  it("generateColor()", () => {
    expect(generateColor("test")).not.toBe(null);
  });
  it("generateSecondaryColor()", () => {
    expect(generateSecondaryColor("test")).not.toBe(null);
  });
});

describe("Same input should produce the same color", () => {
  it("generateColor()", () => {
    expect(generateColor("test")).toBe(generateColor("test"));
  });
  it("generateSecondaryColor()", () => {
    expect(generateSecondaryColor("test")).toBe(generateSecondaryColor("test"));
  });
});

describe("Same input and options should produce the same color", () => {
  it("generateColor()", () => {
    expect(generateColor("test", { s: 50 })).toBe(
      generateColor("test", { s: 50 })
    );
  });
  it("generateSecondaryColor()", () => {
    expect(generateSecondaryColor("test", { s: 50 })).toBe(
      generateSecondaryColor("test", { s: 50 })
    );
  });
});

describe("Different inputs should produce different colors", () => {
  it("generateColor()", () => {
    expect(generateColor("test")).not.toBe(generateColor("test2"));
  });
  it("generateSecondaryColor()", () => {
    expect(generateSecondaryColor("test")).not.toBe(
      generateSecondaryColor("test2")
    );
  });
});

describe("Different algorithms should produce different colors", () => {
  it("generateColor()", () => {
    expect(generateColor("test")).not.toBe(
      generateColor("test", { algorithm: Xorwow })
    );
  });
  it("generateSecondaryColor()", () => {
    expect(generateSecondaryColor("test")).not.toBe(
      generateSecondaryColor("test", { algorithm: Xor128 })
    );
  });
});

describe("Different options should produce different colors", () => {
  it("generateColor()", () => {
    expect(generateColor("test")).not.toBe(
      generateColor("test", { saturation: 50 })
    );
  });
  it("generateSecondaryColor()", () => {
    expect(generateSecondaryColor("test")).not.toBe(
      generateSecondaryColor("test", { saturation: 50 })
    );
  });
});

describe("Returns a valid HSLA color string", async () => {
  it("generateColor()", () => {
    const color = generateColor("test");
    const isValidHsla = hslaRegex.test(color);
    expect(isValidHsla).toBe(true);
  });
  it("generateSecondaryColor()", () => {
    const color = generateSecondaryColor("test");
    const isValidHsla = hslaRegex.test(color);
    expect(isValidHsla).toBe(true);
  });
});

describe("Honors the options passed in", () => {
  const testCases: ColorOptions[] = [
    { saturation: 25, lightness: 50, alpha: 75 },
    { saturation: 0, lightness: 0, alpha: 0 },
    { saturation: 100, lightness: 100, alpha: 100 },
  ];

  testCases.forEach((testCase) => {
    it("generateColor()", () => {
      const color = generateColor("test", testCase);
      const [, h, s, l, a] = hslaRegex.exec(color) ?? [];
      expect(s).toBe(String(testCase.saturation));
      expect(l).toBe(String(testCase.lightness));
      expect(a).toBe(String(testCase.alpha));
    });

    it("generateSecondaryColor()", () => {
      const color = generateSecondaryColor("test", testCase);
      const [, h, s, l, a] = hslaRegex.exec(color) ?? [];
      expect(s).toBe(String(testCase.saturation));
      expect(l).toBe(String(testCase.lightness));
      expect(a).toBe(String(testCase.alpha));
    });
  });
});

describe("Honors the options passed in, short hand", () => {
  const testCases: ColorOptions[] = [
    { s: 25, l: 50, a: 75 },
    { s: 0, l: 0, a: 0 },
    { s: 100, l: 100, a: 100 },
  ];

  testCases.forEach((testCase) => {
    it("generateColor()", () => {
      const color = generateColor("test", testCase);
      const [, h, s, l, a] = hslaRegex.exec(color) ?? [];
      expect(s).toBe(String(testCase.s));
      expect(l).toBe(String(testCase.l));
      expect(a).toBe(String(testCase.a));
    });

    it("generateSecondaryColor()", () => {
      const color = generateSecondaryColor("test", testCase);
      const [, h, s, l, a] = hslaRegex.exec(color) ?? [];
      expect(s).toBe(String(testCase.s));
      expect(l).toBe(String(testCase.l));
      expect(a).toBe(String(testCase.a));
    });
  });
});

describe("Returns a gradient", () => {
  it("generateGradient()", () => {
    const gradient = generateGradient("test");
    expect(gradient).not.toBe(null);
  });
});

describe("Returns a valid CSS gradient", () => {
  it("generateGradient()", () => {
    const gradient = generateGradient("test");
    expect(gradient).toMatch(/^linear-gradient\(/);
  });
});

describe("All algorithms work", () => {
  it("generateColor()", () => {
    const algorithms = [Alea, Arc4, Tychei, Xor128, Xor4096, Xorshift7, Xorwow];
    algorithms.forEach((algorithm) => {
      expect(generateColor("test", { algorithm })).not.toBe(null);
    });
  });
  it("generateSecondaryColor()", () => {
    const algorithms = [Alea, Arc4, Tychei, Xor128, Xor4096, Xorshift7, Xorwow];
    algorithms.forEach((algorithm) => {
      expect(generateSecondaryColor("test", { algorithm })).not.toBe(null);
    });
  });
});
