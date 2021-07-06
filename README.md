# HOW TO TEST API

### Step 1: [Download]( https://docs.docker.com/docker-for-windows/install/) and install Docker Desktop (for Windows)  

### Step 2:
* Run Docker Desktop
* Right-click on Docker icon in the taskbar and choose "Switch it to Linux Container..."

### Step 3: Clone the project code
i.e clone the project in C driver
```
cd C:\
git clone https://github.com/T2HOPETECHNIK/PCMS.git
```

### Step 4: Test API with unit tests and Postman scripts
* Open a terminal inside API folder, i.e `cd C:\PMCS\api`  
* In the command line, type: `npm run test:report`. Please wait patiently until the process finishes. It takes around 1 minute to complete.  
* The test result is saved in folder `test-report`  
