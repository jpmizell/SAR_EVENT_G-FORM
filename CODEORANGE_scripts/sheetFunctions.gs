function createSpreadSheet(name, dir) {
  let eventData = SpreadsheetApp.create(name); 
  let eventDataId = eventData.getId();
  let eventDataSheetFile = DriveApp.getFileById(eventDataId);
  moveFileToDir(eventDataSheetFile, dir);
  return eventData;
}
function createSheetFromTemplateId(name, dir, templateId) {
  let templateIAPFile = DriveApp.getFileById(templateId);
  let eventIAPFile = templateIAPFile.makeCopy(dir);
  eventIAPFile.setName(name);
  let eventIAPId = eventIAPFile.getId();
  return SpreadsheetApp.openById(eventIAPId);
}
function addDataArrayToSheet(theSheet,theData) { // LOOP THROUGH A 2xN (cell:value) ARRAY TO ADD DATA TO A SHEET
    for (let i = 0; i<theData.length; i++) {
      theSheet.getRange(theData[i][0]).setValue(theData[i][1]);
  }
}
function addDataToSheet(ssID,sheetID,theData) {
  let theSheet = getSheetByGid(ssID,sheetID);
  theSheet.appendRow(theData);
}
function getLastRowFromSheet(theSheet) {
  let theLastRow = theSheet.getLastRow();
  let theLastColumn = theSheet.getLastColumn();
  let theLastRowData = theSheet.getRange(theLastRow,1,1,theLastColumn).getDisplayValues();
  return theLastRowData[0];
}
function getDataFromSheet(ssId,sheetId,theDataRange) {
  let theSheet = getSheetById(ssId,sheetId);
  let theRangeData = Range(theDataRange); // THIS FUNCTION GETS THE DATA -... NEED TO COMPLETE.
  return theRangeData;
}
function getSheetByGid(ssID,gid) {
  return SpreadsheetApp.openById(ssID).getSheets().filter(
    function(s) {return s.getSheetId().toString() === gid;}
  )[0];
}
function copyDynamicSheetData(shourceSheetId,sourceDynamicDataSheetName,sourceDynamicDataSheetRange,sourceStaticDataSheetName,sourceStaticDataSheetRange,destinationSheet,newSheetName,) {
  let rosterSource = SpreadsheetApp.openById(shourceSheetId);
  let sheetActiveTeam = rosterSource.getSheetByName(sourceDynamicDataSheetName);
  let sheetCodeOrange = rosterSource.getSheetByName(sourceStaticDataSheetName);
  sheetActiveTeam.getRange(sourceDynamicDataSheetRange).copyTo(sheetCodeOrange.getRange(sourceStaticDataSheetRange), {contentsOnly:true});
  sheetCodeOrange.copyTo(destinationSheet);
  destinationSheet.getSheetByName(`Copy of ${sourceStaticDataSheetName}`).setName(newSheetName);
}