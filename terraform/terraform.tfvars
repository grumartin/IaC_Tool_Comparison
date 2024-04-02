# general
region = "eu-central-1"
az-1   = "eu-central-1a"
az-2   = "eu-central-1b"

# vpc
vpc-cidr-block = "10.0.0.0/16"
vpc-name       = "stack-3tier-vpc"
ngw-name = "stack-3tier-nat-gw"

# subnet
web-tier-subnet-one-cidr = "10.0.1.0/24"
web-tier-subnet-one-name = "stack-3tier-web-sn-1"
web-tier-subnet-two-cidr = "10.0.2.0/24"
web-tier-subnet-two-name = "stack-3tier-web-sn-2"
app-tier-subnet-one-cidr = "10.0.3.0/24"
app-tier-subnet-one-name = "stack-3tier-app-sn-1"
app-tier-subnet-two-cidr = "10.0.4.0/24"
app-tier-subnet-two-name = "stack-3tier-app-sn-2"
db-tier-subnet-one-cidr  = "10.0.5.0/24"
db-tier-subnet-one-name  = "stack-3tier-db-sn-1"
db-tier-subnet-two-cidr  = "10.0.6.0/24"
db-tier-subnet-two-name  = "stack-3tier-db-sn-2"

# routing
igw-name           = "stack-3tier-igw"
public-route-name  = "stack-3tier-public-route-table"
private-route-name = "stack-3tier-private-route-table"

# ec2
launch-template-web-tier-name = "stack-3tier-launch-template-web"
web-instance-name             = "stack-3tier-web-instances"
launch-template-app-tier-name = "stack-3tier-launch-template-app"
app-instance-name             = "stack-3tier-app-instances"
instance-type                 = "t2.micro"

# alb
alb-web-tier-name    = "stack-3tier-alb-web"
alb-sg-web-tier-name = "stack-3tier-alb-sg-web"
tg-web-tier-name     = "stack-3tier-tg-web"
alb-app-tier-name    = "stack-3tier-alb-app"
alb-sg-app-tier-name = "stack-3tier-alb-sg-app"
tg-app-tier-name     = "stack-3tier-tg-app"

# asg
asg-web-tier-name    = "stack-3tier-asg-web"
asg-sg-web-tier-name = "stack-3tier-asg-sg-web"
asg-app-tier-name    = "stack-3tier-asg-app"
asg-sg-app-tier-name = "stack-3tier-asg-sg-app"

# db
db-name               = "postgres_instance"
instance-class        = "db.t3.micro"
db-tier-sg-name       = "stack-3tier-db-sg"
db-tier-sn-group-name = "stack-3tier-db-sn-grp"

# ecr
ecr-frontend-repo-name  = "stack-3tier-ecr-repo-frontend"
frontend-image-path     = "../apps/express-frontend"
frontend-user-data-path = "../apps/express-frontend/user-data-frontend.sh"
ecr-backend-repo-name   = "stack-3tier-ecr-repo-backend"
backend-image-path      = "../apps/backend"
backend-user-data-path  = "../apps/backend/user-data-backend.sh"
