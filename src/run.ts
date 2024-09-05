import * as core from "@actions/core";
import { exec } from "@actions/exec";
import * as fs from "fs";
import { buildAndroidArgs, buildiOSArgs, buildDownloadArgs } from "./command";

async function main() {
  try {
    const apiKey = core.getInput("apiKey");
    const application = core.getInput("application");
    const testApplication = core.getInput("testApplication");
    const platform = core.getInput("platform");
    const link = core.getInput("link");
    const output = core.getInput("output");
    const outputGlob = core.getInput("outputGlob");
    const osVersion = core.getInput("osVersion");
    const systemImage = core.getInput("systemImage");
    const isolated = core.getInput("isolated");
    const flavor = core.getInput("flavor");
    const filterFile = core.getInput("filterFile");
    const wait = core.getInput("wait");
    const name = core.getInput("name");
    const device = core.getInput("device");
    const xcodeVersion = core.getInput("xcodeVersion");
    const xctestplanFilterFile = core.getInput("xctestplanFilterFile");
    const xctestplanTargetName = core.getInput("xctestplanTargetName");
    const xctestrunEnv = core.getInput("xctestrunEnv");
    const xctestrunTestEnv = core.getInput("xctestrunTestEnv");
    const ignoreTestFailures =
      core.getInput("ignoreTestFailures").toLowerCase() === "true";
    const resultFile = "result.json";
    const pullFiles = core.getInput("pullFiles");

    let args: string[] = [];

    const lowercasePlatform = platform.toLowerCase();
    switch (lowercasePlatform) {
      case "android": {
        args = buildAndroidArgs(
          apiKey,
          application,
          testApplication,
          link,
          osVersion,
          systemImage,
          isolated,
          flavor,
          filterFile,
          wait,
          name,
          device,
          xcodeVersion,
          xctestplanFilterFile,
          xctestplanTargetName,
          xctestrunEnv,
          xctestrunTestEnv,
          "",
          resultFile,
          pullFiles,
        );
        break;
      }
      case "ios": {
        args = buildiOSArgs(
          apiKey,
          application,
          testApplication,
          link,
          osVersion,
          systemImage,
          isolated,
          flavor,
          filterFile,
          wait,
          name,
          device,
          xcodeVersion,
          xctestplanFilterFile,
          xctestplanTargetName,
          xctestrunEnv,
          xctestrunTestEnv,
          "",
          resultFile,
          pullFiles,
        );
        break;
      }
      default: {
        core.setFailed(
          `Unsupported platform ${platform}. Please use one of [android, ios]`,
        );
        break;
      }
    }

    core.info("marathon-cloud run command starts...");
    let exitCode = 0;
    let errorMessage: string | null = null;

    try {
      exitCode = await exec("marathon-cloud", args);
    } catch (error: any) {
      exitCode = error?.code ?? 1; // Default to 1 if there's no specific exit code
      errorMessage =
        error.message || "Unknown error during marathon-cloud execution";
    }

    if (exitCode !== 0) {
      if (!ignoreTestFailures) {
        core.warning(
          "Test failures detected, but continuing to download files...",
        );
      } else {
        core.warning(
          "Test failures detected, but continuing as ignoreTestFailures is set to true.",
        );
      }
    }

    // Check if output is empty and skip the remaining part if it is
    if (!output) {
      return;
    }

    if (wait && wait.toLowerCase() === "false") {
      core.warning(
        "There is no way to download artifacts because wait=false. Please set wait=true to wait for the run to finish and allow artifact download.",
      );
      return;
    }

    // Read and parse the result.json file
    const resultJson = fs.readFileSync(resultFile, "utf8");
    const result = JSON.parse(resultJson);
    const runId = result.id;

    let downloadArgs: string[] = buildDownloadArgs(
      apiKey,
      runId,
      output,
      outputGlob,
    );
    core.info("marathon-cloud download command starts...");
    await exec("marathon-cloud", downloadArgs);

    if (errorMessage && !ignoreTestFailures) {
      core.setFailed(errorMessage);
    }
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
