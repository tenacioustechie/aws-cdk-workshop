import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export interface HitCounterProps {
  // the function for which we want to count the URL hits
  downstream: lambda.IFunction;
}

export class HitCounter extends cdk.Construct {
  // allows accessing the counter function
  public readonly handler: lambda.Function;
  // The hit counter table
  public readonly table: dynamodb.Table;

  constructor( scope: cdk.Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });
    this.table = table;

    this.handler = new lambda.Function(this, 'HitsCounterHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'hitcounter.handler',
      code: lambda.Code.asset('lambda'), // reference to the uploaded lambda package???
      environment: {
        // you can concatenate these late bound values 'functionName' and 'tableName' to be used in various ways, but not in your code, they are tokens
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName
      }
    });

    // grant the lambda role read/write permissions to our table
    table.grantWriteData( this.handler);
    // grant the lambda role invoke permissions to the downstream function
    props.downstream.grantInvoke(this.handler);

  }
}