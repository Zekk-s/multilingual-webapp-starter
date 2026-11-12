import { describe, expect, it } from "vitest";
import { picks, serviceIds, serviceStatus } from "./catalog";

describe("catalog", () => {
  it("gives every service a status", () => {
    for (const id of serviceIds) {
      expect(["live", "partial", "off"]).toContain(serviceStatus[id]);
    }
  });

  it("lists five distinct repos and installs only next-intl", () => {
    const repos = picks.map((pick) => pick.repo);
    expect(new Set(repos).size).toBe(picks.length);
    expect(picks.filter((pick) => pick.inRepo).map((pick) => pick.repo)).toEqual([
      "amannn/next-intl",
    ]);
  });
});
