resource "aws_launch_template" "template-web-tier" {
  name          = var.launch-template-web-tier-name
  instance_type = var.instance-type
  image_id      = var.image-id

  network_interfaces {
    device_index    = 0
    security_groups = [aws_security_group.asg-web-tier-sg.id]
  }

  user_data = filebase64("user-data.sh")
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
  image_id      = var.image-id

  network_interfaces {
    device_index    = 0
    security_groups = [aws_security_group.asg-app-tier-sg.id]
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = var.app-instance-name
    }
  }
}
