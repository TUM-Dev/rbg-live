cd frontend-react
npm install
npm run build
rm -r ../backend-django/static/js
rm -r ../backend-django/static/assets
cp -rf ./build/static/js ../backend-django/static/js
cp -rf ./public/static/assets ../backend-django/static/assets

cd ..
python3 build.py
rm -r frontend-react/build
echo "Successfully deployed to Django!"