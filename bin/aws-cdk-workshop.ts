#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsCdkWorkshopStack } from "../lib/aws-cdk-workshop-stack";
import { WorkshopPipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();
new WorkshopPipelineStack(app, "AwsCdkWorkshopStack");
