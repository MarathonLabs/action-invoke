import * as core from "@actions/core";
import { exec } from "@actions/exec";

async function main() {
  try {
    const apiKey = core.getInput("apiKey");
    const application = core.getInput("application");
    const testApplication = core.getInput("testApplication");
    const platform = core.getInput("platform");
    const link = core.getInput("link");
    const output = core.getInput("output");
    const osVersion = core.getInput("osVersion");
    const systemImage = core.getInput("systemImage");
    const isolated = core.getInput("isolated");

    const args = [
      "-api-key",
      apiKey,
      "-app",
      application,
      "-testapp",
      testApplication,
      "-platform",
      platform,
    ];

    if (output) {
      args.push("-o", output);
    }

    if (link) {
      args.push("-link", link);
    }

    if (osVersion) {
      args.push("-os-version", osVersion);
    }

    if (systemImage) {
      args.push("-system-image", systemImage);
    }

    if (isolated) {
      args.push("-isolated", systemImage);
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
