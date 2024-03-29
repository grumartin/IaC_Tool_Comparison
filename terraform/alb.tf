resource "aws_lb" "alb-web-tier" {
  name               = var.alb-web-tier-name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb-web-tier-sg.id]
  subnets            = [aws_subnet.web-tier-subnet-one.id, aws_subnet.web-tier-subnet-two.id]
}

resource "aws_security_group" "alb-web-tier-sg" {
  name        = var.alb-sg-web-tier-name
  description = "Application Load Balancer Security Group"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.alb-sg-web-tier-name
  }
}

resource "aws_lb_target_group" "alb-web-tier-tg" {
  name     = var.tg-web-tier-name
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.vpc.id
}

resource "aws_lb_listener" "alb-web-tier-listener" {
  load_balancer_arn = aws_lb.alb-web-tier.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb-web-tier-tg.arn
  }
}

resource "aws_lb" "alb-app-tier" {
  name               = var.alb-app-tier-name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb-app-tier-sg.id]
  subnets            = [aws_subnet.app-tier-subnet-one.id, aws_subnet.app-tier-subnet-two.id]
}

resource "aws_security_group" "alb-app-tier-sg" {
  name        = var.alb-sg-app-tier-name
  description = "Application Load Balancer Security Group"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "TCP"
    security_groups = [aws_security_group.asg-web-tier-sg.id]
  }

  ingress {
    from_port        = 3000
    to_port          = 3000
    protocol         = "tcp"
    security_groups = [aws_security_group.asg-web-tier-sg.id]
  }

  ingress {
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    security_groups = [aws_security_group.asg-web-tier-sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.alb-sg-app-tier-name
  }
}

resource "aws_lb_target_group" "alb-app-tier-tg" {
  name     = var.tg-app-tier-name
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.vpc.id
}

resource "aws_lb_listener" "alb-app-tier-listener" {
  load_balancer_arn = aws_lb.alb-app-tier.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb-app-tier-tg.arn
  }
}
