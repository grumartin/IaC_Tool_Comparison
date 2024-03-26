import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {
  internet_gw_id,
  vpc_id,
  web_subnet1_id,
  web_subnet2_id,
} from "./index";

const config = new pulumi.Config();
const public_rt_name = config.require("public-rt-name");

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

const public_route_table = new aws.ec2.RouteTable("public-route-table", {
  vpcId: vpc_id,
  routes: [
    {
      cidrBlock: "0.0.0.0/0",
      gatewayId: internet_gw_id,
    },
  ],
  tags: {
    Name: public_rt_name,
  },
});

const pub_rt_association_1 = new aws.ec2.RouteTableAssociation(
  "pub-rt-association-1",
  {
    subnetId: web_subnet1_id,
    routeTableId: public_route_table.id,
  },
);

const pub_rt_association_2 = new aws.ec2.RouteTableAssociation(
  "pub-rt-association-2",
  {
    subnetId: web_subnet2_id,
    routeTableId: public_route_table.id,
  },
);
