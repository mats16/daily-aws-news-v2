import * as cdk from 'aws-cdk-lib';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class cdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    
    const bucket = new s3.Bucket(this, 'Bucket', { encryption: s3.BucketEncryption.S3_MANAGED });

    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName
    })

    // Access other Amplify Resources 
    /*
    const retVal:AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [
        {category: <insert-amplify-category>, resourceName: <insert-amplify-resourcename>},
      ]
    );
    */
  }
}