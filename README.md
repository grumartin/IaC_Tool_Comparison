# Deployment

## Terraform
To deploy the terrafrom infrastructure navigate to the terrafrom folder.
Then execute the following command:

``
terraform apply -var-file=secret.tfvars
``

Before executing make sure that you installed terraform on your machine. 
By executing this command you can check if you installed terraform: 

``
terraform -version
``

To destroy the infrastructure type following command:

``
terraform destroy -var-file=secret.tfvars
``

## Pulumi
To deploy the pulumi infrastructure navigate to the pulumi folder.
Then execute the following command:

``
pulumi up
``

Before executing make sure that you installed pulumi on your machine.
By executing this command you can check if you installed pulumi:

``
pulumi version
``

To destroy the infrastructure type following command:

``
pulumi destroy
``




