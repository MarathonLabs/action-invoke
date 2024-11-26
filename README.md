# MarathonLabs/action-invoke

This action wraps [marathon-cloud][] CLI in your GitHub Actions workflow.

## Action Inputs

|               Name                | Description                                                                                                                                                                                                                                                                                 | Default                                    | Example                                                                                                                                                                                          |
| :-------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|        `apiKey` (required)        | Marathon Cloud API key                                                                                                                                                                                                                                                                      | ``                                         | `cafebabe`                                                                                                                                                                                       |
|     `application` (required)      | Application binary path. <br>**Android**: `application` should point to the APK file. <br>**iOS**: `application` should point to an ARM compatible Simulator build packaged in an ipa format or a zip archive.                                                                              |                                            | **Android**: `app/build/outputs/apk/debug/app-debug.apk` <br>**iOS**: `/home/user/workspace/sample.zip` or `/home/user/workspace/sample.ipa`                                                     |
|   `testApplication` (required)    | Test application binary path. <br>**Android**: `test_application` should point to the test .apk file for your app. <br>**iOS**: `test_application` should point to an ARM compatible iOS Test Runner app packaged in an ipa format or a zip archive.                                        |                                            | **Android**: `app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk` <br>**iOS**: `/home/user/workspace/sampleUITests-Runner.zip` or `/home/user/workspace/sampleUITests-Runner.ipa` |
|       `platform` (required)       | Testing platform                                                                                                                                                                                                                                                                            | ``                                         | `Android` or `iOS`                                                                                                                                                                               |
|      `osVersion` (optional)       | Android or iOS OS version. For Android one of [10, 11, 12, 13, 14]. For iOS one of [16.4, 17.2]                                                                                                                                                                                             | **Android**: `11`; **iOS**: `16.4`         | `12`, `17.2`, etc.                                                                                                                                                                               |
|     `systemImage` (optional)      | OS-specific system image. For Android only                                                                                                                                                                                                                                                  | ``                                         | `default`, `google_apis`, etc.                                                                                                                                                                   |
|        `output` (optional)        | Output folder for test run results                                                                                                                                                                                                                                                          | ``                                         | `output`                                                                                                                                                                                         |
|      `outputGlob` (optional)      | Only files matching this glob will be downloaded, i.e. 'tests/\*\*' will download only the JUnit xml files                                                                                                                                                                                  | ``                                         | `tests/**`                                                                                                                                                                                       |
|         `link` (optional)         | Link to commit                                                                                                                                                                                                                                                                              | ``                                         | ``                                                                                                                                                                                               |
|       `isolated` (optional)       | Run each test in isolation, i.e. isolated batching                                                                                                                                                                                                                                          | `false`                                    | `true`, `false`                                                                                                                                                                                  |
|        `flavor` (optional)        | Type of tests to run                                                                                                                                                                                                                                                                        | `native`                                   | `native`, `js-test-appium`, `python-robotframework-appium`                                                                                                                                       |
|      `filterFile` (optional)      | File containing test filters in YAML format, following the schema described at https://docs.marathonlabs.io/runner/configuration/filtering/#filtering-logic. For iOS see also https://docs.marathonlabs.io/runner/next/ios#test-plans.                                                      | ``                                         | ``                                                                                                                                                                                               |
|         `wait` (optional)         | Wait for test run to finish if true, exits after triggering a run if false.                                                                                                                                                                                                                 | ``                                         | `true`                                                                                                                                                                                           |
|         `name` (optional)         | Name for run, for example it could be description of commit.                                                                                                                                                                                                                                | ``                                         | AmazingRun                                                                                                                                                                                       |
|        `device` (optional)        | Device type. For Android one of [phone, tv, watch]. For iOS one of [iPhone-14, iPhone-15]                                                                                                                                                                                                   | **Android**: `phone`; **iOS**: `iPhone-14` | `phone`, `tv`, `watch`, `iPhone-14`, `iPhone-15`                                                                                                                                                 |
|     `xcodeVersion` (optional)     | Xcode version. Only for iOS. Possible values: [14.3.1, 15.2]                                                                                                                                                                                                                                | `14.3.1`                                   | `14.3.1`, `15.2`                                                                                                                                                                                 |
| `xctestplanFilterFile` (optional) | Test filters supplied as .xctestplan file                                                                                                                                                                                                                                                   | ``                                         | ``                                                                                                                                                                                               |
| `xctestplanTargetName` (optional) | Target name to use for test filtering in .xctestplan                                                                                                                                                                                                                                        | ``                                         | ``                                                                                                                                                                                               |
|     `xctestrunEnv` (optional)     | Xctestrun environment variables, format: 'VAR1=VALUE1,VAR2=VALUE2'                                                                                                                                                                                                                          | ``                                         | `VAR1=VALUE1,VAR2=VALUE2`                                                                                                                                                                        |
|   `xctestrunTestEnv` (optional)   | Xctestrun testing environment variables, format: 'VAR1=VALUE1,VAR2=VALUE2'                                                                                                                                                                                                                  | ``                                         | `VAR1=VALUE1,VAR2=VALUE2`                                                                                                                                                                        |
|  `ignoreTestFailures` (optional)  | When tests fail and this option is true then GHA will exit with code 0. By default, GHA will exit with code 1 in case of test failures and 0 for passing tests [possible values: true, false]                                                                                               | `false`                                    | `true`, `false`                                                                                                                                                                                  |
|      `pullFiles` (optional)       | Pull files from devices after the test run. The format is `ROOT1:PATH1,ROOT2:PATH2` where ROOT is one of [EXTERNAL_STORAGE, APP_DATA] and PATH is a relative path to the target file or directory. Note: Files with the same name and path from different devices may overwrite each other. | ``                                         | `EXTERNAL_STORAGE:Documents/some-results,APP_DATA:files/my_folder/some_file.txt`                                                                                                                 |
|      `resultFile` (optional)      | Result file path in a machine-readable format. You can specify the format via extension [yaml,json]                                                                                                                                                                                         | `result.json`                              | `some_result.json`                                                                                                                                                                               |
|        `branch` (optional)        | Branch for run, for example it could be git branch like develop or feature/about-screen                                                                                                                                                                                                     | ``                                         | `develop`                                                                                                                                                                                        |

## Usage Examples

### Basic

#### Android

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@1
  with:
    apiKey: "cafebabe"
    application: "/home/user/workspace/sample.apk"
    testApplication: "/home/user/workspace/testSample.apk"
    platform: "android"
```

#### iOS

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@1
  with:
    apiKey: "cafebabe"
    application: "/home/user/workspace/sample.zip"
    testApplication: "/home/user/workspace/sampleUITests-Runner.zip"
    platform: "ios"
```

### Development

The action source is located at [/src](/src). The action is written in TypeScript and compiled to a single javascript file with [`ncc`][ncc].

**It's expected to checkin `lib/index.js` to the repository.**

To setup the development environment, run the following commands:

```bash
$ npm install
```

To build the action script (regenerate `lib/index.js`), run the following command:

```bash
$ npm run build
```

To test the action, please use `manual_trigger.yaml` workflow.

[ncc]: https://github.com/vercel/ncc
[marathon-cloud]: https://github.com/MarathonLabs/marathon-cloud-cli

## LICENSE

MIT
