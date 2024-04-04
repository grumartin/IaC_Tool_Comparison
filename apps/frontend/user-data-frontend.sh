#!/bin/bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user
aws ecr get-login-password --region ${region}  | docker login --username AWS --password-stdin ${ecr_url}
docker run --restart always -e ALB_DNS=${alb_dns} -p 3000:3000 -d ${image_name}
