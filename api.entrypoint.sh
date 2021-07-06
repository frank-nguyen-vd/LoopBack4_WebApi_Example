#!/bin/bash
npm run-script clean;
npm run-script build;

while true;
do  
    sleep 30;    
    npm run-script migrate;
    if [ $? = 0 ]
    then
        break;
    fi
done;

while true;
do 
    npm start;
    sleep 30;
done
