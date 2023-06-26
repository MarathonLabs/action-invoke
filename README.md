# MarathonLabs/action-invoke

This action wraps [marathon-cloud][] CLI in your GitHub Actions workflow.

## Action Inputs

|             Name             | Description                                             | Default | Example                                          |
| :--------------------------: | ------------------------------------------------------- | ------- | ------------------------------------------------ |
|     `apiKey` (required)      | Marathon Cloud API key                                  | ``      | `cafebabe`                                       |
|   `application` (required)   | Application binary                                      | ``      | `/home/user/workspace/sample.apk` or `/home/user/workspace/sample.zip` |
| `testApplication` (required) | Test application binary                                 | ``      | `/home/user/workspace/testSample.apk` or `/home/user/workspace/sampleUITests-Runner.zip` |
|    `platform` (required)     | Testing platform                                        | ``      | `Android` or `iOS`                               |
|     `output` (optional)      | Output folder path                                      | ``      | ``                                               |
|      `link` (optional)       | Link to commit                                          | ``      | ``                                               |

## Usage Examples

### Basic

#### Android

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@1.0.0
  with:
    apiKey: "cafebabe"
    application: "/home/user/workspace/sample.apk"
    testApplication: "/home/user/workspace/testSample.apk"
    platform: "Android"
```

#### iOS

```yaml
- name: run tests using marathon-cloud
  uses: MarathonLabs/action-invoke@1.0.0
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
