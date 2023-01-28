/**
 * TITE: SARTeamEventGeneration
 * DESCRIPTION: Script based on the input from one google form that creates and populate various search managment forms and documents for team communication, response, & asset management.
 * AUTHOR: John Mizell
 * AUTHOR URL: www.mizellbros.com
 * MATINENANCE DATE: 2023-01-26
 * ORGANIZATION: SANTA CRUZ COUNTY SEARCH AND RESCUE
 * ORGANIZATON URL: www.sczsar.com
 * COPYRIGHT HOLDER: John Mizell, 2023
 */

function SARTeamEventGeneration() {
// DEFINE DOCUMENT & DIRECTORY IDs & OTHER CONSTANTS
  const formId = ``; // THIS IS OUR TRIGGER FORM
  const rosterId = ``; // SAR ROSTER PRIMARY
  const attendenceId = ``; // TEAM ATTENDENCE DATA SHEET
  const templateIAPId =``; // TEMPLATE IAP SHEET (BASARC 2021)
  const parentDirectoryId=``; // sets all responses to nest under the 'MISSIONS' directory. Use the case statement if alternate directories desired.
  const agencyFooter = `Santa Cruz County Search and Rescue\n`;
// PULL FULL REPORT FROM THE FORM
  let form = FormApp.openById(formId); // RETURNS FORM
  let formResponses = form.getResponses(); // RETURNS FormResponse[]
  let fullReport = "";
  // THE DATA LOOP
  let lastResponse = formResponses.length-1;
  //for (let i = 0; i < formResponses.length; i++) { // THE ALL RESPONSE LOOP
  let formResponse = formResponses[lastResponse]; // RETURNS Response (use 'i' for ALL RESPONSE LOOP 'lastResponse' for LAST RESPONSE LOOP)
  let itemResponses = formResponse.getItemResponses(); // returns the item responses for each form response
  let frDateTime = formResponse.getTimestamp();
  let theDate = frDateTime.toLocaleDateString();
  let theTime = frDateTime.toLocaleTimeString();
  for (let j = 0; j < itemResponses.length; j++) {
    let itemResponseTitle = itemResponses[j].getItem().getTitle(); // RETURNS a single response question. 
    let itemResponseResponse = itemResponses[j].getResponse(); // RETURNS a single response value.
    fullReport = fullReport+itemResponseTitle+": "+itemResponseResponse+"\n"
  } // END THE j RESPONSE LOOP
// THE QUESTION AND RESPONSE LIST
  function QAnswer(Question) {
    var form = FormApp.openById(formId);
    var formResponses = form.getResponses();
    const i = formResponses.length-1;
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      if (itemResponse.getItem().getTitle() == Question) {
        let aQuestions = itemResponse.getItem().getTitle();
        let anAnswer = itemResponse.getResponse();
        return (anAnswer);
      }
    }
  }
  // QUESTIONS LIST
  let qIncidenDescription =`INCIDENT DESCRIPTION`;
  let qBriefingDate =`GENERAL BRIEFING DATE`;
  let qMPName =`MP NAME`;
  let qIncidentName =`INCIDENT NAME`;
  let qEventType =`EVENT TYPE`;
  let qMutualAid =`IS MUTUAL AID`;
  let qMPLKP =`MP LKP`;
  let qResourceNeeds =`RESOURCE NEEDS`;
  let qCPLoc =`CP LOCATION`;
  let qBriefingTime =`GENERAL BRIEFING TIME`;
  let qSartopo =`SARTOPO LINK`;
  let qCaseNum =`SCZ-SO CASE # / CAL OES #`;
  let qCodeorange =`DEPLOY CODEORANGE`;

  // ANSWER LIST
  let frIncidenDescription = QAnswer(qIncidenDescription);
  let frBriefingDate = QAnswer(qBriefingDate);
  let frMPName = QAnswer(qMPName);
  let frIncidentName = QAnswer(qIncidentName);
  let frEventType = QAnswer(qEventType);
  let frMutualAid = QAnswer(qMutualAid);
  let frMPLKP = QAnswer(qMPLKP);
  let frResourceNeeds = "";
  let resourceResponse = QAnswer(qResourceNeeds); 
  for (let j = 0; j < resourceResponse.length; j++) {
    let theResponse = resourceResponse[j];
    frResourceNeeds = frResourceNeeds+theResponse+"; "
  } // END THE j RESPONSE LOOP
  let frCPLoc = QAnswer(qCPLoc);
  let frBriefingTime = QAnswer(qBriefingTime);
  let frSartopo = QAnswer(qSartopo);
  let frCaseNum = QAnswer(qCaseNum);
  let frCodeorange = QAnswer(qCodeorange);

  Logger.log(`RETRIEVED DATA FROM FORM`);

// CREATE THE DIRECTORY
    // SET DIRECTORY NAME BASED ON FORM INFORMATION 
    let directoryName = frBriefingDate+" "+frIncidentName+" ("+frMPName+") "+frEventType;
    /** Switch statment for setting specific parentDirectoryId and directoryName by Event type.
     * switch(frEventType) { // ASSIGN THE DIRECTORY TITLES
      case "MISSING PERSON": parentDirectoryId="0AC-Dy6HX_cQ1Uk9PVA"; directoryName=frBriefingDate+" "+frIncidentName+" ("+frMPName+") "+frEventType; break;
      case "RECOVERY": parentDirectoryId="0AC-Dy6HX_cQ1Uk9PVA"; directoryName=frBriefingDate+" "+frIncidentName+" ("+frMPName+") "+frEventType; break;
      case "MUTUAL AID": parentDirectoryId="0AC-Dy6HX_cQ1Uk9PVA"; directoryName=frBriefingDate+" "+frIncidentName+" ("+frMPName+") "+frEventType; break;
      case "FIRE EVACUATION": parentDirectoryId="0AC-Dy6HX_cQ1Uk9PVA"; directoryName=frBriefingDate+" "+frIncidentName+" "+frEventType; break;
      case "FLOOD/DEBRIS FLOW EVACUATION": parentDirectoryId="0AC-Dy6HX_cQ1Uk9PVA"; directoryName=frBriefingDate+" "+frIncidentName+" "+frEventType; break;
      case "LAW ENFORCEMENT SUPPORT": parentDirectoryId="0AC-Dy6HX_cQ1Uk9PVA"; directoryName=frBriefingDate+" "+frIncidentName+" "+frEventType; break;
      }
    */
    Logger.log(`SET DIRECTORY NAME BASED ON FORM INFORMATION`);
  // } // END THE i RESPONSE LOOP 
  Logger.log("DIRECTORY NAME: "+directoryName);

  let parentFolder = DriveApp.getFolderById(parentDirectoryId);
  let newEventFolder = parentFolder.createFolder(directoryName);
  let newEventFolderId = newEventFolder.getId();
  let eventFolder = DriveApp.getFolderById(newEventFolderId);
  Logger.log(`CREATED THE DIRECTORY`);

// SET DOCUMENT STYLES
  let styleCenter = {};
  styleCenter[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  let docBoldStyle = {};
  docBoldStyle[DocumentApp.Attribute.BOLD] = true;
  let imageSize = {};
  imageSize[DocumentApp.Attribute.HEIGHT] = 300;
  imageSize[DocumentApp.Attribute.WIDTH] = 300;
  let docNoBoldStyle = {};
  docNoBoldStyle[DocumentApp.Attribute.BOLD] = false;
  Logger.log(`STYLES SET`);

// THE FUNCTIONS
  // ** CREATE & POPULATE HEADER / FOOTER / TITLE OF DOC
  function AddHeaderFooterTitle(eventDocumentFile,headerText,footerText,titleText) {
    // SET HEADER FOOTER TITLE STYLES
    let styleHeader = {};
    styleHeader[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
    styleHeader[DocumentApp.Attribute.FONT_FAMILY] = `Calibri`;
    styleHeader[DocumentApp.Attribute.FONT_SIZE] = 10;
    let styleTitle = {};
    styleTitle[DocumentApp.Attribute.HEADING] = DocumentApp.ParagraphHeading.TITLE;
    styleTitle[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
    styleTitle[DocumentApp.Attribute.FONT_FAMILY] = `Calibri`;
    styleTitle[DocumentApp.Attribute.FONT_SIZE] = 16;
    styleTitle[DocumentApp.Attribute.BOLD] = true;
    // ADD HEADER AND FOOTER TO DOCUMENT
    eventDocumentFile.addHeader();
    eventDocumentFile.addFooter();
    Logger.log("HEADER & FOOTER SECTION ADDED");
    let eventDocumentHeader = eventDocumentFile.getHeader();
    let theHeader = eventDocumentHeader.insertParagraph(0,headerText)
    theHeader.setAttributes(styleHeader);
    Logger.log("ADDED HEADER TEXT");
    let eventDocumentFooter = eventDocumentFile.getFooter();
    let theFooter = eventDocumentFooter.insertParagraph(0,footerText);
    theFooter.setAttributes(styleHeader);
    Logger.log("ADDED FOOTER TEXT");
    let eventDocumentBody = eventDocumentFile.getBody();
    let theTitle = eventDocumentBody.insertParagraph(0,titleText);
    theTitle.setAttributes(styleTitle);
    Logger.log("ADDED TITLE TEXT");
  }
  // ** CREATE A BLANK RESPONSE FORM
  function AddEventForm(theEventDirectory,theFormName,setCollectEmail,theDataDestination) {
    // CREATE THE FORM IN THE DIRECTORY
    let newForm = FormApp.create(directoryName+` `+theFormName);
    let newFormId = newForm.getId();
    let newFormFile = DriveApp.getFileById(newFormId);
    newFormFile.moveTo(theEventDirectory);
    newForm.setCollectEmail(setCollectEmail);
    Logger.log(`CREATED THE FORM `+theFormName);
    // UPDATE SPREADSHEET WITH FORM RESPONSES
    let theNewForm = FormApp.openById(newFormId);
    theNewForm.setDestination(FormApp.DestinationType.SPREADSHEET, eventDataId)
    
    // SET THE SHEET NAME
    function get_form_destination_sheet(form) {
      let form_id = form.getId();
      let destination_id = form.getDestinationId();
      if (destination_id) {
          let spreadsheet = SpreadsheetApp.openById(destination_id);
          let matches = spreadsheet.getSheets().filter(function (sheet) {
              let url = sheet.getFormUrl();
              return url && url.indexOf(form_id) > -1;
          });
          return matches.length > 0 ? matches[0] : null; 
      }
      return null;
    }
    get_form_destination_sheet(newForm).setName(theFormName);

    //let theNewFormDataSheet = eventData.getSheetByName(`Form Responses 1`);
    //theNewFormDataSheet.setName(theFormName);
    return newForm;
    Logger.log(`UPDATED SPREADSHEET WITH THE FORM RESPONSES FROM `+theFormName);
  }

// CREATE THE SUMMARY DOC AND MOVE TO THE EVENT DIRECTORY
  let newDoc = DocumentApp.create(directoryName+` Summary & Notes`);
  let newDocId = newDoc.getId();
  let summaryDoc = DocumentApp.openById(newDocId);
  let docFile = DriveApp.getFileById(newDocId);
  docFile.moveTo(eventFolder);
  Logger.log(`CREATED THE DOC & MOVED TO EVENT DIRECTORY`);

// CREATE IAP DOCUMENT IN THE EVENT DIRECTORY
  let templateIAPFile = DriveApp.getFileById(templateIAPId);
  let eventIAPFile = templateIAPFile.makeCopy(eventFolder);
  let eventIAPId = eventIAPFile.getId();
  //let eventIAPFile = DriveApp.getFileById(eventIAPId);
  eventIAPFile.setName(directoryName+` IAP - BLANK DRAFT`)
  Logger.log(`IAP CREATED IN EVENT DIRECTORY`);
  // UPDATE FIELDS WITH SEARCH DATA
  let eventIAP = SpreadsheetApp.openById(eventIAPId);
  let sheetIAPData = eventIAP.getSheetByName(`INSTRUCTIONS AND DATA`);
  sheetIAPData.getRange("B13").setValue(frIncidentName);
  sheetIAPData.getRange("B14").setValue(theDate);
  sheetIAPData.getRange("B15").setValue(theTime);
  sheetIAPData.getRange("B18").setValue(frBriefingDate);
  sheetIAPData.getRange("B19").setValue(frBriefingTime);
  sheetIAPData.getRange("B23").setValue(`AUTOGENERATED BY SCZSAR INCIDENT FORM`);
  Logger.log(`ADDED RELEVENT INCIDENT INFORMATION TO IAP`);

// CREATE SPREADSHEET AND MOVE TO EVENT DIRECTORY
  let eventData = SpreadsheetApp.create(directoryName+` EVENT DATA`); 
  let eventDataId = eventData.getId();
  let eventDataSheetFile = DriveApp.getFileById(eventDataId);
  eventDataSheetFile.moveTo(eventFolder);
  Logger.log(`CREATED SPREADSHEET AND MOVED TO EVENT DIRECTORY`);

// CREATE FORMS
  let signInForm = AddEventForm(eventFolder,`Sign-In Sheet`,true,eventDataId);
  let availabilityForm = AddEventForm(eventFolder,`RESPONSES`,true,eventDataId);

// FORM UPDATES ************************************************************** 
  // ADD FIELDS TO SIGN-IN FORM
  let signInItemMC = signInForm.addMultipleChoiceItem();
  signInItemMC.setTitle("In/Out")
      .setChoices([
          signInItemMC.createChoice("Sign-In"),
          signInItemMC.createChoice("Sign-Out")
      ])
      .showOtherOption(false)
      .setRequired(true);
  let signInURL = signInForm.getPublishedUrl();
  Logger.log(`POPULATED THE SIGN-IN FORM`);

  // ADD FIELDS TO THE AVAILABILITY FORM
  let availItemMC = availabilityForm.addMultipleChoiceItem();
  availItemMC.setTitle("Availability")
      .setChoices([
          availItemMC.createChoice("Immediately Responding"),
          availItemMC.createChoice("Delayed Response"),
          availItemMC.createChoice("Unavailable")
      ])
      .showOtherOption(true)
      .setRequired(true);
  let availURL = availabilityForm.getPublishedUrl();
  Logger.log(`POPULATED THE AVAILABILITY FORM`);

  // CREATE THE AVAILABILITY LINK, QR CODE, & MOVE TO DIRECTORY
  let availQRLink = "https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl="+availURL;
  let availQRImage = UrlFetchApp.fetch(availQRLink).getBlob();
  let availQRImageFile = DriveApp.createFile(availQRImage);
  availQRImageFile.moveTo(eventFolder);
  availQRImageFile.setName(directoryName+` AVAILABILITY QR CODE`);
  Logger.log(`CREATED THE AVAILABILITY LINK, QR CODE, & MOVE TO DIRECTORY`);

  // CREATE THE SIGN-IN/SIGN-OUT QR CODE & MOVE TO DIRECTORY
  let signInQRLink = `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=`+signInURL;
  let signInQRImage = UrlFetchApp.fetch(signInQRLink).getBlob();
  let signInQRImageFile = DriveApp.createFile(signInQRImage);
  signInQRImageFile.moveTo(eventFolder);
  signInQRImageFile.setName(directoryName+` SIGN-IN QR CODE`);
  Logger.log(`CREATED THE SIGN-IN/SIGN-OUT QR CODE & MOVE TO DIRECTORY`);

// SHEET UPDATES *************************************************************
  // COPY CODEORANGE ROSTER DATA TO EVENT DATA SHEET
  let rosterSource = SpreadsheetApp.openById(rosterId);
  let sheetActiveTeam = rosterSource.getSheetByName(`ACTIVE TEAM`);
  let sheetCodeOrange = rosterSource.getSheetByName(`CODEORANGE[A]`);
  sheetActiveTeam.getRange(`A:N`).copyTo(sheetCodeOrange.getRange(`A1`), {contentsOnly:true});
  // let eventData = SpreadsheetApp.openById(eventDataId);
  sheetCodeOrange.copyTo(eventData);
  eventData.getSheetByName(`Copy of CODEORANGE[A]`).setName(`ROSTER`);
  // Add response to roster sheet
  let rosterSheet = eventData.getSheetByName(`ROSTER`);
  rosterSheet.getRange("O1").setValue(`AVAILABLE RESPONSE`);
  rosterSheet.getRange("O2:O").setValue(`=IFNA(IF(MATCH(D2,RESPONDING!B:B,0)>0,"YES"),"NO")`);
  rosterSheet.getRange("P1").setValue(`SIGNED-IN?`);
  rosterSheet.getRange("P2:P").setValue(`=IFNA(IF(MATCH(D2,STATUS!F:F,0)>0,"YES"),"NO")`);
  rosterSheet.getRange("Q1").setValue(`RECALL?`);
  rosterSheet.getRange("Q2:Q").setValue(`=IF(O2="YES","NO",IF(P2="YES","NO","YES"))`);
  Logger.log(`COPIED CODEORANGE ROSTER DATA TO EVENT DATA SHEET`);

  // UPDATE SHEET WITH STATUS QUERY
  let statusSheet = eventData.insertSheet(); // insert (add) a new sheet
  statusSheet.setName(`STATUS`);
  //let statusSheet = eventData.getSheetByName(`STATUS`);
  statusSheet.getRange("F1").setValue(`EMAIL`);
  statusSheet.getRange("F2").setValue(`=IFERROR(UNIQUE(QUERY('Sign-In Sheet'!A:C,"SELECT B WHERE B <> 'Email Address'",0)),"NO SIGN-IN YET")`);
  statusSheet.getRange("A1").setValue(`NAME`);
  statusSheet.getRange("A2:A").setValue(`=IFERROR(INDEX(ROSTER!B:B,MATCH(INDIRECT(ADDRESS(ROW(),6,4)),ROSTER!D:D,0)),"")`);
  statusSheet.getRange("B1").setValue(`STATUS`);
  statusSheet.getRange("B2:B").setValue(`=IFERROR(IF(ISBLANK(INDIRECT(ADDRESS(ROW(),6,4))),"",INDEX('Sign-In Sheet'!C:C,MATCH(2,1/('Sign-In Sheet'!B:B=INDIRECT(ADDRESS(ROW(),6,4))),1))),"")`);
  statusSheet.getRange("C1").setValue(`DATE`);
  statusSheet.getRange("C2:C").setValue(`=IFERROR(IF(ISBLANK(INDIRECT(ADDRESS(ROW(),6,4))),"",TEXT(INDEX('Sign-In Sheet'!$A:$A,MATCH(2,1/('Sign-In Sheet'!$B:$B=INDIRECT(ADDRESS(ROW(),6,4))),1)),"DD/MM/YY")),"") `);
  statusSheet.getRange("D1").setValue(`TIME`);
  statusSheet.getRange("D2:D").setValue(`=IFERROR(IF(ISBLANK(INDIRECT(ADDRESS(ROW(),6,4))),"",TEXT(INDEX('Sign-In Sheet'!$A:$A,MATCH(2,1/('Sign-In Sheet'!$B:$B=INDIRECT(ADDRESS(ROW(),6,4))),1)),"HH:MM")),"")`);
  statusSheet.getRange("E1").setValue(`CELL NUMBER`);
  statusSheet.getRange("E2:E").setValue(`=IFERROR(INDEX(ROSTER!C:C,MATCH(INDIRECT(ADDRESS(ROW(),6,4)),ROSTER!D:D,0)),"")`);
  statusSheet.getRange("G1").setValue(`MEDICAL CERT`);
  statusSheet.getRange("G2:G").setValue(`=IFERROR(INDEX(ROSTER!E:E,MATCH(INDIRECT(ADDRESS(ROW(),6,4)),ROSTER!D:D,0)),"")`);
  statusSheet.getRange("H1").setValue(`SPECIAL TEAMS`);
  statusSheet.getRange("H2:H").setValue(`=IFERROR(CONCATENATE(ArrayFormula(INDEX(ROSTER!F:M,MATCH(INDIRECT(ADDRESS(ROW(),6,4)),ROSTER!D:D,0))&" | ")),"")`);
  Logger.log(`UPDATED SHEET WITH ASSET QUERY`);

  // UPDATE SHEET WITH AVAILABLE ASSETS QUERY
  let availableAssetSheet = eventData.insertSheet(); // insert (add) a new sheet
  availableAssetSheet.setName(`AVAILABLE ASSETS`);
  // let availalbeSheet = eventData.getSheetByName(`AVAILABLE ASSETS`);
  availableAssetSheet.getRange("A1").setValue(`=QUERY(STATUS!1:1000,"SELECT A,B,C,D,E,F,G,H WHERE B='Sign-In'",-1)`);
  Logger.log(`UPDATED SHEET WITH AVAILABLE ASSET QUERY`);

  // UPDATE SHEET WITH RESPONDING QUERY
  let respondingSheet = eventData.insertSheet(); // insert (add) a new sheet
  respondingSheet.setName(`RESPONDING`);
  //let respondingSheet = eventData.getSheetByName(`RESPONDING`);
  respondingSheet.getRange("A1").setValue(`RESPONDING`);
  respondingSheet.getRange("A2").setValue(`=IFERROR(INDEX(ROSTER!B:B,MATCH(INDIRECT(ADDRESS(ROW(),3,4)),ROSTER!D:D,0)),"")`);
  respondingSheet.getRange("B1").setValue(`CELL`);
  respondingSheet.getRange("B2").setValue(`=IFERROR(INDEX(ROSTER!C:C,MATCH(INDIRECT(ADDRESS(ROW(),3,4)),ROSTER!D:D,0)),"")`);
  respondingSheet.getRange("C1").setValue(`=QUERY(RESPONSES!A:C,"SELECT B,C WHERE C != 'Unavailable'")`);
  respondingSheet.getRange("E1").setValue(`MEDICAL CERT`);
  respondingSheet.getRange("E2").setValue(`=IFERROR(INDEX(ROSTER!E:E,MATCH(INDIRECT(ADDRESS(ROW(),3,4)),ROSTER!D:D,0)),"")`);
  respondingSheet.getRange("F1").setValue(`SPECIAL TEAMS`);
  respondingSheet.getRange("F2").setValue(`=IFERROR(CONCATENATE(ArrayFormula(INDEX(ROSTER!F:M,MATCH(INDIRECT(ADDRESS(ROW(),3,4)),ROSTER!D:D,0))&" | ")),"")`);
  Logger.log(`UPDATED SHEET WITH RESPONDING QUERY`);

  // UPDATE SHEET WITH CODE ORANGE RECALL SHEET
  let codeorangerecallSheet = eventData.insertSheet(); // insert (add) a new sheet
  codeorangerecallSheet.setName(`CODEORANGE-RECALL`);
  //let codeorangerecallSheet = eventData.getSheetByName(`CODEORANGE-RECALL`);
  codeorangerecallSheet.getRange("A1").setValue(`=QUERY(ROSTER!1:987,"SELECT B,C WHERE N = 'X' AND Q = 'YES'")`);
  Logger.log(`UPDATED SHEET WITH CODEORANGE RECALL QUERY`);
   
  // DELETE Sheet-1 (autogenerated)
  let getSheet1 = eventData.getSheetByName('Sheet1');
  let deleteSheet1 = eventData.deleteSheet(getSheet1);
  Logger.log("Deleted `Sheet 1`");
  
  // ARRANGE SHEETS(TABS)
  // AVAILALBE ASSETS IN POSITION 1
  let activeSheet = ``
  activeSheet = eventData.getSheetByName(`AVAILABLE ASSETS`).activate();
  eventData.moveActiveSheet(1);
  // STATUS LIST IN POSITION 2
  activeSheet = eventData.getSheetByName(`STATUS`).activate();
  eventData.moveActiveSheet(2);
  // RESPONDING IN POSITION 3
  activeSheet = eventData.getSheetByName(`RESPONDING`).activate();
  eventData.moveActiveSheet(3);
  // SIGN-IN TO POSITION 4
  activaactiveSheetteStatusSheet = eventData.getSheetByName(`Sign-In Sheet`).activate();
  eventData.moveActiveSheet(4);
  // ROSTER TO POSITION 5
  activeSheet = eventData.getSheetByName(`ROSTER`).activate();
  eventData.moveActiveSheet(5);
  // RESPONSES TO POSITION 6
  activeSheet = eventData.getSheetByName(`RESPONSES`).activate();
  eventData.moveActiveSheet(6);
  Logger.log(`REARRANGED SHEETS`);

// SUMMARY DOC UPDATES *************************************************************
  // ADD FULL REPORT TO THE SUMMARY DOC
  AddHeaderFooterTitle(summaryDoc,directoryName,agencyFooter+frDateTime,`SCZ-SAR RESPONSE REQUEST SUMMARY & NOTES`);
  let summaryBody = summaryDoc.getBody();
  // summaryBody.appendParagraph(fullReport); // REPLACE THIS FULL REPORT WITH INDIVIDUAL RESPONSES.
  let cellsSummaryTable = [ 
    [qIncidentName,frIncidentName], 
    [qCaseNum,frCaseNum],
    [qBriefingDate,frBriefingDate],
    [qBriefingTime,frBriefingTime],
    [qEventType,frEventType],
    [qMPName,frMPName],
    [qMPLKP,frMPLKP],
    [qResourceNeeds,frResourceNeeds],
    [qCPLoc,frCPLoc],
    [qSartopo,frSartopo],
    [`SEARCH ASSET SHEET`,`DOCUMENT DIRECTORY`]
    ];
  let summaryTable = summaryBody.appendTable(cellsSummaryTable).setBorderWidth(0).setColumnWidth(0,175);
  for(j=0;j < summaryTable.getNumRows();j++) {
  summaryTable.getCell(j,0).setAttributes(docBoldStyle);
  summaryTable.getCell(j,1).setAttributes(docNoBoldStyle);
  }
  Logger.log(`FORMATTED THE TABLE`);

  summaryBody.appendParagraph(qIncidenDescription+`: `).setAttributes(docBoldStyle);
  summaryBody.appendParagraph(frIncidenDescription).setAttributes(docNoBoldStyle);
 
  Logger.log(`ADDED FULL REPORT TO SUMMARY DOC`);

  // ADD ASSET SHEET & DOCUMENT DIRECTORY LINKS TO SUMMARY DOC
  let assetURL = {};
  assetURL[DocumentApp.Attribute.LINK_URL] = `https://docs.google.com/spreadsheets/d/`+eventDataId;
  let docDirectoryURL = {};
  docDirectoryURL[DocumentApp.Attribute.LINK_URL] = `https://drive.google.com/drive/folders/`+newEventFolderId;
  summaryTable.getCell(10,0).setAttributes(docBoldStyle).setAttributes(assetURL); 
  summaryTable.getCell(10,1).setAttributes(docBoldStyle).setAttributes(docDirectoryURL); 
  Logger.log(`UPDATED SUMMARY DOC WITH ASSET SHEET LINK & DOCUMENT DIRECTORY LINK`);
  
  summaryBody.appendPageBreak().setAttributes(docNoBoldStyle);
  
  // PUT THE QR CODES INTO A TABLE IN SUMMARY DOC
  // CREATE THE ARRAY FOR THE TABLE
  let textAvailability = `AVAILABILITY LINK:`;
  let textSignInOut = `SIGN-IN/OUT LINK`; // HYPERLINK TO signInQRLink VARIABLE BELOW.
  let signInURLStyle = {};
  signInURLStyle[DocumentApp.Attribute.LINK_URL] = signInQRLink;
  let availURLStyle = {};
  availURLStyle[DocumentApp.Attribute.LINK_URL] = availURL;
  let cellsQRTable = [ [textAvailability,textSignInOut], [``,``] ];
  // POPULATE THE TABLE WITH THE ARRAY & FORMAT
  let qrTable = summaryBody.appendTable(cellsQRTable);
  qrTable.getCell(0,0).setAttributes(availURLStyle).setAttributes(docBoldStyle);
  qrTable.getCell(0,1).setAttributes(signInURLStyle).setAttributes(docBoldStyle);
  qrTable.getCell(1,0).insertImage(0,availQRImage).setAttributes(imageSize);
  qrTable.getCell(1,1).insertImage(0,signInQRImage).setAttributes(imageSize);
  qrTable.setAttributes(styleCenter);
  Logger.log(`ADDED SIZED QR CODES TO DOC IN TABLE`)

// SIGN-IN POSTER UPDATES *************************************************************
  // CREATE THE SIGN-IN POSTER IN THE DIRECTORY
  let signInPosterDoc = DocumentApp.create(directoryName+" SIGN-IN / OUT LINK");
  let signInPosterDocId = signInPosterDoc.getId();
  let docPosterFile = DriveApp.getFileById(signInPosterDocId);
  docPosterFile.moveTo(eventFolder);
  Logger.log(`CREATED THE SIGN-IN POSTER FILE IN THE DIRECTORY`);
  AddHeaderFooterTitle(signInPosterDoc,directoryName,agencyFooter+frDateTime,`EVENT SIGN-IN/OUT QR CODE:`);
  let signInPosterBody = signInPosterDoc.getBody();
  signInPosterBody.appendPageBreak();
  signInPosterBody.insertImage(2, signInQRImage).setAttributes(styleCenter);
  Logger.log(`ADDED CONTENT TO THE SIGN-IN POSTER`);



// ** UPDATE TEAM SEARCH LOG *************************************************************
  // FUTURE ADDITION - ADD A LINE TO THE SEARCH LOG
// * UPDATE TEAM ATTENDENCE LOG *************************************************************
  // COMPILE ALL RESPONSES INTO ONE ENTRY FOR EACH EVENT ON A SINGLE 'LONG RUNNING' ATTENDENCE DOC
  // WHEN MEMBER SIGNS IN - THE FORM EXECUTES SCRIPT THAT ADDS EVENT NAME, MEMBER NAME, DATE, TO THE ATTENDENCE LIST.
  let attendenceSheet = SpreadsheetApp.openById(attendenceId);
  
  Logger.log(`ATTEDNENCE SHEET-UPDATE CONNETION`)

// ** GENERATE A SARTOPO MAP *************************************************************
  // MARK THE CP AND LKP
  // ADD TO SEARCH SUMMARY DOC

// ** GENERATE A RADIO LOG FORM *************************************************************
  // ADD ENTERIES TO SEARCH DATA SHEET

// ** PROVIDE TEAM MANAGEMENT INTERFACE
  // TEAM DEPLOYMENT TOOL
  // CREATE A DEPLOYMENT FORM: FIELDS: ALL MEMBERS SIGN-IN (MULTIPLE CHOICE); TEAM NUMBER; SEARCH SEGMENT AREA
  // WHEN NEW MEMBERS SIGN-IN/OUT, UPDATE FORM MULTIPLE CHOICE TO INCLUDE ALL SIGNED IN ASSETS

// ** GENERATE A WEB-POST WITH MISSION INFORMATION *************************************************************
  // (FOR INTERNAL ACCESS ONLY)
  // SCRIPTS CANNOT ACCESS GOOGLE SITES :(

// * SEND TEAM MESSAGE BASED ON CURRENT ROSTER & CURRENT RESPONSES VIA TWILIO *************************************************************
      // 
      // THIS IS THE RECALL LIST SHEET >>>>  codeorangerecallSheet = eventData.getSheetByName(`CODEORANGE-RECALL`)
      // APPLY THE TWILIO SCRIPT TO THIS SHEET.
      // SCRIPT SHOULD CALL FUNCTION THAT ACTS ON THE SHEET CREATED BY THE SCRIPT ABOVE
  /**  
  //SET UP SHEET PARAMETERS
  //codeorangerecallSheet 

  let MEMBER_NAME = 0;
  let CUSTOMER_PHONE_NUMBER = 1;
  let RESPONSE_URL = 
  let RESPONSE_ASSETS = 
  let EVENT_TYPE = 
  let BRIEFING_TIME = 
  let CP_LOCATION = 
  let MESSAGE_STATUS = 6;  // Whether the SMS was sent or not


  // MESSAGE FUNCTION
  function sendSms(customerPhoneNumber, memberName, responseURL, responseAssets, eventType, briefingTime, cpLocation) {
  const twilioAccountSID = userProperties.getProperty('TWILIO_ACCOUNT_SID'); //     <----- !!!!! TWILIO ACCOUNT INFO
  const twilioAuthToken = userProperties.getProperty('TWILIO_AUTH_TOKEN');          <----- !!!!! TWILIO ACCOUNT INFO
  const twilioPhoneNumber = userProperties.getProperty('TWILIO_PHONE_NUMBER');      <----- !!!!! TWILIO ACCOUNT INFO
    let twilioUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + twilioAccountSID + '/Messages.json';
  let authenticationString = twilioAccountSID + ':' + twilioAuthToken;
  try {
    UrlFetchApp.fetch(twilioUrl, {
      method: 'post',
      headers: {
        Authorization: 'Basic ' + Utilities.base64Encode(authenticationString)
      },
      payload: {
        To: "+" + customerPhoneNumber.toString(),
        Body: "SCZSAR: [ASSETS] REQUESTED FOR [EVENT TYPE]. BRIEFING AT [TIME] AT [COMMAND POST LOCATION]. RESPOND WITH YOUR AVAILABILITY TO " + responseURL,
        From: twilioPhoneNumber,  // Your Twilio phone number
      },
    });
    return 'sent: ' + new Date();
  } catch (err) {
    return 'error: ' + err;
  }
  };

  // SEND FUNCTION
  function sendSmsToAll() {
  let rows = codeorangerecallSheet.getDataRange().getValues();
  let headers = rows.shift();
  rows.forEach(function(row) {row[MESSAGE_STATUS] =  sendSms(row[CUSTOMER_PHONE_NUMBER], row[MEMBER_NAME],RESPONSE_URL, RESPONSE_ASSETS, EVENT_TYPE, BRIEFING_TIME, CP_LOCATION);

  });
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  };



  */
        // CodeOrangeMessage(`....`);
        
        // HOW DO WE GET IT TO REPEAT?
        // ?? SHOULD WE SETUP A BUTTON ON THE SHEET THAT EXECUTES THE CALL FUNCTION?


} // END OF SARTeamEventGeneration FUNCTION
