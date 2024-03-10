resource "aws_db_instance" "db" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "16.2"
  db_name                = var.db-name
  instance_class         = var.instance-class
  username               = var.db-username
  password               = var.db-password
  parameter_group_name   = "default.postgres16"
  skip_final_snapshot    = true
  db_subnet_group_name   = aws_db_subnet_group.db-tier-sn-group.name
  vpc_security_group_ids = [aws_security_group.db-tier-sg.id]
}

resource "aws_security_group" "db-tier-sg" {
  name        = var.db-tier-sg-name
  description = "Database Security Group"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.asg-app-tier-sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.db-tier-sg-name
  }
}

resource "aws_db_subnet_group" "db-tier-sn-group" {
  name       = var.db-tier-sn-group-name
  subnet_ids = [aws_subnet.db-tier-subnet-one.id, aws_subnet.db-tier-subnet-two.id]

  tags = {
    Name = var.db-tier-sn-group-name
  }
}

