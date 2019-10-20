import sns = require('@aws-cdk/aws-sns');
import subs = require('@aws-cdk/aws-sns-subscriptions');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');
import { HitCounter } from './hitcounter';

// This is the App Definition class created by the entry point in bin folder
export class AwsCdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines AWS Lambda resource - https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-readme.html
    const hello = new lambda.Function( this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X, // execution environment
      code: lambda.Code.asset('lambda'), // code loaded from the "lambda" directory
      handler: 'hello.handler'
    });

    const helloWithCouter = new HitCounter( this, 'HelloHitCouter', {
      downstream: hello
    });

    //helloWithCouter.grantInvoke( gateway);
    // helloWithCouter.addPermission('APIGateway', {
    //   principal: new iam.ServicePrincipal('apigateway.amazonaws.com')
    // });

    // defines an API Gateway Rest API resource backed by the 'Hello' function above - https://docs.aws.amazon.com/cdk/api/latest/docs/aws-apigateway-readme.html
    const gateway = new apigw.LambdaRestApi(this, 'ApiEndpoint', {
      handler: helloWithCouter.handler,
      deployOptions: {
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        stageName: 'prod'
      }
    });
    // if you disable the proxy part you can specify URIs with this
    //gateway.root.addMethod('GET', new LambdaIntegration(helloWithCouter));

    // need to grant permission https://aws.amazon.com/premiumsupport/knowledge-center/500-error-lambda-api-gateway/
    // aws lambda add-permission --function-name [funcArn] --source-arn [GatewayArn] --principal apigateway.amazonaws.com --statement-id statement-id-guid --action lambda:InvokeFunction
    // aws lambda add-permission --function-name arn:aws:lambda:ap-southeast-2:366072108453:function:AwsCdkWorkshopStack-HelloHitCouterHitsCounterHandl-1C1DNVXQVFAAX --source-arn arn:aws:execute-api:ap-southeast-2:366072108453:api-id/*/GET/lambdasv1 --principal apigateway.amazonaws.com --statement-id statement-id-guid --action lambda:InvokeFunction --profile mit-house
    
    // gateway.deploymentStage.

  }
}
