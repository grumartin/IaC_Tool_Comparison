resource "aws_subnet" "web-tier-subnet-one" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.web-tier-subnet-one-cidr
  availability_zone       = var.az-1
  map_public_ip_on_launch = true

  tags = {
    Name = var.web-tier-subnet-one-name
  }
}

resource "aws_subnet" "web-tier-subnet-two" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.web-tier-subnet-two-cidr
  availability_zone       = var.az-2
  map_public_ip_on_launch = true

  tags = {
    Name = var.web-tier-subnet-two-name
  }
}

resource "aws_subnet" "app-tier-subnet-one" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.app-tier-subnet-one-cidr
  availability_zone       = var.az-1
  map_public_ip_on_launch = false

  tags = {
    Name = var.app-tier-subnet-one-name
  }
}

resource "aws_subnet" "app-tier-subnet-two" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.app-tier-subnet-two-cidr
  availability_zone       = var.az-2
  map_public_ip_on_launch = false

  tags = {
    Name = var.app-tier-subnet-two-name
  }
}

resource "aws_subnet" "db-tier-subnet-one" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.db-tier-subnet-one-cidr
  availability_zone       = var.az-1
  map_public_ip_on_launch = false

  tags = {
    Name = var.db-tier-subnet-one-name
  }
}

resource "aws_subnet" "db-tier-subnet-two" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.db-tier-subnet-two-cidr
  availability_zone       = var.az-2
  map_public_ip_on_launch = true

  tags = {
    Name = var.db-tier-subnet-two-name
  }
}
