const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { SSEClientTransport } = require("@modelcontextprotocol/sdk/client/sse.js");
async function run() {
  const transport = new SSEClientTransport(new URL("https://app.kalent.ai/api/mcp"));
  const client = new Client({ name: "test", version: "1.0" }, { capabilities: {} });
  await client.connect(transport);
  const tools = await client.listTools();
  console.log(JSON.stringify(tools, null, 2));
  process.exit(0);
}
run();
