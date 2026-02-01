import { describe, expect, it } from "vitest";
import { calcEstimatedStreamHours } from "@/config/pricingPlans";

describe("calcEstimatedStreamHours", () => {
  it("computes stream hours from active speech and talk ratio", () => {
    expect(calcEstimatedStreamHours(0.5, 0.2)).toBeCloseTo(2.5);
    expect(calcEstimatedStreamHours(2, 0.2)).toBeCloseTo(10);
    expect(calcEstimatedStreamHours(6, 0.2)).toBeCloseTo(30);
    expect(calcEstimatedStreamHours(20, 0.2)).toBeCloseTo(100);
    expect(calcEstimatedStreamHours(50, 0.2)).toBeCloseTo(250);
  });

  it("guards invalid input", () => {
    expect(calcEstimatedStreamHours(-1, 0.2)).toBe(0);
    expect(calcEstimatedStreamHours(1, 0)).toBe(0);
    expect(calcEstimatedStreamHours(Number.NaN, 0.2)).toBe(0);
  });
});
