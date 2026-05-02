import { WorkflowEntrypoint, WorkerEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";

type ScanParams = {
  github_url: string;
};

interface Env {
  SCAN_WORKFLOW: Workflow;
}

export class ScanWorkflow extends WorkflowEntrypoint<Env, ScanParams> {
  async run(event: WorkflowEvent<ScanParams>, step: WorkflowStep) {
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
      return { files: [] as string[] };
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
}

export default class Scanner extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    if (request.method === "POST") {
      const { github_url } = (await request.json()) as ScanParams;

      const instance = await this.env.SCAN_WORKFLOW.create({
        params: { github_url },
      });

      return Response.json({
        id: instance.id,
        status: await instance.status(),
      });
    }

    return new Response("plug-scanner worker", { status: 200 });
  }

  async createScan(github_url: string) {
    const instance = await this.env.SCAN_WORKFLOW.create({
      params: { github_url },
    });

    return {
      id: instance.id,
      status: await instance.status(),
    };
  }

  async getScanStatus(instanceId: string) {
    const instance = await this.env.SCAN_WORKFLOW.get(instanceId);
    return instance.status();
  }
}
