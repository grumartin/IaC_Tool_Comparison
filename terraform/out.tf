output "web-server-dns" {
  value = aws_lb.alb-web-tier.dns_name
}
