import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as std from "@pulumi/std";

const config = new pulumi.Config();
const az_1 = config.require("az-1");
const az_2 = config.require("az-2");
const vpc_cidr_block = config.require("vpc-cidr-block");
const vpc_name = config.require("vpc-name");
const igw_name = config.require("igw-name");
const web_subnet1_cidr = config.require("web-subnet1-cidr");
const web_subnet1_name = config.require("web-subnet1-name");
const web_subnet2_cidr = config.require("web-subnet2-cidr");
const web_subnet2_name = config.require("web-subnet2-name");
const app_subnet1_cidr = config.require("app-subnet1-cidr");
const app_subnet1_name = config.require("app-subnet1-name");
const app_subnet2_cidr = config.require("app-subnet2-cidr");
const app_subnet2_name = config.require("app-subnet2-name");
const db_subnet1_cidr = config.require("db-subnet1-cidr");
const db_subnet1_name = config.require("db-subnet1-name");
const db_subnet2_cidr = config.require("db-subnet2-cidr");
const db_subnet2_name = config.require("db-subnet2-name");
const public_rt_name = config.require("public-rt-name");
const launch_template_web_name = config.require("launch-template-web-name");
const image_id = config.require("image-id");
const instance_type = config.require("instance-type");
const web_instance_name = config.require("web-instance-name");
const launch_template_app_name = config.require("launch-template-app-name");
const app_instance_name = config.require("app-instance-name");
const alb_web_name = config.require("alb-web-name");
const alb_sg_web_name = config.require("alb-sg-web-name");
const asg_web_name = config.require("asg-web-name");
const asg_sg_web_name = config.require("asg-sg-web-name");
const tg_web_name = config.require("tg-web-name");
const alb_app_name = config.require("alb-app-name");
const alb_sg_app_name = config.require("alb-sg-app-name");
const asg_app_name = config.require("asg-app-name");
const asg_sg_app_name = config.require("asg-sg-app-name");
const tg_app_name = config.require("tg-app-name");
const db_username = config.requireSecret("db-username");
const db_password = config.requireSecret("db-password");
const db_name = config.require("db-name");
const instance_class = config.require("instance-class");
const db_sg_name = config.require("db-sg-name");
const db_subnet_grp_name = config.require("db-subnet-grp-name");

const vpc = new aws.ec2.Vpc("vpc", {
  cidrBlock: vpc_cidr_block,
  tags: {
    Name: vpc_name,
  },
});

const alb_security_group_web = new aws.ec2.SecurityGroup(
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

const app_subnet1 = new aws.ec2.Subnet("app-subnet1", {
  vpcId: vpc.id,
  cidrBlock: app_subnet1_cidr,
  availabilityZone: az_1,
  mapPublicIpOnLaunch: false,
  tags: {
    Name: app_subnet1_name,
  },
});

const app_subnet2 = new aws.ec2.Subnet("app-subnet2", {
  vpcId: vpc.id,
  cidrBlock: app_subnet2_cidr,
  availabilityZone: az_2,
  mapPublicIpOnLaunch: false,
  tags: {
    Name: app_subnet2_name,
  },
});

const asg_security_group_web = new aws.ec2.SecurityGroup(
  "asg-security-group-web",
  {
    name: asg_sg_web_name,
    description: "ASG Security Group",
    vpcId: vpc.id,
    ingress: [
      {
        description: "HTTP from ALB",
        fromPort: 80,
        toPort: 80,
        protocol: "tcp",
        securityGroups: [alb_security_group_web.id],
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

const alb_security_group_app = new aws.ec2.SecurityGroup(
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
      Name: alb_sg_app_name,
    },
  },
);

const alb_app = new aws.lb.LoadBalancer("alb-app", {
  name: alb_app_name,
  internal: false,
  loadBalancerType: "application",
  securityGroups: [alb_security_group_app.id],
  subnets: [app_subnet1.id, app_subnet2.id],
});

const asg_security_group_app = new aws.ec2.SecurityGroup(
  "asg-security-group-app",
  {
    name: asg_sg_app_name,
    description: "ASG Security Group",
    vpcId: vpc.id,
    ingress: [
      {
        description: "HTTP from ALB",
        fromPort: 80,
        toPort: 80,
        protocol: "tcp",
        securityGroups: [alb_security_group_app.id],
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

const db_sg = new aws.ec2.SecurityGroup("db-sg", {
  name: db_sg_name,
  description: "DB Security Group",
  vpcId: vpc.id,
  ingress: [
    {
      fromPort: 5432,
      toPort: 5432,
      protocol: "tcp",
      securityGroups: [asg_security_group_app.id],
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
    Name: db_sg_name,
  },
});

const db_subnet1 = new aws.ec2.Subnet("db-subnet1", {
  vpcId: vpc.id,
  cidrBlock: db_subnet1_cidr,
  availabilityZone: az_1,
  mapPublicIpOnLaunch: false,
  tags: {
    Name: db_subnet1_name,
  },
});

const db_subnet2 = new aws.ec2.Subnet("db-subnet2", {
  vpcId: vpc.id,
  cidrBlock: db_subnet2_cidr,
  availabilityZone: az_2,
  mapPublicIpOnLaunch: true,
  tags: {
    Name: db_subnet2_name,
  },
});

const subnet_grp = new aws.rds.SubnetGroup("subnet-grp", {
  name: db_subnet_grp_name,
  subnetIds: [db_subnet1.id, db_subnet2.id],
  tags: {
    Name: db_subnet_grp_name,
  },
});

const internet_gw = new aws.ec2.InternetGateway("internet-gw", {
  vpcId: vpc.id,
  tags: {
    Name: igw_name,
  },
});

const template_app = new aws.ec2.LaunchTemplate("template-app", {
  name: launch_template_app_name,
  imageId: image_id,
  instanceType: instance_type,
  networkInterfaces: [
    {
      deviceIndex: 0,
      securityGroups: [asg_security_group_app.id],
    },
  ],
  tagSpecifications: [
    {
      resourceType: "instance",
      tags: {
        Name: app_instance_name,
      },
    },
  ],
});

const template_web = new aws.ec2.LaunchTemplate("template-web", {
  name: launch_template_web_name,
  imageId: image_id,
  instanceType: instance_type,
  networkInterfaces: [
    {
      deviceIndex: 0,
      securityGroups: [asg_security_group_web.id],
    },
  ],
  userData: std
    .filebase64Output({
      input: "user-data.sh",
    })
    .apply((invoke) => invoke.result),
  tagSpecifications: [
    {
      resourceType: "instance",
      tags: {
        Name: web_instance_name,
      },
    },
  ],
});

/*

const private_route_table = new aws.ec2.RouteTable("private-route-table", {
  vpcId: vpc.id,
  tags: {
    Name: private_rt_name,
  },
});

const pri_rt_association_1 = new aws.ec2.RouteTableAssociation(
  "pri-rt-association-1",
  {
    subnetId: app_subnet1.id,
    routeTableId: private_route_table.id,
  },
);

const pri_rt_association_2 = new aws.ec2.RouteTableAssociation(
  "pri-rt-association-2",
  {
    subnetId: app_subnet2.id,
    routeTableId: private_route_table.id,
  },
);
 */

const rds_db = new aws.rds.Instance("rds-db", {
  allocatedStorage: 20,
  storageType: "gp2",
  engine: "postgres",
  engineVersion: "16.2",
  dbName: db_name,
  instanceClass: instance_class,
  username: db_username,
  password: db_password,
  parameterGroupName: "default.postgres16",
  skipFinalSnapshot: true,
  dbSubnetGroupName: subnet_grp.name,
  vpcSecurityGroupIds: [db_sg.id],
});

const target_group_app = new aws.lb.TargetGroup("target-group-app", {
  name: tg_app_name,
  port: 80,
  protocol: "HTTP",
  vpcId: vpc.id,
  healthCheck: {
    path: "/",
    matcher: "200",
  },
});

const albListener_app = new aws.lb.Listener("alb_listener-app", {
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

const asg_app = new aws.autoscaling.Group("asg-app", {
  name: asg_app_name,
  desiredCapacity: 2,
  maxSize: 4,
  minSize: 1,
  healthCheckType: "EC2",
  targetGroupArns: [target_group_app.arn],
  vpcZoneIdentifiers: [app_subnet1.id, app_subnet2.id],
  launchTemplate: {
    id: template_app.id,
    version: "$Latest",
  },
});

const web_subnet1 = new aws.ec2.Subnet("web-subnet1", {
  vpcId: vpc.id,
  cidrBlock: web_subnet1_cidr,
  availabilityZone: az_1,
  mapPublicIpOnLaunch: true,
  tags: {
    Name: web_subnet1_name,
  },
});

const web_subnet2 = new aws.ec2.Subnet("web-subnet2", {
  vpcId: vpc.id,
  cidrBlock: web_subnet2_cidr,
  availabilityZone: az_2,
  mapPublicIpOnLaunch: true,
  tags: {
    Name: web_subnet2_name,
  },
});

const alb_web = new aws.lb.LoadBalancer("alb-web", {
  name: alb_web_name,
  internal: false,
  loadBalancerType: "application",
  securityGroups: [alb_security_group_web.id],
  subnets: [web_subnet1.id, web_subnet2.id],
});

const public_route_table = new aws.ec2.RouteTable("public-route-table", {
  vpcId: vpc.id,
  routes: [
    {
      cidrBlock: "0.0.0.0/0",
      gatewayId: internet_gw.id,
    },
  ],
  tags: {
    Name: public_rt_name,
  },
});

const pub_rt_association_1 = new aws.ec2.RouteTableAssociation(
  "pub-rt-association-1",
  {
    subnetId: web_subnet1.id,
    routeTableId: public_route_table.id,
  },
);

const pub_rt_association_2 = new aws.ec2.RouteTableAssociation(
  "pub-rt-association-2",
  {
    subnetId: web_subnet2.id,
    routeTableId: public_route_table.id,
  },
);

const target_group_web = new aws.lb.TargetGroup("target-group-web", {
  name: tg_web_name,
  port: 80,
  protocol: "HTTP",
  vpcId: vpc.id,
  healthCheck: {
    path: "/",
    matcher: "200",
  },
});

const albListener_web = new aws.lb.Listener("alb_listener-web", {
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

const asg_web = new aws.autoscaling.Group("asg-web", {
  name: asg_web_name,
  desiredCapacity: 2,
  maxSize: 4,
  minSize: 1,
  healthCheckType: "EC2",
  targetGroupArns: [target_group_web.arn],
  vpcZoneIdentifiers: [web_subnet1.id, web_subnet2.id],
  launchTemplate: {
    id: template_web.id,
    version: "$Latest",
  },
});

export const web_server_dns = alb_web.dnsName;
