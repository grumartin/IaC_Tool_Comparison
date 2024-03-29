resource "aws_route_table" "public-route-table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = var.public-route-name
  }
}

resource "aws_route_table_association" "public-route-association-one" {
  subnet_id      = aws_subnet.web-tier-subnet-one.id
  route_table_id = aws_route_table.public-route-table.id
}

resource "aws_route_table_association" "public-route-association-two" {
  subnet_id      = aws_subnet.web-tier-subnet-two.id
  route_table_id = aws_route_table.public-route-table.id
}

resource "aws_route_table" "private-route-table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.nat-gw.id
  }

  tags = {
    Name = var.private-route-name
  }
}

resource "aws_route_table_association" "private-route-association-one" {
  subnet_id      = aws_subnet.app-tier-subnet-one.id
  route_table_id = aws_route_table.private-route-table.id
}

resource "aws_route_table_association" "private-route-association-two" {
  subnet_id      = aws_subnet.app-tier-subnet-two.id
  route_table_id = aws_route_table.private-route-table.id
}

