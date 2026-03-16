import { getInput, info, setFailed, warning } from "@actions/core";
import { exec } from "@actions/exec";
import * as fs from "fs";
import {
  buildAndroidArgs,
  buildIosArgs,
  buildDownloadArgs,
  buildMaestroAndroidArgs,
  buildMaestroIosArgs,
} from "./command";

async function main() {
  try {
    const apiKey = getInput("apiKey");
    const application = getInput("application");
    const testApplication = getInput("testApplication");
    const platform = getInput("platform");
    const link = getInput("link");
    const output = getInput("output");
    const outputGlob = getInput("outputGlob");
    const osVersion = getInput("osVersion");
    const systemImage = getInput("systemImage");
    const isolated = getInput("isolated");
    const flavor = getInput("flavor");
    const filterFile = getInput("filterFile");
    const wait = getInput("wait");
    const name = getInput("name");
    const device = getInput("device");
    const xcodeVersion = getInput("xcodeVersion");
    const xctestplanFilterFile = getInput("xctestplanFilterFile");
    const xctestplanTargetName = getInput("xctestplanTargetName");
    const xctestrunEnv = getInput("xctestrunEnv");
    const xctestrunTestEnv = getInput("xctestrunTestEnv");
    const ignoreTestFailures =
      getInput("ignoreTestFailures").toLowerCase() === "true";
    const resultFile = getInput("resultFile") || "result.json";
    const pullFiles = getInput("pullFiles");
    const branch = getInput("branch");
    const project = getInput("project");
    const grantedPermission = getInput("grantedPermission");
    const analyticsReadOnly = getInput("analyticsReadOnly");
    const retryQuotaTestUncompleted = getInput("retryQuotaTestUncompleted");
    const retryQuotaTestPreventive = getInput("retryQuotaTestPreventive");
    const retryQuotaTestReactive = getInput("retryQuotaTestReactive");
    const noRetries = getInput("noRetries");
    const maestroEnv = getInput("maestroEnv");
    const flows = getInput("flows");

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
          branch,
          project,
          grantedPermission,
          analyticsReadOnly,
          retryQuotaTestUncompleted,
          retryQuotaTestPreventive,
          retryQuotaTestReactive,
          noRetries,
        );
        break;
      }
      case "ios": {
        args = buildIosArgs(
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
          branch,
          project,
          grantedPermission,
          analyticsReadOnly,
          retryQuotaTestUncompleted,
          retryQuotaTestPreventive,
          retryQuotaTestReactive,
          noRetries,
        );
        break;
      }
      case "maestro/android": {
        args = buildMaestroAndroidArgs(
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
          branch,
          project,
          grantedPermission,
          analyticsReadOnly,
          retryQuotaTestUncompleted,
          retryQuotaTestPreventive,
          retryQuotaTestReactive,
          noRetries,
          maestroEnv,
          flows,
        );
        break;
      }
      case "maestro/ios": {
        args = buildMaestroIosArgs(
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
          branch,
          project,
          grantedPermission,
          analyticsReadOnly,
          retryQuotaTestUncompleted,
          retryQuotaTestPreventive,
          retryQuotaTestReactive,
          noRetries,
          maestroEnv,
          flows,
        );
        break;
      }
      default: {
        setFailed(
          `Unsupported platform ${platform}. Please use one of [android, ios]`,
        );
        break;
      }
    }

    info("marathon-cloud run command starts...");
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
        warning("Test failures detected, but continuing to download files...");
      } else {
        warning(
          "Test failures detected, but continuing as ignoreTestFailures is set to true.",
        );
      }
    }

    // Check if output is empty and skip the remaining part if it is
    if (!output) {
      if (errorMessage && !ignoreTestFailures) {
        setFailed(errorMessage);
      }
      return;
    }

    if (wait && wait.toLowerCase() === "false") {
      warning(
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
    info("marathon-cloud download command starts...");
    await exec("marathon-cloud", downloadArgs);

    if (errorMessage && !ignoreTestFailures) {
      setFailed(errorMessage);
    }
  } catch (e: any) {
    warning(`marathon-cloud invoke failed: ${e}`);
    setFailed(e);
  }
}

try {
  main();
} catch (e) {
  setFailed((e as { message: string }).message);
}
