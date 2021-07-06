	while true; do
		sleep 86400;
		curr_date=`date +"%y%m%d"`
		/opt/mssql-tools/bin/sqlcmd -U sa -P $MSSQL_SA_PASSWORD -Q "BACKUP DATABASE Pcms TO DISK = N'/var/opt/mssql/data/Pcms$curr_date.bak' WITH COPY_ONLY, FORMAT, INIT, STATS = 10;";		
		if [ $? -ne 0 ]; then
		  pkill sqlservr;
			break;
		fi
	done;

	