
start docker-compose up & ^
timeout 10 & ^
npm run clean & ^
npm run build & ^
npm run migrate:rebuild & ^
start npm start & ^
timeout 10 & ^
npm run test & ^
npx newman run src/__tests__/acceptance/api_server.postman_collection.json --insecure newman -r htmlextra --reporter-htmlextra-export test-report/api-postman-tests.html  & ^
docker-compose down & ^
taskkill /im cmd.exe /fi "WINDOWTITLE eq npm*"


