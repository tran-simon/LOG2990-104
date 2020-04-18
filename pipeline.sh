echo 'Merging develop'
git pull
git merge origin/develop

echo 'Pipeline for client'
pushd client
npm install
npm run build:prod
npm run lint
npm run coverage 
popd

echo 'Pipeline for Server'
pushd server
npm install
npm run lint
npm run coverage
popd
