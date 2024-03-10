# general
variable "region" {
  description = "AWS Region"
}

variable "az-1" {
  description = "Availability Zone 1"
}

variable "az-2" {
  description = "Availability Zone 2"
}

# vpc
variable "vpc-cidr-block" {
  description = "CIDR Block for the Virtual Private Cloud"
}

variable "vpc-name" {
  description = "Name for the Virtual Private Cloud"
}

# igw
variable "igw-name" {
  description = "Name for the Internet Gateway"
}

# subnet
variable "web-tier-subnet-one-cidr" {
  description = "CIDR Block for Web-tier Subnet-1"
}

variable "web-tier-subnet-one-name" {
  description = "Name for Web-tier Subnet-1"
}

variable "web-tier-subnet-two-cidr" {
  description = "CIDR Block for Web-tier Subnet-2"
}

variable "web-tier-subnet-two-name" {
  description = "Name for Web-tier Subnet-2"
}

variable "app-tier-subnet-one-cidr" {
  description = "CIDR Block for Application-tier Subnet-1"
}

variable "app-tier-subnet-one-name" {
  description = "Name for Application-tier Subnet-1"
}

variable "app-tier-subnet-two-cidr" {
  description = "CIDR Block for Application-tier Subnet-2"
}

variable "app-tier-subnet-two-name" {
  description = "Name for Application-tier Subnet-2"
}

variable "db-tier-subnet-one-cidr" {
  description = "CIDR Block for Database-tier Subnet-1"
}

variable "db-tier-subnet-one-name" {
  description = "Name for Database-tier Subnet-1"
}

variable "db-tier-subnet-two-cidr" {
  description = "CIDR Block for Database-tier Subnet-2"
}

variable "db-tier-subnet-two-name" {
  description = "Name for Database-tier Subnet-2"
}

# routing
variable "public-route-name" {
  description = "Name for Public Route Table"
}

/*
variable "private-route-name" {
  description = "Name for Private Route Table"
}
*/

# ec2
variable "launch-template-web-tier-name" {
  description = "Name for Launch Template Web"
}

variable "web-instance-name" {
  description = "Name for Web Instances"
}

variable "launch-template-app-tier-name" {
  description = "Name for Launch Template App"
}

variable "app-instance-name" {
  description = "Name for App Instances"
}

variable "image-id" {
  description = "AMI ID for EC2 Instances"
}

variable "instance-type" {
  description = "Instance type for EC2 Instances"
}

# alb
variable "alb-web-tier-name" {
  description = "Name for the Load Balancer in the Web Tier"
}

variable "alb-sg-web-tier-name" {
  description = "Name for Security Group of the Web Tier Load Balancer"
}

variable "asg-web-tier-name" {
  description = "Name for the Auto Scaling Group in the Web Tier"
}

variable "asg-sg-web-tier-name" {
  description = "Name for Security Group of the Web Tier Auto Scaling Group"
}

variable "tg-web-tier-name" {
  description = "Name for Target Group in the Web Tier"
}

# alb
variable "alb-app-tier-name" {
  description = "Name for the Load Balancer in the App Tier"
}

variable "alb-sg-app-tier-name" {
  description = "Name for Security Group of the App Tier Load Balancer"
}

variable "asg-app-tier-name" {
  description = "Name for the Auto Scaling Group in the App Tier"
}

variable "asg-sg-app-tier-name" {
  description = "Name for Security Group of the App Tier Auto Scaling Group"
}

variable "tg-app-tier-name" {
  description = "Name for Target Group in the App Tier"
}

# db
variable "db-username" {
  description = "Username for the Database Instance"
}

variable "db-password" {
  description = "Password for the Database Instance"
}

variable "db-name" {
  description = "Name for the Database"
}

variable "instance-class" {
  description = "Instance class for the Database Instance"
}

variable "db-tier-sg-name" {
  description = "Name for Security Group of the Database"
}

variable "db-tier-sn-group-name" {
  description = "Name for Database Subnet Group"
}
