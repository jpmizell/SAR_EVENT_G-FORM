function addEventForm(theEventDirectory,theFileName,theFormName,setLoginRequired,setCollectEmail,theDataDestination) { // ** CREATE A BLANK RESPONSE FORM
  // CREATE THE FORM IN THE DIRECTORY
  let newForm = FormApp.create(theFileName);
  let newFormId = newForm.getId();
  let newFormFile = DriveApp.getFileById(newFormId);
  newFormFile.moveTo(theEventDirectory);
  newForm.setCollectEmail(setCollectEmail);
  newForm.setRequireLogin(setLoginRequired);
  newForm.setDestination(FormApp.DestinationType.SPREADSHEET, theDataDestination)
  get_form_destination_sheet(newForm).setName(theFormName);
  return newForm;
}
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
function getForm(formId) {
  return FormApp.openById(formId);
}
function getLatestFormSubmission(submissions) {
  return submissions[submissions.length - 1];
}
function lastFormResponse(formId) {
  let latestFormSubmission = getLatestFormSubmission(getForm(formId).getResponses());
  const theResponse = {}
  theResponse.date = latestFormSubmission.getTimestamp().toLocaleDateString();
  theResponse.time = latestFormSubmission.getTimestamp().toLocaleTimeString();
  let fResults = latestFormSubmission.getItemResponses();
  let rLength = fResults.length;
  for (let i=0; i<rLength; i++) {
    let theQuestion = fResults[i].getItem().getTitle();
    let theAnswer = fResults[i].getResponse();
    theResponse [theQuestion] = theAnswer;
  }
  return theResponse;
}
function getOrderedLabelAndAnswers(formResults, formLabels) { //depreciated - using lastFormResponse() to extract form response object w/ date-time
  const orderedLabelAndAnswers = [];
  for (let { label, origIndex } of formLabels) {
    if (origIndex === -1) {
      continue;
    }
    const result = formResults[origIndex];
    let answer = result.getResponse();
    if (Array.isArray(answer)) {
      answer = stringifyArray(answer);
    }
    orderedLabelAndAnswers.push({ label, answer });
  }
  return orderedLabelAndAnswers;
}