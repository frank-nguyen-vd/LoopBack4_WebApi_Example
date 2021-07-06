#!/bin/bash

while true; do
  # Start SQL Server Service
	/opt/mssql/bin/sqlservr &

	STATUS=1
	i=0

	# Checking heartbeat of SQL Server Service
	while [[ $STATUS -ne 0 ]] && [[ $i -lt 120 ]]; do
		i=$i+1
		/opt/mssql-tools/bin/sqlcmd -t 1 -U sa -P $MSSQL_SA_PASSWORD -Q "select 1"
		STATUS=$?
	done

	# If not heartbeat detected, exit
	if [ $STATUS -ne 0 ]; then 
		echo "Error: MSSQL SERVER took more than 120 seconds to start up."
		exit 1
	fi

	echo "======= MSSQL SERVER STARTED ========"

	echo "Restore database Pcms"  
	yesterday=`date -d '-1 day' '+%y%m%d'`
	/opt/mssql-tools/bin/sqlcmd -U sa -P $MSSQL_SA_PASSWORD -Q "CREATE DATABASE [Pcms]";
	/opt/mssql-tools/bin/sqlcmd -U sa -P $MSSQL_SA_PASSWORD -Q "RESTORE DATABASE [Pcms] FROM  DISK = N'/var/opt/mssql/data/Pcms$yesterday.bak' WITH RECOVERY, REPLACE, MOVE 'SampleDB' TO '/var/opt/mssql/data/Pcms_copy.mdf', MOVE 'SampleDB_log' TO '/var/opt/mssql/data/Pcms_log_copy.bak', STATS = 10;";

  echo "Start database auto backup service"
  bash db.autobackup.sh &

	while [ $? -eq 0 ]; do
		sleep 300;
		echo "Checking database heartbeat"
		(/opt/mssql-tools/bin/sqlcmd -U sa -P $MSSQL_SA_PASSWORD -Q "Use Pcms; Select * From TvInfo;" &) | grep Online -q
		if [ $? -ne 0 ]; then		  
			break;
		fi
	done;

  # Kill SQL Server Service
	pkill sqlservr;
	sleep 10;
done;