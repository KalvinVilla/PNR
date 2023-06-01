
<p align=center>
  <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript"><img src="https://img.shields.io/badge/Language-JS-green" alt="JS Project"/></a>
   <a href="https://github.com/KalvinVilla/PNR"><img src="https://img.shields.io/badge/Version-1.1.0-blue" alt="PNR Version"/></a>
</p>

# PNR (Periodic Network Report)
PNR use 3 tool of supervision :
 - <a href="https://www.zabbix.com/">Zabbix</a>
 - <a href="https://github.com/influxdata/telegraf/tree/master/plugins/inputs/syslog">Syslog server</a>
 - <a href="https://github.com/influxdata/telegraf/blob/master/plugins/inputs/sflow/README.md">Sflow server</a>

to create a simple html report, this report can be stored or/and sended by mail

## Requirements
- NodeJS `>= 18.12`
- npm
- zabbix/syslog/sflow servers

##  Installation
**A package will coming soon, for the moment you need to clone the project**
```
git clone https://github.com/KalvinVilla/PNR.git
cd pnr
npm install
```
Don't forget to change the config file and port file :
### Linux
```
move .env.example .env
move port.json.example port.json
nano .env
```

### Windows
```
rename .env.example .env
rename port.json.example port.json
notepad .env
```

## Daily report 
- Global
	- Zabbix problems
	- Logs
	- Traffic
- Zabbix
	- Top CPU
	- Top RAM
	- Top events
- Syslog
	- Top hostname
	- Top appname
- Sflow
	- Top protocols
## Monthly report
The mounthly report will take our data to the local database, this database will store every data of daily report It will be more simple to processing

<p align="center"><strong>Comming soon</strong></p>
