resource "aws_ecr_repository" "frontend" {
  name = var.ecr-frontend-repo-name
}

resource "aws_ecr_repository" "backend" {
  name = var.ecr-backend-repo-name
}

resource "docker_registry_image" "frontend" {
  name = "${aws_ecr_repository.frontend.repository_url}:latest"

  build {
    context = var.frontend-image-path
  }
}

resource "docker_registry_image" "backend" {
  name = "${aws_ecr_repository.backend.repository_url}:latest"

  build {
    context = var.backend-image-path
  }
}
