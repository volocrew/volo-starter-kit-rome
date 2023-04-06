if [ -f "user.zip" ]; then
    rm ./user.zip
fi

rm -rf dist/
mkdir dist
mkdir dist/src

cp ./src/lambda_function.py ./dist/lambda_function.py

cd dist

zip -r user.zip ./
cp user.zip ../../../dist
mv user.zip ../
