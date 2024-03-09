# general
variable "region-name" {
  description = "AWS Region name"
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
variable "web-subnet1-cidr" {
  description = "CIDR Block for Web-tier Subnet-1"
}

variable "web-subnet1-name" {
  description = "Name for Web-tier Subnet-1"
}

variable "web-subnet2-cidr" {
  description = "CIDR Block for Web-tier Subnet-2"
}

variable "web-subnet2-name" {
  description = "Name for Web-tier Subnet-2"
}

variable "app-subnet1-cidr" {
  description = "CIDR Block for Application-tier Subnet-1"
}

variable "app-subnet1-name" {
  description = "Name for Application-tier Subnet-1"
}

variable "app-subnet2-cidr" {
  description = "CIDR Block for Application-tier Subnet-2"
}

variable "app-subnet2-name" {
  description = "Name for Application-tier Subnet-2"
}

variable "db-subnet1-cidr" {
  description = "CIDR Block for Database-tier Subnet-1"
}

variable "db-subnet1-name" {
  description = "Name for Database-tier Subnet-1"
}

variable "db-subnet2-cidr" {
  description = "CIDR Block for Database-tier Subnet-2"
}

variable "db-subnet2-name" {
  description = "Name for Database-tier Subnet-2"
}

# routing
variable "public-rt-name" {
  description = "Name for Public Route Table"
}

variable "private-rt-name" {
  description = "Name for Private Route Table"
}

# ec2
variable "launch-template-web-name" {
  description = "Name for Launch Template Web"
}

variable "image-id" {
  description = "AMI ID for EC2 Instances"
}

variable "instance-type" {
  description = "Instance type for EC2 Instances"
}

variable "web-instance-name" {
  description = "Name for Web Instances"
}

variable "launch-template-app-name" {
  description = "Name for Launch Template App"
}

variable "app-instance-name" {
  description = "Name for App Instances"
}

# alb
variable "alb-web-name" {
  description = "Name for the Load Balancer in the Web Tier"
}

variable "alb-sg-web-name" {
  description = "Name for Security Group of the Web Tier Load Balancer"
}

variable "asg-web-name" {
  description = "Name for the Auto Scaling Group in the Web Tier"
}

variable "asg-sg-web-name" {
  description = "Name for Security Group of the Web Tier Auto Scaling Group"
}

variable "tg-web-name" {
  description = "Name for Target Group in the Web Tier"
}

# alb
variable "alb-app-name" {
  description = "Name for the Load Balancer in the App Tier"
}

variable "alb-sg-app-name" {
  description = "Name for Security Group of the App Tier Load Balancer"
}

variable "asg-app-name" {
  description = "Name for the Auto Scaling Group in the App Tier"
}

variable "asg-sg-app-name" {
  description = "Name for Security Group of the App Tier Auto Scaling Group"
}

variable "tg-app-name" {
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

variable "db-sg-name" {
  description = "Name for Security Group of the Database"
}

variable "db-subnet-grp-name" {
  description = "Name for Database Subnet Group"
}

variable "app-db-sg-name" {
  description = "Name for Security Group of the App-DB Connection"
}
