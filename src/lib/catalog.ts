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
  ci: "partial",
  env: "off",
};

export const picks = [
  {
    id: "nextIntl",
    repo: "amannn/next-intl",
    href: "https://github.com/amannn/next-intl",
    stars: 4391,
    inRepo: true,
  },
  {
    id: "mcpServers",
    repo: "modelcontextprotocol/servers",
    href: "https://github.com/modelcontextprotocol/servers",
    stars: 91951,
    inRepo: false,
  },
  {
    id: "context7",
    repo: "upstash/context7",
    href: "https://github.com/upstash/context7",
    stars: 64683,
    inRepo: false,
  },
  {
    id: "githubMcp",
    repo: "github/github-mcp-server",
    href: "https://github.com/github/github-mcp-server",
    stars: 34413,
    inRepo: false,
  },
  {
    id: "shadcn",
    repo: "shadcn-ui/ui",
    href: "https://github.com/shadcn-ui/ui",
    stars: 128000,
    inRepo: false,
  },
] as const;

export type PickId = (typeof picks)[number]["id"];
