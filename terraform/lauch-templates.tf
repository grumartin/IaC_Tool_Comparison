data "aws_ami" "amazon_linux_2" {
  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}

resource "aws_iam_role" "role" {
  name = "allow_ec2_access_ecr"
  path = "/"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
}

resource "aws_iam_role_policy" "access_ecr_policy" {
  name = "allow_ec2_access_ecr"
  role = aws_iam_role.role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ecr:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_instance_profile" "ec2_ecr_connection" {
  name = "ec2_ecr_connection"
  role = aws_iam_role.role.name
}

resource "aws_launch_template" "template-web-tier" {
  name          = var.launch-template-web-tier-name
  instance_type = var.instance-type

  network_interfaces {
    associate_public_ip_address = true
    security_groups = [aws_security_group.asg-web-tier-sg.id]
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_ecr_connection.name
  }

  image_id      = data.aws_ami.amazon_linux_2.id

  block_device_mappings {
    device_name = "/dev/xvda"

    ebs {
      volume_size = 8
    }
  }

  user_data = base64encode(templatefile(var.frontend-user-data-path, {
    application_load_balancer = aws_lb.alb-app-tier.dns_name,
    ecr_url                   = local.aws_ecr_url,
    image_name                = "${aws_ecr_repository.frontend.repository_url}:latest"
    region                    = var.region
  }))

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = var.web-instance-name
    }
  }
}

resource "aws_launch_template" "template-app-tier" {
  name          = var.launch-template-app-tier-name
  instance_type = var.instance-type

  network_interfaces {
    associate_public_ip_address = false
    security_groups = [aws_security_group.asg-app-tier-sg.id]
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_ecr_connection.name
  }

  image_id      = data.aws_ami.amazon_linux_2.id

  block_device_mappings {
    device_name = "/dev/xvda"

    ebs {
      volume_size = 8
    }
  }

  user_data = base64encode(templatefile(var.backend-user-data-path, {
    db_hostname = aws_db_instance.db.address,
    db_username = aws_db_instance.db.username,
    db_password = aws_db_instance.db.password,
    db_port     = aws_db_instance.db.port,
    db_name     = aws_db_instance.db.db_name,
    ecr_url     = local.aws_ecr_url,
    image_name  = "${aws_ecr_repository.backend.repository_url}:latest"
    region      = var.region
  }))

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = var.app-instance-name
    }
  }

  depends_on = [
    aws_nat_gateway.nat-gw
  ]
}
