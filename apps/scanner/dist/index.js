var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
import { WorkflowEntrypoint, WorkerEntrypoint } from "cloudflare:workers";
var ScanWorkflow = class extends WorkflowEntrypoint {
  static {
    __name(this, "ScanWorkflow");
  }
  async run(event, step) {
    const { github_url } = event.payload;
    const validation = await step.do("validate-github-url", async () => {
      console.log(`[Step 1] Validating GitHub URL: ${github_url}`);
      return { valid: true, github_url };
    });
    const metadata = await step.do("fetch-repo-metadata", async () => {
      console.log(`[Step 2] Fetching repo metadata for: ${github_url}`);
      return { stars: 0, author: "", last_commit: "" };
    });
    const source = await step.do("fetch-source-files", async () => {
      console.log(`[Step 3] Fetching source files from: ${github_url}`);
      return { files: [] };
    });
    const analysis = await step.do("analyze-with-haiku", async () => {
      console.log("[Step 4] Analyzing with Claude Haiku");
      return { tools: [], findings: [] };
    });
    const score = await step.do("compute-trust-score", async () => {
      console.log("[Step 5] Computing trust score");
      return { trust_score: 0, grade: "C" };
    });
    await step.do("store-results", async () => {
      console.log("[Step 6] Storing results in Supabase");
      return { stored: true };
    });
    console.log(`[Done] Scan complete for: ${github_url}`);
    return { github_url, ...score };
  }
};
var Scanner = class extends WorkerEntrypoint {
  static {
    __name(this, "Scanner");
  }
  async fetch(request) {
    if (request.method === "POST") {
      const { github_url } = await request.json();
      const instance = await this.env.SCAN_WORKFLOW.create({
        params: { github_url }
      });
      return Response.json({
        id: instance.id,
        status: await instance.status()
      });
    }
    return new Response("plug-scanner worker", { status: 200 });
  }
  async createScan(github_url) {
    const instance = await this.env.SCAN_WORKFLOW.create({
      params: { github_url }
    });
    return {
      id: instance.id,
      status: await instance.status()
    };
  }
  async getScanStatus(instanceId) {
    const instance = await this.env.SCAN_WORKFLOW.get(instanceId);
    return instance.status();
  }
};
export {
  ScanWorkflow,
  Scanner as default
};
//# sourceMappingURL=index.js.map
