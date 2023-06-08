import * as core from "@actions/core";
import { exec } from "@actions/exec";

async function main() {
  try {
    const apiKey = core.getInput("apiKey");
    const application = core.getInput("application");
    const testApplication = core.getInput("testApplication");
    const link = core.getInput("link");
    const output = core.getInput("output");

    const args = [
      "-api-key",
      apiKey,
      "-apk",
      application,
      "-testapk",
      testApplication,
    ];

    if (output) {
      args.push("-o", output);
    }

    if (link) {
      args.push("-link", link);
    }

    await exec("marathon-cloud", args);
  } catch (e: any) {
    core.warning(`marathon-cloud invoke failed: ${e}`);
    core.setFailed(e);
  }
}

try {
  main();
} catch (e) {
  core.setFailed((e as { message: string }).message);
}
