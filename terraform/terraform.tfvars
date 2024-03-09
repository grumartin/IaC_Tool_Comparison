# general
region-name = "eu-central-1"
az-1        = "eu-central-1a"
az-2        = "eu-central-1b"

# vpc
vpc-cidr-block = "10.0.0.0/16"
vpc-name       = "stack-3tier-vpc"

# subnet
web-subnet1-cidr = "10.0.1.0/24"
web-subnet1-name = "stack-3tier-web-sn-1"
web-subnet2-cidr = "10.0.2.0/24"
web-subnet2-name = "stack-3tier-web-sn-2"
app-subnet1-cidr = "10.0.3.0/24"
app-subnet1-name = "stack-3tier-app-sn-1"
app-subnet2-cidr = "10.0.4.0/24"
app-subnet2-name = "stack-3tier-app-sn-2"
db-subnet1-cidr  = "10.0.5.0/24"
db-subnet1-name  = "stack-3tier-db-sn-1"
db-subnet2-cidr  = "10.0.6.0/24"
db-subnet2-name  = "stack-3tier-db-sn-2"

# routing
igw-name        = "stack-3tier-igw"
public-rt-name  = "stack-3tier-public-rt-table"
private-rt-name = "stack-3tier-private-rt-table"

# ec2
launch-template-web-name = "stack-3tier-launch-template-web"
image-id                 = "ami-03484a09b43a06725"
instance-type            = "t2.micro"
web-instance-name        = "stack-3tier-web-instances"
launch-template-app-name = "stack-3tier-launch-template-app"
app-instance-name        = "stack-3tier-app-instances"

# alb
alb-web-name    = "stack-3tier-alb-web"
alb-sg-web-name = "stack-3tier-alb-sg-web"
tg-web-name     = "stack-3tier-tg-web"
alb-app-name    = "stack-3tier-alb-app"
alb-sg-app-name = "stack-3tier-alb-sg-app"
tg-app-name     = "stack-3tier-tg-app"

# asg
asg-web-name    = "stack-3tier-asg-web"
asg-sg-web-name = "stack-3tier-asg-sg-web"
asg-app-name    = "stack-3tier-asg-app"
asg-sg-app-name = "stack-3tier-asg-sg-app"

# db
db-name            = "postgres_instance"
instance-class     = "db.t3.micro"
db-sg-name         = "stack-3tier-db-sg"
db-subnet-grp-name = "stack-3tier-db-sn-grp"
app-db-sg-name     = "stack-3tier-app-db"
