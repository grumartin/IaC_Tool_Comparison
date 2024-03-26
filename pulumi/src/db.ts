import * as aws from "@pulumi/aws";
import {
  vpc_id,
  asg_security_group_app_id,
  db_subnet1_id,
  db_subnet2_id,
} from "./index";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const db_username = config.requireSecret("db-username");
const db_password = config.requireSecret("db-password");
const db_name = config.require("db-name");
const instance_class = config.require("instance-class");
const db_sg_name = config.require("db-sg-name");
const db_subnet_grp_name = config.require("db-subnet-grp-name");

const db_sg = new aws.ec2.SecurityGroup("db-sg", {
  name: db_sg_name,
  description: "DB Security Group",
  vpcId: vpc_id,
  ingress: [
    {
      fromPort: 5432,
      toPort: 5432,
      protocol: "tcp",
      securityGroups: [asg_security_group_app_id],
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

const subnet_grp = new aws.rds.SubnetGroup("subnet-grp", {
  name: db_subnet_grp_name,
  subnetIds: [db_subnet1_id, db_subnet2_id],
  tags: {
    Name: db_subnet_grp_name,
  },
});

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
