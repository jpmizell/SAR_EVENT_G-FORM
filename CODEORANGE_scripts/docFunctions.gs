docFunctions.gs

function doc_createDocument(name, dir) {
  let newDoc = DocumentApp.create(name);
  let newDocId = newDoc.getId();
  let docFile = DriveApp.getFileById(newDocId);
  moveFileToDir(docFile, dir);
  return newDoc;
}

// ** CREATE & POPULATE HEADER / FOOTER / TITLE OF DOC
function addDocHeaderFooter(eventDocumentFile, headerText, footerText, titleText) {
  // SET HEADER FOOTER TITLE STYLES
  let styleHeader = {
    [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]: DocumentApp.HorizontalAlignment.CENTER,
    [DocumentApp.Attribute.FONT_FAMILY]: `Calibri`,
    [DocumentApp.Attribute.FONT_SIZE]: 10
  };
  let styleTitle = {
    [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.TITLE,
    [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]: DocumentApp.HorizontalAlignment.CENTER,
    [DocumentApp.Attribute.FONT_FAMILY]: `Calibri`,
    [DocumentApp.Attribute.FONT_SIZE]: 16,
    [DocumentApp.Attribute.BOLD]: true,
  };

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