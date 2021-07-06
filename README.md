# HOW TO RUN API

```
docker-compose up
```

# HOW TO TEST API

### Step 1: Install Node Version Management (NVM)
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
```

### Step 2: Enable Node version 12
```
nvm install 12
nvm use 12
```

### Step 3: Install dependencies
```
npm i -g @loopback/cli
npm i
```

### Step 4: Test API with unit tests and Postman scripts
* In the command line, type: `npm run test:report`. Please wait patiently until the process finishes. It takes around 1 minute to complete.  
* The test result is saved in folder `test-report`  
