resource "aws_db_instance" "rds-db" {
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
  db_subnet_group_name   = aws_db_subnet_group.subnet-grp.name
  vpc_security_group_ids = [aws_security_group.db-sg.id]
}
