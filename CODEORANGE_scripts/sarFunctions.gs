function sar_populateAvailabilityForm(theForm) {
  theForm.setAllowResponseEdits(true);
  theForm.setLimitOneResponsePerUser(true);
  let availItemMC = theForm.addMultipleChoiceItem();
  availItemMC.setTitle("Availability")
      .setChoices([
          availItemMC.createChoice("Responding"),
          availItemMC.createChoice("Unavailable")
      ])
      .setRequired(true);
  theForm.addTimeItem().setTitle('Arrival Time');
  theForm.addTextItem().setTitle('Notes');
  let availURL = theForm.getPublishedUrl();
  return availURL
}
function sar_createSignInPoster(dir,directoryName,agencyFooter,formDate,formTime,signInQRImage,styleCenter) {
  let signInPosterDoc = doc_createDocument(directoryName+" SIGN-IN / OUT LINK",dir);
  addDocHeaderFooter(signInPosterDoc,directoryName,agencyFooter+' '+formDate+' '+formTime,`EVENT SIGN-IN/OUT QR CODE:`);
  let signInPosterBody = signInPosterDoc.getBody();
  signInPosterBody.appendPageBreak();
  signInPosterBody.insertImage(2, signInQRImage).setAttributes(styleCenter);
  return signInPosterDoc;
}
function codeOrangeCallLog(eventData,response,responseField) {
  let codeorangeCallLog = eventData.insertSheet().setName(`CODEORANGE-CALL_LOG`);
  let respondentRequest = response[responseField];
  let numberRespondents = respondentRequest.length;
  let respondentString = `"&SUBSTITUTE(ADDRESS(1,MATCH("${respondentRequest[0]}",ROSTER!1:1,0),4),"1","")&" IS NOT NULL`;
  if(respondentRequest[0]=='ALL TEAM') {
    respondentString = `"&SUBSTITUTE(ADDRESS(1,MATCH("CODEORANGE",ROSTER!1:1,0),4),"1","")&" = 'X'`;
  }
  else {
    for (let i=1; i < numberRespondents; i++) {
      respondentString += ` OR "&SUBSTITUTE(ADDRESS(1,MATCH("${respondentRequest[i]}",ROSTER!1:1,0),4),"1","")&" IS NOT NULL`;
    }
  }
  addDataArrayToSheet(codeorangeCallLog,sarConfig().codeorangeCallLogData);
  addDataArrayToSheet(codeorangeCallLog,sarConfig().codeorangeRecallData);
}
function duplicateSheetIAP(dir,name,response,templateId) {
  const newSheet = createSheetFromTemplateId(name, dir, templateId);
  let sheetIAPData = newSheet.getSheetByName(`INSTRUCTIONS AND DATA`);
  sheetIAPData.getRange("B13").setValue(response['EVENT TITLE']);
  sheetIAPData.getRange("B14").setValue(response.date);
  sheetIAPData.getRange("B15").setValue(response.time);
  sheetIAPData.getRange("B18").setValue(response['GENERAL BRIEFING DATE']);
  sheetIAPData.getRange("B19").setValue(response['GENERAL BRIEFING TIME']);
  sheetIAPData.getRange("B20").setValue(``);
  sheetIAPData.getRange("B21").setValue(``);
  sheetIAPData.getRange("B23").setValue(`AUTOGENERATED BY SCZSAR INCIDENT FORM`);
  return newSheet
}
function allFormResponsesToSheet(formResults,eventDataSheet,responseSheetName,primaryMessage,secondaryMessage) {
  let responseSheet = eventDataSheet.getSheetByName(responseSheetName);
  responseSheet.getRange(1,1,10,2).setValues(formResults); // IS THIS CORRECT? Can I directly inject an object into a sheet?
  responseSheet.getRange(formResults.length+1,1).setValue('RESPONSE MESSAGE');
  responseSheet.getRange(formResults.length+1,2).setValue(primaryMessage);
  responseSheet.getRange(formResults.length+2,1).setValue('CONFIRMATION MESSAGE');
  responseSheet.getRange(formResults.length+2,2).setValue(secondaryMessage);
}
function sar_createDataSheet(dir,directoryName,assetsDir,templateIAPId) {
  const eventData = createSpreadSheet(`${directoryName} EVENT DATA`, dir);
  const eventDataId = eventData.getId();
  let availabilityForm = addEventForm(assetsDir,`${directoryName} RESPONSES`,`RESPONSES`,true,true,eventDataId);
  let availURL = sar_populateAvailabilityForm(availabilityForm);
  let availQRImage = createQRCode(availURL,`${directoryName} AVAILABILITY QR CODE`,assetsDir);
  let signInForm = addEventForm(assetsDir,`${directoryName} Sign-In Sheet`,`SIGN-IN SHEET`,true,true,eventDataId);
  let signInURL = signInForm.getPublishedUrl();
  let signInQRImage = createQRCode(signInURL,`${directoryName} SIGN-IN QR CODE`,assetsDir);
  const summaryDoc = doc_createDocument(`${directoryName} Summary & Notes`, dir);
  const eventIAP = createSheetFromTemplateId(`${directoryName} IAP - BLANK DRAFT`, dir, templateIAPId);
  const ds = {eventData:eventData,eventDataId:eventDataId,availabilityForm:availabilityForm,availURL:availURL,availQRImage:availQRImage,signInForm:signInForm,signInURL:signInURL,signInQRImage:signInQRImage,summaryDoc,summaryDoc,eventIAP:eventIAP}
  return (ds);
}
function sar_copyIAP(eventIAPTemplate,response) {
  let sheetIAPData = eventIAPTemplate.getSheetByName(`INSTRUCTIONS AND DATA`);
  let iapSheetData = [
      ["B13",response['INCIDENT NAME']],
      ["B14",response.date], 
      ["B15",response.time],
      ["B18",response['GENERAL BRIEFING DATE']],
      ["B19",response['GENERAL BRIEFING TIME']],
      ["B20",``],
      ["B21",``],
      ["B23",`AUTOGENERATED BY SCZSAR INCIDENT FORM`],
    ]
  addDataArrayToSheet(sheetIAPData,iapSheetData);
}
function sar_updateSignInSheet(signInForm) {
let signInItemMC = signInForm.addMultipleChoiceItem();
signInItemMC.setTitle("In/Out")
    .setChoices([
        signInItemMC.createChoice("Sign-In"),
        signInItemMC.createChoice("Sign-Out")
    ])
    .showOtherOption(false)
    .setRequired(true);
}
function sar_updateDataSheet(eventData,rosterId) {
  copyDynamicSheetData(rosterId,'ACTIVE TEAM','A:N','CODEORANGE[A]','A1',eventData,'ROSTER'); 
        // POSSIBLY REMOVE - *************
        let rosterSheet = eventData.getSheetByName(`ROSTER`); 
        rosterSheet.getRange("O1").setValue(`RECALL?`);
        rosterSheet.getRange("O2:O").setValue(`=IF(ISBLANK(INDIRECT(ADDRESS(ROW(),4,4))),"", IFNA(IF(MATCH(INDIRECT(ADDRESS(ROW(),4,4)),STATUS!C:C,0)>0,"NO"),"YES"))`);
        // END OF REMOVAL *********
  let statusSheet = eventData.insertSheet().setName(`STATUS`);
  addDataArrayToSheet(statusSheet,sarConfig().statusSheetData);
  let availableAssetSheet = eventData.insertSheet().setName(`AVAILABLE ASSETS`);
  addDataArrayToSheet(availableAssetSheet,sarConfig().availableAssetData);
  let codeorangeRecallSheet = eventData.insertSheet().setName(`CODEORANGE-RECALL`);
  addDataArrayToSheet(codeorangeRecallSheet,sarConfig().codeorangeRecallData);
  let codeorangeCallLog = eventData.insertSheet().setName(`CODEORANGE-CALL_LOG`); // - THIS WAS MOVED TO sarFunctions
  codeorangeRecallSheet.getRange('A:B').copyTo(codeorangeCallLog.getRange('A:B'), {contentsOnly:true});
  // addDataArrayToSheet(codeorangeCallLog,sarConfig().codeorangeCallLogData);
  eventData.deleteSheet(eventData.getSheetByName('Sheet1')); // DELETE Sheet-1 (autogenerated)
  eventData.getSheetByName(`AVAILABLE ASSETS`).activate();
  eventData.moveActiveSheet(1);
  eventData.getSheetByName(`STATUS`).activate();
  eventData.moveActiveSheet(2);
  eventData.getSheetByName(`ROSTER`).activate();
  eventData.moveActiveSheet(3);
  eventData.getSheetByName(`SIGN-IN SHEET`).activate();
  eventData.moveActiveSheet(4);
  eventData.getSheetByName(`RESPONSES`).activate();
  eventData.moveActiveSheet(5);
}
function sar_buildSummaryDoc(userConfig,formType,d,ds,directoryName,response,responseSummary,style) {
  addDocHeaderFooter(ds.summaryDoc,directoryName,userConfig.agencyFooter+' '+response.date+' '+response.time,`SCZ-SAR RESPONSE REQUEST SUMMARY & NOTES`);
  let summaryBody = ds.summaryDoc.getBody();
  let summaryTable = summaryBody.appendTable(responseSummary).setBorderWidth(0).setColumnWidth(0,175);
  for(j=0;j < summaryTable.getNumRows();j++) {
    summaryTable.getCell(j,0).setAttributes(style.bold);
    summaryTable.getCell(j,1).setAttributes(style.regular);
  }
  let selectCell = [];
  let summaryURL = {};
  if (formType=='MISSION') {
    summaryBody.appendParagraph('INCIDENT DESCRIPTION:').setAttributes(style.bold);
    summaryBody.appendParagraph(response['INCIDENT DESCRIPTION']).setAttributes(style.regular);
    selectCell = searchArray(responseSummary,'SARTOPO LINK'); 
    summaryURL[DocumentApp.Attribute.LINK_URL] = response['SARTOPO LINK']; 
  }
  else {
    summaryBody.appendParagraph('EVENT DESCRIPTION:').setAttributes(style.bold);
    summaryBody.appendParagraph(response['EVENT DESCRIPTION']).setAttributes(style.regular);
    selectCell = searchArray(responseSummary,'EVENT LINK'); 
    summaryURL[DocumentApp.Attribute.LINK_URL] = response['EVENT LINK']; 
  }
  summaryTable.getCell(selectCell[0],selectCell[1]).setAttributes(summaryURL);
  selectCell = searchArray(responseSummary,'ASSET MANAGEMENT SHEET');
  let assetURL = {};
  assetURL[DocumentApp.Attribute.LINK_URL] = `https://docs.google.com/spreadsheets/d/`+ds.eventDataId;
  summaryTable.getCell(selectCell[0],selectCell[1]).setAttributes(style.bold).setAttributes(assetURL);
  selectCell = searchArray(responseSummary,'DOCUMENT DIRECTORY');
  let docDirectoryURL = {};
  docDirectoryURL[DocumentApp.Attribute.LINK_URL] = `https://drive.google.com/drive/folders/`+d.dir.getId();
  summaryTable.getCell(selectCell[0],selectCell[1]).setAttributes(style.bold).setAttributes(docDirectoryURL);
  summaryBody.appendPageBreak().setAttributes(style.regular);
  let signInURLStyle = {};
  signInURLStyle[DocumentApp.Attribute.LINK_URL] = ds.signInURL;
  let availURLStyle = {};
  availURLStyle[DocumentApp.Attribute.LINK_URL] = ds.availURL;
  let cellsQRTable = [ 
    [`AVAILABILITY LINK:`,`SIGN-IN/OUT LINK`], 
    [``,``] 
  ];
  let qrTable = summaryBody.appendTable(cellsQRTable);
  qrTable.getCell(0,0).setAttributes(availURLStyle).setAttributes(style.bold);
  qrTable.getCell(0,1).setAttributes(signInURLStyle).setAttributes(style.bold);
  qrTable.getCell(1,0).insertImage(0,ds.availQRImage).setAttributes(style.qrImage);
  qrTable.getCell(1,1).insertImage(0,ds.signInQRImage).setAttributes(style.qrImage);
  qrTable.setAttributes(style.center);
  formType == 'MISSION' ?  Logger.log('MISSION: No training outline added') : addTrainingDataToDoc(ds.summaryDoc,response);
}
function addTrainingDataToDoc(theDoc,theDataObj) {
  const style = styles();
  const courseOutlineResponse = [
    ['COURSE TITLE',theDataObj['EVENT TITLE']],
    ['COURSE GOAL',''],
    ['AUDIENCE',stringifyArray(theDataObj['TEAMS'])],
    ['CORE COMPETENCIES',''],
    ['DATE & TIME',`${theDataObj['GENERAL BRIEFING DATE']} ${theDataObj['GENERAL BRIEFING TIME']}`],
    ['LOCATION',theDataObj['CP LOCATION']],
    ['EVENT LINK/MAP LINK',theDataObj['EVENT LINK']],
    ['EXERCISE LEAD',''],
    ['REQUIRED?',theDataObj['EVENT TYPE']='TRAINING'?'REQUIRED':'OPTIONAL'],
    ['METHOD OF PRESENTATION','']
  ]
  const courseDetailResponse = [
    ['COURSE OBJECTIVES',''],
    ['SAFETY PLAN & PROCEDURE',''],
    ['REQUIRED RESOURCES',''],
    ['PLANNING OUTLINE',''],
    ['TRAINING SCHEDULE',''],
    ['MEASURES OF SUCCESS','']
  ]
  const theBody = theDoc.getBody();
  theBody.appendParagraph('EVENT OUTLINE:').setAttributes(style.heading1);
  for(let i=0; i<courseOutlineResponse.length;i++)   { 
    let theHeading = theBody.appendParagraph(`${courseOutlineResponse[i][0]}: `).setAttributes(style.bold);
    let theAnswer = courseOutlineResponse[i][1];
    let startIndex = theHeading.getText().length;
    theHeading.editAsText().setAttributes(startIndex-1,startIndex-1,style.regular);
    let theParagraph = theHeading.editAsText().insertText(startIndex, theAnswer)
  };
  for(let i=0; i<courseDetailResponse.length;i++)   { 
    theBody.appendParagraph(courseDetailResponse[i][0]).setAttributes(style.heading3);
    theBody.appendListItem(courseDetailResponse[i][1]).setAttributes(style.regular);
  };
}
function addToSearchLog(userConfig,sarConfigData) {
    const searchLogData = sarConfigData.searchLogData;
    addDataToSheet(userConfig.searchLogId,userConfig.searchLogSheetId,searchLogData);
}