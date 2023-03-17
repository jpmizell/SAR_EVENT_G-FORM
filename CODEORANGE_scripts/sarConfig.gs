sarConfig.gs

function sarConfig() {  
  let sarConfigurations = {
    searchLogFormulaYear: '=IF(ISBLANK(INDIRECT(ADDRESS(ROW(),2,4))),"?", YEAR(INDIRECT(ADDRESS(ROW(),2,4))))',
    searchLogFormulaMPAge: '=IF(ISBLANK(INDIRECT(ADDRESS(ROW(),11,4))),"?", IF(ROUNDDOWN(YEARFRAC(INDIRECT(ADDRESS(ROW(),11,4)),INDIRECT(ADDRESS(ROW(),2,4))),0)>100,"?",ROUNDDOWN(YEARFRAC(INDIRECT(ADDRESS(ROW(),11,4)),INDIRECT(ADDRESS(ROW(),2,4))),0)))',
    searchLogFormulaLKPLat: '=IFERROR(LEFT(INDIRECT(ADDRESS(ROW(),18,4)),FIND(",",INDIRECT(ADDRESS(ROW(),18,4)))-1),"")',
    searchLogFormulaLKPLong: '=IFERROR(RIGHT(INDIRECT(ADDRESS(ROW(),18,4)),LEN(INDIRECT(ADDRESS(ROW(),25,4)))+2),"")',
    searchLogFormulaFindLat: '=IFERROR(LEFT(INDIRECT(ADDRESS(ROW(),24,4)),FIND(",",INDIRECT(ADDRESS(ROW(),24,4)))-1),"")',
    searchLogFormulaFindLong: '=RIGHT(INDIRECT(ADDRESS(ROW(),24,4)),LEN(INDIRECT(ADDRESS(ROW(),27,4)))+2)',
    searchLogFormulaLinearTravel: '=IF(ISBLANK(INDIRECT(ADDRESS(ROW(),24,4))),"",IF(ISBLANK(INDIRECT(ADDRESS(ROW(),18,4))),"", IFERROR(ACOS((sin(INDIRECT(ADDRESS(ROW(),25,4))*PI()/180)*sin(INDIRECT(ADDRESS(ROW(),27,4))*PI()/180)+cos(INDIRECT(ADDRESS(ROW(),25,4))*PI()/180)*cos(INDIRECT(ADDRESS(ROW(),27,4))*PI()/180)*cos(INDIRECT(ADDRESS(ROW(),28,4))*PI()/180-INDIRECT(ADDRESS(ROW(),26,4))*PI()/180)))*3443.8985*1.15078,"")))',
    searchLogFormulaDurationOfSearch: '',
    attendanceFormulaEventDataSheetURL: '=IF(ISBLANK(INDIRECT(ADDRESS(ROW(),4))),"", HYPERLINK("https://docs.google.com/spreadsheets/d/"&INDIRECT(ADDRESS(ROW(),4)),"EventData Sheet"))',
    attendanceFormulaYEAR: '=YEAR(INDIRECT(ADDRESS(ROW(),1)))',
    attendanceFormulaEVENTID: '=TEXT(INDIRECT(ADDRESS(ROW(),1,4)),"YYYYMMDD")&"_"&INDIRECT(ADDRESS(ROW(),2,4))&"_"&INDIRECT(ADDRESS(ROW(),3,4))',
    attendanceFormulaCOPIED: '=IFNA(MATCH(INDIRECT(ADDRESS(ROW(),7)),Global_Responses!$L:$L,0)>0,"")',
    attendanceFormulaReadyToCopy: '=IF(INDIRECT(ADDRESS(ROW(),1))>TODAY()-5,"Event Data Not Ready", IF(ISBLANK(INDIRECT(ADDRESS(ROW(),4))),"No data available", IF(INDIRECT(ADDRESS(ROW(),8))=TRUE,"Data copied",TRUE)))',
    attendanceFormulaRECALL: '', 
    attendanceFormulaResponded: '',
    attendanceFormulaSendReminder: '',
    statusSheetData: [
      ["A1",`NAME`],
      ["A2:A",`=IFERROR(INDEX(ROSTER!$B:$B,MATCH(INDIRECT(ADDRESS(row(),3,4)),ROSTER!$D:$D,0)),"")`],
      ["B1",`CELL NUMBER`],
      ["B2:B",`=IFERROR(INDEX(ROSTER!$C:$C,MATCH(INDIRECT(ADDRESS(row(),3,4)),ROSTER!$D:$D,0)),"")`],
      ["C1",`EMAIL`],
      ["C2",`=IFNA(UNIQUE(FILTER({'SIGN-IN SHEET'!$B$2:$B;RESPONSES!$B$2:$B},LEN({'SIGN-IN SHEET'!$B$2:$B;RESPONSES!$B$2:$B}))),"NO SIGN-INS YET")`],
      ["D1",`STATUS`],
      ["D2:D",`=IFNA(IFERROR(IF(ISBLANK(INDIRECT(ADDRESS(row(),3,4))),"",INDEX('SIGN-IN SHEET'!$C:$C,MATCH(2,1/('SIGN-IN SHEET'!$B:$B=INDIRECT(ADDRESS(row(),3,4))),1))),INDEX(RESPONSES!$C:$C,MATCH(C2,RESPONSES!B:B,0))),"")`],
      ["E1",`ARRIVAL TIME`],
      ["E2:E",`=IFNA(INDEX(RESPONSES!$D:$D,MATCH(INDIRECT(ADDRESS(ROW(),2,4)),RESPONSES!$B:$B,0)),"")`],
      ["F1",`NOTES`],
      ["F2",`=IFNA(INDEX(RESPONSES!$E:$E,MATCH(INDIRECT(ADDRESS(ROW(),3,4)),RESPONSES!B:B,0)),"")`],
      ["G1",`SIGN-IN`],
      ["G2:G",`=IFERROR(IF(ISBLANK(INDIRECT(ADDRESS(row(),3,4))),"",INDEX('Sign-In Sheet'!$A:$A,MATCH(INDIRECT(ADDRESS(row(),3,4)),'Sign-In Sheet'!$B:$B,0))),"")`],
      ["H1",`SIGN-OUT`],
      ["H2:H",`=IFERROR(IF(ISBLANK(INDIRECT(ADDRESS(row(),3,4))),"",INDEX('Sign-In Sheet'!$A:$A,MATCH(2,1/('Sign-In Sheet'!$B:$B=INDIRECT(ADDRESS(row(),3,4))),1))),"")`],
      ["I1",`MEDICAL CERT`],
      ["I2:I",`=IFERROR(INDEX(ROSTER!$E:$E,MATCH(INDIRECT(ADDRESS(row(),3,4)),ROSTER!D:D,0)),"")`],
      ["J1",`SPECIAL TEAMS`],
      ["J2:J",`=IFERROR(CONCATENATE(ArrayFormula(INDEX(ROSTER!$F:$M,MATCH(INDIRECT(ADDRESS(row(),3,4)),ROSTER!$D:$D,0))&" ")),"")`]
    ],
    availableAssetData: [
      ["A1",`=IFNA(QUERY(STATUS!$A$1:$Y$988,"SELECT A,B,F,G,I,J WHERE D='Sign-In'",-1),"NO RESPONSES YET")`]
   ],
    codeorangeRecallData: [
      ["A1",`=QUERY(ROSTER!1:987,"SELECT B,C WHERE N = 'X' AND O = 'YES'")`],
      ["C1",'LAST MESSAGE SENT'],
      ["C2:C",`=IFNA(VLOOKUP(INDIRECT(ADDRESS(ROW(),1,4)),'CODEORANGE-CALL_LOG'!$A:$C,3,0),"")`]
   ],
    codeorangeCallLogData: [
      
    ]
  }
  return sarConfigurations;
}
function sarMessagingConfig(response,availURL) {
  let sarMessagingConfigurations = {
      codeOrangeMissionMessage: `SCZSAR ${response['EVENT TYPE']} for ${response['MP Type']}. Requesting ${response['RESOURCE NEEDS']}. CP at ${response['CP LOCATION']}. General Briefing at ${response['GENERAL BRIEFING TIME']}, ${response['GENERAL BRIEFING DATE']}. Respond with availability to ${availURL}.`,
      codeOrangeEventMessage: `SCZSAR ${response['EVENT TYPE']}: ${response['EVENT TITLE']}. Requesting ${response['TEAMS']}. General Briefing on ${response['EVENT DATE']} at ${response['GENERAL BRIEFING TIME']}. CP at ${response['EVENT CP']}. Respond with availability to ${availURL}.`,
      codeOrangeEventMessageConf: `SCZSAR ${response['EVENT TYPE']}: ${response['EVENT TITLE']}. EVENT LINK: ${response['EVENT LINK']}. EVENT DETAILS: *theEventDocLink*.`
  };
  return sarMessagingConfigurations;
}