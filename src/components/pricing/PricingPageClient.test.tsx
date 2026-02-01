import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPageClient from "@/components/pricing/PricingPageClient";

// PricingPageClient uses next/navigation router; mock minimal push.
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("PricingPageClient", () => {
  it("renders expected 20% talk ratio estimates", () => {
    render(<PricingPageClient />);

    // Default talk ratio is 20%, so Starter 0.5h => 2.5h.
    expect(screen.getByText(/≈ 2\.5h stream at 20% talk ratio/i)).toBeInTheDocument();

    // Scale 50h => 250h.
    expect(screen.getByText(/≈ 250h stream at 20% talk ratio/i)).toBeInTheDocument();
  });
});
