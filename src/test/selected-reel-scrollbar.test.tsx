import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PortfolioSection from "@/components/PortfolioSection";

describe("Selected work reel scrollbar", () => {
  it("renders a draggable scrollbar under the reel", () => {
    render(<PortfolioSection />);
    expect(document.querySelector(".selected-reel-scrollbar")).not.toBeNull();
    expect(document.querySelector(".selected-reel-thumb")).not.toBeNull();
  });

  it("keeps the reel scrollable so visitors can move through the works", () => {
    render(<PortfolioSection />);
    const viewport = document.querySelector(".selected-reel-viewport");
    expect(viewport).not.toBeNull();
    expect(viewport?.classList.contains("selected-reel-viewport")).toBe(true);
  });

  it("hides the duplicated track copy from keyboard navigation", () => {
    render(<PortfolioSection />);
    const groups = document.querySelectorAll(".selected-reel-group");
    expect(groups).toHaveLength(2);
    expect(groups[1].getAttribute("aria-hidden")).toBe("true");
    const duplicateButtons = groups[1].querySelectorAll("button");
    expect(duplicateButtons.length).toBeGreaterThan(0);
    duplicateButtons.forEach((button) => {
      expect(button.tabIndex).toBe(-1);
    });
  });

  it("pauses the roll when the cursor is over the pictures or the scrollbar", () => {
    const bound: string[] = [];
    const original = Element.prototype.addEventListener;
    function spy(
      this: Element,
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) {
      if (type === "pointerenter" || type === "pointerleave") {
        bound.push(`${this.getAttribute("class") ?? ""}:${type}`);
      }
      original.call(this, type, listener, options);
    }
    Element.prototype.addEventListener =
      spy as unknown as typeof Element.prototype.addEventListener;
    try {
      render(<PortfolioSection />);
    } finally {
      Element.prototype.addEventListener = original;
    }
    // Bound to the reel wrapper, which holds both the pictures and the bar,
    // so hovering either one stops the roll.
    expect(bound).toContain("selected-reel:pointerenter");
    expect(bound).toContain("selected-reel:pointerleave");
  });
});
