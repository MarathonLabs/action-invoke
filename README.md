# MarathonLabs/action-invoke

This action wraps [marathon-cloud][] CLI in your GitHub Actions workflow.

## Action Inputs

|             Name             | Description                                                                                                                                                                                                                                          | Default | Example                                                                                                                                                                                          |
| :--------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     `apiKey` (required)      | Marathon Cloud API key                                                                                                                                                                                                                               | ``      | `cafebabe`                                                                                                                                                                                       |
|   `application` (required)   | Application binary path. <br>**Android**: `application` should point to the APK file. <br>**iOS**: `application` should point to an ARM compatible Simulator build packaged in an ipa format or a zip archive.                                       |         | **Android**: `app/build/outputs/apk/debug/app-debug.apk` <br>**iOS**: `/home/user/workspace/sample.zip` or `/home/user/workspace/sample.ipa`                                                     |
| `testApplication` (required) | Test application binary path. <br>**Android**: `test_application` should point to the test .apk file for your app. <br>**iOS**: `test_application` should point to an ARM compatible iOS Test Runner app packaged in an ipa format or a zip archive. |         | **Android**: `app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk` <br>**iOS**: `/home/user/workspace/sampleUITests-Runner.zip` or `/home/user/workspace/sampleUITests-Runner.ipa` |
|    `platform` (required)     | Testing platform                                                                                                                                                                                                                                     | ``      | `Android` or `iOS`                                                                                                                                                                               |
|    `osVersion` (optional)    | Android or iOS OS version                                                                                                                                                                                                                            | ``      | `11`, `15.5`, etc.                                                                                                                                                                               |
|   `systemImage` (optional)   | OS-specific system image                                                                                                                                                                                                                             | ``      | `default`, `google_apis`, etc.                                                                                                                                                                   |
|     `output` (optional)      | Output folder path                                                                                                                                                                                                                                   | ``      | ``                                                                                                                                                                                               |
|      `link` (optional)       | Link to commit                                                                                                                                                                                                                                       | ``      | ``                                                                                                                                                                                               |
|    `isolated` (optional)     | Run each test in isolation, i.e. isolated batching                                                                                                                                                                                                   | ``      | ``                                                                                                                                                                                               |
|     `flavor` (optional)      | Type of tests to run                                                                                                                                                                                                                                 | ``      | `native`, `js-test-appium`, `python-robotframework-appium`                                                                                                                                       |
|   `filterFile` (optional)    | File containing test filters in YAML format, following the schema described at https://docs.marathonlabs.io/runner/configuration/filtering/#filtering-logic. For iOS see also https://docs.marathonlabs.io/runner/next/ios#test-plans.               | ``      | ``                                                                                                                                                                                               |

## Usage Examples

### Basic

#### Android

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@0
  with:
    apiKey: "cafebabe"
    application: "/home/user/workspace/sample.apk"
    testApplication: "/home/user/workspace/testSample.apk"
    platform: "Android"
```

#### iOS

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@0
  with:
    apiKey: "cafebabe"
    application: "/home/user/workspace/sample.zip"
    testApplication: "/home/user/workspace/sampleUITests-Runner.zip"
    platform: "iOS"
```

### Developing

The action source is located at [/src](/src). The action is written in TypeScript and compiled to a single javascript file with [`ncc`][ncc]. It's expected to checkin `lib/index.js` to the repository.

To setup the development environment, run the following commands:

```bash
$ npm install
```

To build the action script, run the following command:

```bash
$ npm run build
```

To test the action, we can use the workflow [Test workflow](https://github.com/MarathonLabs/setup-marathon-cloud/actions/workflows/test-marathon-cloud.yaml) to trigger a build.

[ncc]: https://github.com/vercel/ncc
[marathon-cloud]: https://github.com/MarathonLabs/marathon-cloud-cli

## LICENSE

MIT
