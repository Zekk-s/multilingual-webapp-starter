export const serviceIds = [
  "routing",
  "messages",
  "switcher",
  "parity",
  "types",
  "lint",
  "tests",
  "build",
  "metadata",
  "ci",
  "env",
] as const;

export type ServiceId = (typeof serviceIds)[number];
export type Status = "live" | "partial" | "off";

export const serviceStatus: Record<ServiceId, Status> = {
  routing: "live",
  messages: "live",
  switcher: "live",
  parity: "live",
  types: "live",
  lint: "live",
  tests: "partial",
  build: "live",
  metadata: "partial",
  ci: "live",
  env: "off",
};
