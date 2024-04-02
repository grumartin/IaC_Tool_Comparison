resource "aws_autoscaling_group" "asg-web-tier" {
  name                = var.asg-web-tier-name
  min_size            = 1
  max_size            = 4
  desired_capacity    = 2
  health_check_type   = "EC2"
  health_check_grace_period = 60
  target_group_arns   = [aws_lb_target_group.alb-web-tier-tg.arn]
  vpc_zone_identifier = [aws_subnet.web-tier-subnet-one.id, aws_subnet.web-tier-subnet-two.id]

  launch_template {
    id      = aws_launch_template.template-web-tier.id
    version = aws_launch_template.template-web-tier.latest_version
  }
}

resource "aws_security_group" "asg-web-tier-sg" {
  name        = var.asg-sg-web-tier-name
  description = "Auto Scaling Group Security Group"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    security_groups = [aws_security_group.alb-web-tier-sg.id]
  }

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    security_groups = [aws_security_group.alb-web-tier-sg.id]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.asg-sg-web-tier-name
  }
}

resource "aws_autoscaling_group" "asg-app-tier" {
  name                = var.asg-app-tier-name
  min_size            = 1
  max_size            = 4
  desired_capacity    = 2
  health_check_type   = "EC2"
  health_check_grace_period = 60
  target_group_arns   = [aws_lb_target_group.alb-app-tier-tg.arn]
  vpc_zone_identifier = [aws_subnet.app-tier-subnet-one.id, aws_subnet.app-tier-subnet-two.id]

  launch_template {
    id      = aws_launch_template.template-app-tier.id
    version = aws_launch_template.template-app-tier.latest_version
  }
}

resource "aws_security_group" "asg-app-tier-sg" {
  name        = var.asg-sg-app-tier-name
  description = "Auto Scaling Group Security Group"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "TCP"
    security_groups = [aws_security_group.alb-app-tier-sg.id]
  }

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "TCP"
    security_groups = [aws_security_group.alb-app-tier-sg.id]
  }

  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "TCP"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.asg-sg-app-tier-name
  }
}
