import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { vpc_id } from "./alb";

const config = new pulumi.Config();
const az_1 = config.require("az-1");
const az_2 = config.require("az-2");
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

export const web_subnet1 = new aws.ec2.Subnet("web-subnet1", {
  vpcId: vpc_id,
  cidrBlock: web_subnet1_cidr,
  availabilityZone: az_1,
  mapPublicIpOnLaunch: true,
  tags: {
    Name: web_subnet1_name,
  },
});

export const web_subnet2 = new aws.ec2.Subnet("web-subnet2", {
  vpcId: vpc_id,
  cidrBlock: web_subnet2_cidr,
  availabilityZone: az_2,
  mapPublicIpOnLaunch: true,
  tags: {
    Name: web_subnet2_name,
  },
});

export const app_subnet1 = new aws.ec2.Subnet("app-subnet1", {
  vpcId: vpc_id,
  cidrBlock: app_subnet1_cidr,
  availabilityZone: az_1,
  mapPublicIpOnLaunch: false,
  tags: {
    Name: app_subnet1_name,
  },
});

export const app_subnet2 = new aws.ec2.Subnet("app-subnet2", {
  vpcId: vpc_id,
  cidrBlock: app_subnet2_cidr,
  availabilityZone: az_2,
  mapPublicIpOnLaunch: false,
  tags: {
    Name: app_subnet2_name,
  },
});

export const db_subnet1 = new aws.ec2.Subnet("db-subnet1", {
  vpcId: vpc_id,
  cidrBlock: db_subnet1_cidr,
  availabilityZone: az_1,
  mapPublicIpOnLaunch: false,
  tags: {
    Name: db_subnet1_name,
  },
});

export const db_subnet2 = new aws.ec2.Subnet("db-subnet2", {
  vpcId: vpc_id,
  cidrBlock: db_subnet2_cidr,
  availabilityZone: az_2,
  mapPublicIpOnLaunch: true,
  tags: {
    Name: db_subnet2_name,
  },
});

export const web_subnet1_id = web_subnet1.id;
export const web_subnet2_id = web_subnet2.id;
export const app_subnet1_id = app_subnet1.id;
export const app_subnet2_id = app_subnet2.id;
export const db_subnet1_id = db_subnet1.id;
export const db_subnet2_id = db_subnet2.id;
