#!/bin/bash
docker run \
    --rm \
    -e SONAR_HOST_URL="http://172.17.0.2:9000" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=iac-study" \
    -e SONAR_TOKEN="sqp_f8596f7da166189f73d10213238dce1dd1760570" \
    -v "/mnt/c/Users/martin/Workspaces/IaC_Tool_Comparison:/usr/src" \
    sonarsource/sonar-scanner-cli
