cd mini-project

echo "############# Installing Node Modules #############"
npm i

echo "############# Creating ENV File #############"
cp .env.sample .env

echo "############# Initializing Database #############"
npx prisma migrate dev --name "init"

npx prisma db seed

echo "############# Setting-up Application #############"

rm -rf dist

npm run build

echo "############# Deploying the Application #############"

serverless deploy --stage local