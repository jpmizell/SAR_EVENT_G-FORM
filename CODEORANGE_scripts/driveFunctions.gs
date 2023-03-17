driveFunctions.gs

function createDirectory(name,parentDirectoryId) {
  let parentFolder = DriveApp.getFolderById(parentDirectoryId);
  let newEventFolder = parentFolder.createFolder(name);
  let newEventFolderId = newEventFolder.getId();
  return DriveApp.getFolderById(newEventFolderId);
}
function moveFileToDir(file, directory) {
  file.moveTo(directory);
}
function createQRCode (URL,imageName,directoryName) {
  let qRLink = "https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl="+URL;
  let qRImage = UrlFetchApp.fetch(qRLink).getBlob();
  let qRImageFile = DriveApp.createFile(qRImage);
  qRImageFile.moveTo(directoryName);
  qRImageFile.setName(`${directoryName} ${imageName}`);
  Logger.log(`CREATED THE ${imageName} LINK, QR CODE, & MOVED TO ${directoryName} DIRECTORY`);
  return qRImage;
}