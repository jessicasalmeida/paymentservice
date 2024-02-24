const k8s = require('@kubernetes/client-node');
const { error } = require('console');
const { response } = require('express');
const fs = require('fs');
const { json } = require('stream/consumers');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const podManifest=`
apiVersion: v1
kind: Pod
metadata:
  name: fiap-restaurante-api
  labels:
    app: fiap-restaurante-api

spec:
  containers:
    - name: fiap-restaurante-api
      image: fiap/restaurante
      ports:
        - containerPort: 5000
`;

const podManifestJson = JSON.parse(JSON.stringify(k8s.loadYaml(podManifest)));

k8sApi.createNamespacedPod('default', podManifestJson)
.then((response)=>{
    console.log('Pod Criado com sucesso: ', response.body.metadata.name);
})
.catch((error) =>{
    console.error('Erro ao criar o pod', error);
});