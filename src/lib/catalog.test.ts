import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { picks, serviceIds, serviceStatus } from "./catalog";

const textValues = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(textValues);
  }
  return [];
};

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

  it("keeps angle brackets out of message strings", () => {
    const messages = join(process.cwd(), "src", "messages");
    for (const locale of readdirSync(messages)) {
      const file = join(messages, locale, "common.json");
      const data: unknown = JSON.parse(readFileSync(file, "utf8"));
      for (const value of textValues(data)) {
        expect(value.includes("<"), `${locale}: ${value}`).toBe(false);
      }
    }
  });
});
