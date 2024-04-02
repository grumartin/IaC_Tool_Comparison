#!/bin/bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user
aws ecr get-login-password --region ${region}  | docker login --username AWS --password-stdin ${ecr_url}
docker run --restart always -e DB_HOSTNAME=${db_hostname} -e DB_USERNAME=${db_username} -e DB_PASSWORD=${db_password} -e DB_PORT=${db_port} -e DB_NAME=${db_name} -p 3000:3000 -d ${image_name}
