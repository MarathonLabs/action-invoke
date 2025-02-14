import * as core from "@actions/core";

export function buildAndroidArgs(
  apiKey: string,
  application: string,
  testApplication: string,
  link: string,
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
  xctestrunEnv: string,
  xctestrunTestEnv: string,
  ignoreTestFailures: string,
  resultFile: string,
  pullFiles: string,
  branch: string,
  project: string,
  grantedPermission: string,
  analyticsReadOnly: string,
  retryQuotaTestUncompleted: string,
  retryQuotaTestPreventive: string,
  retryQuotaTestReactive: string,
  noRetries: string,
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
    "--result-file",
    resultFile,
  ];

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

  if (ignoreTestFailures) {
    args.push("--ignore-test-failures", ignoreTestFailures);
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

  if (xctestrunEnv) {
    core.warning(`xctestrunEnv argument is only for iOS`);
  }

  if (xctestrunTestEnv) {
    core.warning(`xctestrunTestEnv argument is only for iOS`);
  }

  if (pullFiles) {
    pullFiles.split(",").forEach((env) => {
      args.push("--pull-files", env.trim());
    });
  }

  if (branch) {
    args.push("--branch", branch);
  }

  if (project) {
    args.push("--project", project);
  }

  if (grantedPermission) {
    core.warning(`grantedPermission argument is only for iOS`);
  }

  if (analyticsReadOnly) {
    args.push("--analytics-read-only", analyticsReadOnly);
  }

  if (retryQuotaTestUncompleted) {
    args.push("--retry-quota-test-uncompleted", retryQuotaTestUncompleted);
  }

  if (retryQuotaTestPreventive) {
    args.push("--retry-quota-test-preventive", retryQuotaTestPreventive);
  }

  if (retryQuotaTestReactive) {
    args.push("--retry-quota-test-reactive", retryQuotaTestReactive);
  }

  if (typeof noRetries === "string" && noRetries.toLowerCase() === "true") {
    args.push("--no-retries");
  }

  return args;
}

export function buildiOSArgs(
  apiKey: string,
  application: string,
  testApplication: string,
  link: string,
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
  xctestrunEnv: string,
  xctestrunTestEnv: string,
  ignoreTestFailures: string,
  resultFile: string,
  pullFiles: string,
  branch: string,
  project: string,
  grantedPermission: string,
  analyticsReadOnly: string,
  retryQuotaTestUncompleted: string,
  retryQuotaTestPreventive: string,
  retryQuotaTestReactive: string,
  noRetries: string,
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
    "--result-file",
    resultFile,
  ];

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

  if (xctestrunEnv) {
    xctestrunEnv.split(",").forEach((env) => {
      args.push("--xctestrun-env", env.trim());
    });
  }

  if (xctestrunTestEnv) {
    xctestrunTestEnv.split(",").forEach((testEnv) => {
      args.push("--xctestrun-test-env", testEnv.trim());
    });
  }

  if (ignoreTestFailures) {
    args.push("--ignore-test-failures", ignoreTestFailures);
  }

  if (pullFiles) {
    core.warning(`pullFiles argument is only for Android`);
  }

  if (branch) {
    args.push("--branch", branch);
  }

  if (project) {
    args.push("--project", project);
  }

  if (grantedPermission) {
    grantedPermission.split(",").forEach((env) => {
      args.push("--granted-permission", env.trim());
    });
  }

  if (analyticsReadOnly) {
    args.push("--analytics-read-only", analyticsReadOnly);
  }

  if (retryQuotaTestUncompleted) {
    args.push("--retry-quota-test-uncompleted", retryQuotaTestUncompleted);
  }

  if (retryQuotaTestPreventive) {
    args.push("--retry-quota-test-preventive", retryQuotaTestPreventive);
  }

  if (retryQuotaTestReactive) {
    args.push("--retry-quota-test-reactive", retryQuotaTestReactive);
  }

  if (typeof noRetries === "string" && noRetries.toLowerCase() === "true") {
    args.push("--no-retries");
  }

  return args;
}

export function buildDownloadArgs(
  apiKey: string,
  runId: string,
  output: string,
  outputGlob: string,
): string[] {
  const args = [
    "download",
    "--api-key",
    apiKey,
    "--id",
    runId,
    "--output",
    output,
  ];

  if (outputGlob) {
    args.push("--glob", outputGlob);
  }

  return args;
}
