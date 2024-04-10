import * as core from "@actions/core";

export function buildAndroidArgs(
  apiKey: string,
  application: string,
  testApplication: string,
  link: string,
  output: string,
  osVersion: string,
  systemImage: string,
  isolated: string,
  flavor: string,
  filterFile: string,
  wait: string,
  name: string,
  device: string,
  xcodeVersion: string,
  xctestplanFilterFile: string,
  xctestplanTargetName: string,
): string[] {
  const args = [
    "run",
    "android",
    "--api-key",
    apiKey,
    "--application",
    application,
    "--test-application",
    testApplication,
  ];

  if (output) {
    args.push("--output", output);
  }

  if (link) {
    args.push("--link", link);
  }

  if (osVersion) {
    args.push("--os-version", osVersion);
  }

  if (systemImage) {
    args.push("--system-image", systemImage);
  }

  if (isolated) {
    args.push("--isolated", isolated);
  }

  if (flavor) {
    args.push("--flavor", flavor);
  }

  if (filterFile) {
    args.push("--filter-file", filterFile);
  }

  if (wait) {
    args.push("--wait", wait);
  }

  if (name) {
    args.push("--name", name);
  }

  if (device) {
    args.push("--device", device);
  }

  if (xcodeVersion) {
    core.warning(`xcodeVersion argument is only for iOS`);
  }

  if (xctestplanFilterFile) {
    core.warning(`xctestplanFilterFile argument is only for iOS`);
  }

  if (xctestplanTargetName) {
    core.warning(`xctestplanTargetName argument is only for iOS`);
  }

  return args;
}

export function buildiOSArgs(
  apiKey: string,
  application: string,
  testApplication: string,
  link: string,
  output: string,
  osVersion: string,
  systemImage: string,
  isolated: string,
  flavor: string,
  filterFile: string,
  wait: string,
  name: string,
  device: string,
  xcodeVersion: string,
  xctestplanFilterFile: string,
  xctestplanTargetName: string,
): string[] {
  const args = [
    "run",
    "ios",
    "--api-key",
    apiKey,
    "--application",
    application,
    "--test-application",
    testApplication,
  ];

  if (output) {
    args.push("--output", output);
  }

  if (link) {
    args.push("--link", link);
  }

  if (osVersion) {
    args.push("--os-version", osVersion);
  }

  if (systemImage) {
    core.warning(
      `Current version of action-invoke does not yet support system image selection for iOS. Using default`,
    );
  }

  if (isolated) {
    args.push("--isolated", isolated);
  }

  if (flavor) {
    core.warning(
      `Current version of action-invoke does not yet support flavor selection for iOS. Using default`,
    );
  }

  if (filterFile) {
    args.push("--filter-file", filterFile);
  }

  if (wait) {
    args.push("--wait", wait);
  }

  if (name) {
    args.push("--name", name);
  }

  if (device) {
    args.push("--device", device);
  }

  if (xcodeVersion) {
    args.push("--xcode-version", xcodeVersion);
  }

  if (xctestplanFilterFile) {
    args.push("--xctestplan-filter-file", xctestplanFilterFile);
  }

  if (xctestplanTargetName) {
    args.push("--xctestplan-target-name", xctestplanTargetName);
  }

  return args;
}
