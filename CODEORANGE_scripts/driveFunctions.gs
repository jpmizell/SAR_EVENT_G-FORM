function createDirectory(name,parentDirectoryId) {
  let parentFolder = DriveApp.getFolderById(parentDirectoryId);
  let newDirectory = parentFolder.createFolder(name);
  let newDirectoryId = newDirectory.getId();
  const output = {
    parentFolder:parentFolder,
    newDirectory:newDirectory,
    newDirectoryId:newDirectoryId,
  }
  return (output); // DriveApp.getFolderById(newDirectoryId); the old output - returns the name of the folder
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
  // Logger.log(`CREATED THE ${imageName} LINK, QR CODE, & MOVED TO ${directoryName} DIRECTORY`);
  return qRImage;
}
  function createDirectories(parentDirectoryId, directoryName, assetsDirName) {
    const dir = createDirectory(directoryName,parentDirectoryId);
    const dirId = dir.newDirectoryId;
    const assetsDir = createDirectory(assetsDirName,dirId);
    let directoryURL = dir.newDirectory.getUrl();
    const assetDirectoryURL = assetsDir.newDirectory.getUrl();
    const d = {dir:dir.newDirectory,dirUrl:directoryURL, assetsDir:assetsDir.newDirectory, assetDirectoryURL:assetDirectoryURL};
    return(d);
  }