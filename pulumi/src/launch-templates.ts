import * as aws from "@pulumi/aws";
import * as std from "@pulumi/std";
import * as pulumi from "@pulumi/pulumi";
import { asg_security_group_app_id, asg_security_group_web_id } from "./index";

const config = new pulumi.Config();
const launch_template_web_name = config.require("launch-template-web-name");
const image_id = config.require("image-id");
const instance_type = config.require("instance-type");
const web_instance_name = config.require("web-instance-name");
const launch_template_app_name = config.require("launch-template-app-name");
const app_instance_name = config.require("app-instance-name");

export const template_app = new aws.ec2.LaunchTemplate("template-app", {
  name: launch_template_app_name,
  imageId: image_id,
  instanceType: instance_type,
  networkInterfaces: [
    {
      deviceIndex: 0,
      securityGroups: [asg_security_group_app_id],
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

export const template_web = new aws.ec2.LaunchTemplate("template-web", {
  name: launch_template_web_name,
  imageId: image_id,
  instanceType: instance_type,
  networkInterfaces: [
    {
      deviceIndex: 0,
      securityGroups: [asg_security_group_web_id],
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

export const template_web_id = template_web.id;
export const template_app_id = template_app.id;
