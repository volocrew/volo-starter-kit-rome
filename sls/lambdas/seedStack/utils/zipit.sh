if [ -f "seedStack.zip" ]; then
    rm ./seedStack.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r seedStack.zip ./
cp seedStack.zip ../../../dist
mv seedStack.zip ../
