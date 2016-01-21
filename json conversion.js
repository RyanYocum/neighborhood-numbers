var fs = require('fs');

var crimeinput = JSON.parse(fs.readFileSync('./../crimes july.json', 'utf-8'));


for (var i = 0; i < crimeinput.length; i++) {
	if (!crimeinput[i].location_1) {
		continue;
	}
	crimeinput[i].location_2 = location_1[1];
	crimeinput[i].location_1 = location_1[0];
	if (crimeinput[i].crm_cd_desc === 'TRAFFIC DR #') {
		continue;
	}
	if (crimeinput[i].crm_cd_desc === 'THEFT OF IDENTITY') {
		crimeinput[i].crm_cd_desc = 'identity_theft';
	}
	else if (crimeinput[i].crm_cd_desc ==='DOCUMENT WORTHLESS ($200.01 & OVER)' || crimeinput[i].crm_cd_desc ==='DOCUMENT FORGERY / STOLEN FELONY' || crimeinput[i].crm_cd_desc ==='COUNTERFEIT' || crimeinput[i].crm_cd_desc === 'ATTEMPTED ROBBERY' || crimeinput[i].crm_cd_desc ==='BURGLARY' || crimeinput[i].crm_cd_desc ==='BURGLARY, ATTEMPTED' || crimeinput[i].crm_cd_desc ==='BURGLARY FROM VEHICLE' || crimeinput[i].crm_cd_desc ==='EMBEZZLEMENT, GRAND THEFT ($950.01 & OVER)' || crimeinput[i].crm_cd_desc ==='EXTORTION' ||crimeinput[i].crm_cd_desc === 'BIKE - STOLEN' || crimeinput[i].crm_cd_desc ==='BUNCO, GRAND THEFT' || crimeinput[i].crm_cd_desc ==='BUNCO, PETTY THEFT' ||crimeinput[i].crm_cd_desc === 'ROBBERY' || crimeinput[i].crm_cd_desc ==='SHOPLIFTING - PETTY THEFT ($950 & UNDER)' || crimeinput[i].crm_cd_desc ==='THEFT FROM MOTOR VEHICLE - GRAND ($400 AND OVER)' || crimeinput[i].crm_cd_desc ==='THEFT FROM MOTOR VEHICLE - PETTY ($950.01 & OVER)' || crimeinput[i].crm_cd_desc ==='THEFT-GRAND ($950.01 & OVER)EXCPT,GUNS,FOWL,LIVESTK,PROD' || crimeinput[i].crm_cd_desc ==='THEFT, PERSON' ||crimeinput[i].crm_cd_desc === 'THEFT PLAIN - ATTEMPT' || crimeinput[i].crm_cd_desc ==='THEFT PLAIN - PETTY ($950 & UNDER)' ) {
		crimeinput[i].crm_cd_desc = 'theft_burglary';
	}
	else if (crimeinput[i].crm_cd_desc ==='ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER' || crimeinput[i].crm_cd_desc ==='ASSSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT' || crimeinput[i].crm_cd_desc ==='BATTERY POLICE' || crimeinput[i].crm_cd_desc ==='BATTERY SIMPLE ASSAULT' || crimeinput[i].crm_cd_desc ==='BATTERY - SIMPLE ASSAULT' ||crimeinput[i].crm_cd_desc === 'CRIMINAL THREATS - NO WEAPON DISPLAYED' || crimeinput[i].crm_cd_desc ==='OTHER ASSAULT' || crimeinput[i].crm_cd_desc ==='SPOUSAL(COHAB) ABUSE - SIMPLE ASSAULT'  ) {
		crimeinput[i].crm_cd_desc = 'assault_battery';
	}
	else if (crimeinput[i].crm_cd_desc === 'VEHICLE - STOLEN') {
		crimeinput[i].crm_cd_desc = 'stolen_vehicle';
	}
	else if (crimeinput[i].crm_cd_desc === 'VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS)' ||crimeinput[i].crm_cd_desc === 'VANDALISM - MISDEAMEANOR ($399 OR UNDER)'  ) {
		crimeinput[i].crm_cd_desc = 'vandalism';
	}
	else if (crimeinput[i].crm_cd_desc ==='PEEPING TOM' || crimeinput[i].crm_cd_desc === 'BATTERY WITH SEXUAL CONTACT' ||crimeinput[i].crm_cd_desc === 'LETTERS LEWD' ||crimeinput[i].crm_cd_desc === 'ORAL COPULATION' ||crimeinput[i].crm_cd_desc === 'RAPE, FORCIBLE' ||crimeinput[i].crm_cd_desc === 'SEX OFFENDER REGISTRANT INCIDENT' || crimeinput[i].crm_cd_desc ==='SODOMY/SEXUAL CONTACT B/W PENIS OF ONE PERS TO ANUS OTH' || crimeinput[i].crm_cd_desc ==='STALKING' ) {
		crimeinput[i].crm_cd_desc = 'sexcrimes'
	}
	else {
		crimeinput[i].crm_cd_desc = 'othercrimes';
	}
	
}
	fs.writeFile('./crimes.json', JSON.stringify(crimeinput))


// fs.readFile('./../lapd stats july.json', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });