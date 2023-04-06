if [ -f "application.zip" ]; then
    rm ./application.zip
fi

rm -rf dist/
mkdir dist
mkdir dist/src

cp ./src/lambda_function.py ./dist/lambda_function.py

cd dist

zip -r application.zip ./
cp application.zip ../../../dist
mv application.zip ../
