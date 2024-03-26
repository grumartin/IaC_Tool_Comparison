import * as aws from "@pulumi/aws";
import {
  app_subnet1_id,
  app_subnet2_id,
  asg_security_group_web_id,
  web_subnet1_id,
  web_subnet2_id,
} from "./index";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const alb_web_name = config.require("alb-web-name");
const alb_sg_web_name = config.require("alb-sg-web-name");
const tg_web_name = config.require("tg-web-name");
const alb_app_name = config.require("alb-app-name");
const alb_sg_app_name = config.require("alb-sg-app-name");
const tg_app_name = config.require("tg-app-name");
const vpc_cidr_block = config.require("vpc-cidr-block");
const vpc_name = config.require("vpc-name");

export const vpc = new aws.ec2.Vpc("vpc", {
  cidrBlock: vpc_cidr_block,
  tags: {
    Name: vpc_name,
  },
});

export const alb_security_group_web = new aws.ec2.SecurityGroup(
  "alb-security-group-web",
  {
    name: alb_sg_web_name,
    description: "ALB Security Group",
    vpcId: vpc.id,
    ingress: [
      {
        description: "HTTP from Internet",
        fromPort: 80,
        toPort: 80,
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
      Name: alb_sg_web_name,
    },
  },
);

export const alb_web = new aws.lb.LoadBalancer("alb-web", {
  name: alb_web_name,
  internal: false,
  loadBalancerType: "application",
  securityGroups: [alb_security_group_web.id],
  subnets: [web_subnet1_id, web_subnet2_id],
});

export const target_group_web = new aws.lb.TargetGroup("target-group-web", {
  name: tg_web_name,
  port: 80,
  protocol: "HTTP",
  vpcId: vpc.id,
  healthCheck: {
    path: "/",
    matcher: "200",
  },
});

export const albListener_web = new aws.lb.Listener("alb_listener-web", {
  loadBalancerArn: alb_web.arn,
  port: 80,
  protocol: "HTTP",
  defaultActions: [
    {
      type: "forward",
      targetGroupArn: target_group_web.arn,
    },
  ],
});

export const alb_security_group_app = new aws.ec2.SecurityGroup(
  "alb-security-group-app",
  {
    name: alb_sg_app_name,
    description: "ALB Security Group",
    vpcId: vpc.id,
    ingress: [
      {
        description: "HTTP from Internet",
        fromPort: 80,
        toPort: 80,
        protocol: "tcp",
        securityGroups: [asg_security_group_web_id],
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
      Name: alb_sg_app_name,
    },
  },
);

export const alb_app = new aws.lb.LoadBalancer("alb-app", {
  name: alb_app_name,
  internal: false,
  loadBalancerType: "application",
  securityGroups: [alb_security_group_app.id],
  subnets: [app_subnet1_id, app_subnet2_id],
});

export const target_group_app = new aws.lb.TargetGroup("target-group-app", {
  name: tg_app_name,
  port: 80,
  protocol: "HTTP",
  vpcId: vpc.id,
  healthCheck: {
    path: "/",
    matcher: "200",
  },
});

export const albListener_app = new aws.lb.Listener("alb_listener-app", {
  loadBalancerArn: alb_app.arn,
  port: 80,
  protocol: "HTTP",
  defaultActions: [
    {
      type: "forward",
      targetGroupArn: target_group_app.arn,
    },
  ],
});

export const vpc_id = vpc.id;

export const alb_security_group_web_id = alb_security_group_web.id;
export const alb_security_group_app_id = alb_security_group_app.id;
export const target_group_web_arn = target_group_web.arn;
export const target_group_app_arn = target_group_app.arn;
