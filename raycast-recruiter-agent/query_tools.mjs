import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import fs from "fs";

async function run() {
  const targetUrl = new URL("https://app.kalent.ai/api/mcp");
  const transport = new SSEClientTransport(targetUrl);
  const client = new Client({ name: "test", version: "1.0" }, { capabilities: {} });
  await client.connect(transport);
  const tools = await client.listTools();
  console.log(JSON.stringify(tools, null, 2));
  process.exit(0);
}
run();
