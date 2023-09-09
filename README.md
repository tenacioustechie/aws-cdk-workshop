# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`AwsCdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

# Commands for this project

```bash
# Add this to cdk.json to use specific profile when deploying - "profile": "[cli-profile-name]"
# this only needs to be run once per account deploying into
cdk bootstrap

# deploy changes or new stack to aws
cdk deploy

# diff for changes
cdk diff

```

# Hotswap Development deployment of lambda functions

```bash
# use this command to deploy updated lambda function code
cdk deploy --hotswap

# use this to deploy continuously using --hotswap option
cdk watch
# you can use the watch setting to included and exclude changes from watch deploy operations
# https://cdkworkshop.com/20-typescript/30-hello-cdk/300-cdk-watch.html
```

# Resources

- CDK Workshop (this was built using the workshop) https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html
- CDK Latest Construct Library Reference https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html
- CDK Construct Reference https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html
- CDK Dynamo Table Viewer https://www.npmjs.com/package/cdk-dynamo-table-viewer npm install cdk-dynamo-table-viewer@3.0.2

# Welcome to your CDK TypeScript project
