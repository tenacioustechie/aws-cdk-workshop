import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HitCounter } from "./hit-counter";

export class AwsCdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create SQS Queue
    // const queue = new sqs.Queue(this, 'AwsCdkWorkshopQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });

    // Create SNS Topic
    // const topic = new sns.Topic(this, 'AwsCdkWorkshopTopic');

    // Create SNS Topic Subscription to SQS Queue
    // topic.addSubscription(new subs.SqsSubscription(queue));

    // Create Lambda Function resource
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello,
    });

    // Create API Gateway with REST API Integration
    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler,
    });
  }
}
