import * as core from "@actions/core";
import { exec } from "@actions/exec";
import { buildAndroidArgs, buildiOSArgs } from "./command";

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
    const flavor = core.getInput("flavor");
    const filterFile = core.getInput("filterFile");
    const wait = core.getInput("wait");
    const name = core.getInput("name");
    const device = core.getInput("device");
    const xcodeVersion = core.getInput("xcodeVersion");
    const xctestplanFilterFile = core.getInput("xctestplanFilterFile");
    const xctestplanTargetName = core.getInput("xctestplanTargetName");

    let args: string[] = [];

    const lowercasePlatform = platform.toLowerCase();
    switch (lowercasePlatform) {
      case "android": {
        args = buildAndroidArgs(
          apiKey,
          application,
          testApplication,
          link,
          output,
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
        );
        break;
      }
      case "ios": {
        args = buildiOSArgs(
          apiKey,
          application,
          testApplication,
          link,
          output,
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
