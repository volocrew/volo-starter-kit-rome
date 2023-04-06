if [ -f "userAppsync.zip" ]; then
    rm ./userAppsync.zip
fi

rm -rf dist/
mkdir dist
mkdir dist/src

cp ./src/lambda_function.py ./dist/lambda_function.py

cd dist

zip -r userAppsync.zip ./
cp userAppsync.zip ../../../dist
mv userAppsync.zip ../
