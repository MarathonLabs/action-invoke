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
    core.warning(
      `Current version of action-invoke does not yet support os version selection for iOS. Using default`,
    );
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

  return args;
}
