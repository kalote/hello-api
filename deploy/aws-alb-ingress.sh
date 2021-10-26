#!/bin/bash
set +x
hash eksctl 2>/dev/null || { echo >&2 "eksctl required but not installed."; exit 1; }
hash kubectl 2>/dev/null || { echo >&2 "kubectl required but not installed."; exit 1; }
hash aws 2>/dev/null || { echo >&2 "aws required but not installed."; exit 1; }
eksctl utils associate-iam-oidc-provider --cluster=hello-api-cluster --approve
kubectl apply -f aws-alb-ingress/rbac-role.yaml
eksctl create iamserviceaccount \
  --cluster=hello-api-cluster \
  --namespace=kube-system \
  --name=alb-ingress-controller \
  --attach-policy-arn=$(terraform output -raw alb_ingress_policy) \
  --override-existing-serviceaccounts \
  --approve
kubectl apply -f aws-alb-ingress/alb-ingress-controller.yaml
