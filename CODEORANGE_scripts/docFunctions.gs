function doc_createDocument(name, dir) {
  let newDoc = DocumentApp.create(name);
  let newDocId = newDoc.getId();
  let docFile = DriveApp.getFileById(newDocId);
  moveFileToDir(docFile, dir);
  return newDoc;
}
function addDocHeaderFooter(eventDocumentFile, headerText, footerText, titleText) {
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
  eventDocumentFile.addHeader();
  eventDocumentFile.addFooter();
  let eventDocumentHeader = eventDocumentFile.getHeader();
  let theHeader = eventDocumentHeader.insertParagraph(0,headerText)
  theHeader.setAttributes(styleHeader);
  let eventDocumentFooter = eventDocumentFile.getFooter();
  let theFooter = eventDocumentFooter.insertParagraph(0,footerText);
  theFooter.setAttributes(styleHeader);
  let eventDocumentBody = eventDocumentFile.getBody();
  let theTitle = eventDocumentBody.insertParagraph(0,titleText);
  theTitle.setAttributes(styleTitle);
}