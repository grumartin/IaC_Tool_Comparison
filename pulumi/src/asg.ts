import * as aws from "@pulumi/aws";
import {
  web_subnet1_id,
  web_subnet2_id,
  app_subnet1_id,
  app_subnet2_id,
  vpc_id,
  alb_security_group_web_id,
  alb_security_group_app_id,
  target_group_web_arn,
  target_group_app_arn,
  template_app_id,
  template_web_id,
} from "./index";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const asg_web_name = config.require("asg-web-name");
const asg_sg_web_name = config.require("asg-sg-web-name");
const asg_app_name = config.require("asg-app-name");
const asg_sg_app_name = config.require("asg-sg-app-name");

export const asg_security_group_web = new aws.ec2.SecurityGroup(
  "asg-security-group-web",
  {
    name: asg_sg_web_name,
    description: "ASG Security Group",
    vpcId: vpc_id,
    ingress: [
      {
        description: "HTTP from ALB",
        fromPort: 80,
        toPort: 80,
        protocol: "tcp",
        securityGroups: [alb_security_group_web_id],
      },
      {
        description: "SSH From Anywhere or Your-IP",
        fromPort: 22,
        toPort: 22,
        protocol: "tcp",
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
    egress: [
      {
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
    tags: {
      Name: asg_sg_web_name,
    },
  },
);

export const asg_security_group_app = new aws.ec2.SecurityGroup(
  "asg-security-group-app",
  {
    name: asg_sg_app_name,
    description: "ASG Security Group",
    vpcId: vpc_id,
    ingress: [
      {
        description: "HTTP from ALB",
        fromPort: 80,
        toPort: 80,
        protocol: "tcp",
        securityGroups: [alb_security_group_app_id],
      },
      {
        description: "SSH From Anywhere or Your-IP",
        fromPort: 22,
        toPort: 22,
        protocol: "tcp",
        securityGroups: [asg_security_group_web.id],
      },
    ],
    egress: [
      {
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
    tags: {
      Name: asg_sg_app_name,
    },
  },
);

export const asg_web = new aws.autoscaling.Group("asg-web", {
  name: asg_web_name,
  desiredCapacity: 2,
  maxSize: 4,
  minSize: 1,
  healthCheckType: "EC2",
  targetGroupArns: [target_group_web_arn],
  vpcZoneIdentifiers: [web_subnet1_id, web_subnet2_id],
  launchTemplate: {
    id: template_web_id,
    version: "$Latest",
  },
});

export const asg_app = new aws.autoscaling.Group("asg-app", {
  name: asg_app_name,
  desiredCapacity: 2,
  maxSize: 4,
  minSize: 1,
  healthCheckType: "EC2",
  targetGroupArns: [target_group_app_arn],
  vpcZoneIdentifiers: [app_subnet1_id, app_subnet2_id],
  launchTemplate: {
    id: template_app_id,
    version: "$Latest",
  },
});

export const asg_security_group_web_id = asg_security_group_web.id;
export const asg_security_group_app_id = asg_security_group_app.id;
