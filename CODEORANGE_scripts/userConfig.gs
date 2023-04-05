function userConfiguration() {
  let userConfigurations = {
    missionFormId: '',
    eventFormId: '',
    rosterId: '', // SAR ROSTER PRIMARY
    searchLogId: '',
    searchLogSheetId: '',
    attendanceId: '', // CODEORANGE_TeamAttendance Sheet Id
    attendanceGid: '', // CODEORANGE_TeamAttendance Sheet GId
    templateIAPId: '', // TEMPLATE IAP SHEET (BASARC 2021)
    missionDirectory: '',
    trainingDirectory: '',
    parentDirectoryId:'',
    agencyFooter: 'County Search and Rescue\n',
  }
  return userConfigurations;
}
function twilioCredentials() {
  let twilioCredential = {
  SID: '',
  PHONE: '',
  AUTHTOKEN: '',
  }
  return twilioCredential;
}