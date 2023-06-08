# MarathonLabs/action-invoke

This action wraps [marathon-cloud][] CLI in your GitHub Actions workflow.

## Action Inputs

|             Name             | Description                                             | Default | Example                                          |
| :--------------------------: | ------------------------------------------------------- | ------- | ------------------------------------------------ |
|     `apiKey` (required)      | Marathon Cloud API key                                  | ``      | `cafebabe`                                       |
|   `application` (required)   | Application binary path, e.g. apk file for Android      | ``      | `app/build/output/apk/app-debug.apk`             |
| `testApplication` (required) | Test application binary path, e.g. apk file for Android | ``      | `app/build/output/apk/app-androidTest-debug.apk` |
|     `output` (optional)      | Output folder path                                      | ``      | ``                                               |
|      `link` (optional)       | Link to commit                                          | ``      | ``                                               |

## Usage Examples

### Basic

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@1.0.0
  with:
    apiKey: "cafebabe"
    application: "app/build/output/apk/app-debug.apk"
    testApplication: "app/build/output/apk/app-androidTest-debug.apk"
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
