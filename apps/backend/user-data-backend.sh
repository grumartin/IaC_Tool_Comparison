#!/bin/bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user
aws ecr get-login-password --region ${region}  | docker login --username AWS --password-stdin ${ecr_url}
docker run -p 3000:3000 --restart always -e RDS_HOSTNAME=${db_hostname} -e RDS_USERNAME=${db_username} -e RDS_PASSWORD=${db_password} -e RDS_PORT=${db_port} -e RDS_DB_NAME=${db_name} -d ${image_name}
