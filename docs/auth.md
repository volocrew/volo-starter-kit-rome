### Force change password cognito

#### Generate token

aws cognito-idp admin-initiate-auth --user-pool-id us-east-1_kRvq07Vet --client-id 6othtlp758eg85dpblnk7hpc4e --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=zach@volocrew.com,PASSWORD=Test123! --profile voloapps_user --region us-east-1

#### Force change

aws cognito-idp admin-respond-to-auth-challenge --user-pool-id us-east-1_kRvq07Vet --client-id 6othtlp758eg85dpblnk7hpc4e --challenge-name NEW_PASSWORD_REQUIRED --challenge-responses NEW_PASSWORD=Test123\!,USERNAME=zach@volocrew.com --profile voloapps_user --region us-east-1 --session
