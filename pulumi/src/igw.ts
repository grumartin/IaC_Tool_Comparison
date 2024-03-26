import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { vpc_id } from "./alb";

const config = new pulumi.Config();
const igw_name = config.require("igw-name");

export const internet_gw = new aws.ec2.InternetGateway("internet-gw", {
  vpcId: vpc_id,
  tags: {
    Name: igw_name,
  },
});

export const internet_gw_id = internet_gw.id;
