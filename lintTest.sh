echo "##################################"
echo "##########Testing CLIENT##########"
echo "##################################"

pushd client
npm install
echo "##########lint test##########"
npm run lint 
echo "##########coverage test##########"
npm run coverage 
popd

echo "##################################"
echo "##########Testing SERVER##########"
echo "##################################"

pushd server
npm install
echo "##########lint test##########"
npm run lint
echo "##########coverage test##########"
npm run coverage
popd
