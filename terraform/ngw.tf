resource "aws_nat_gateway" "nat-gw" {
  allocation_id     = aws_eip.eip.id
  connectivity_type = "public"
  subnet_id         = aws_subnet.web-tier-subnet-one.id

  tags = {
    Name = var.ngw-name
  }
  depends_on    = [aws_internet_gateway.igw]
}
