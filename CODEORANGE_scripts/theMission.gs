function theMission(response) {
  const userConfig = userConfiguration();
  const sarConfigDirData = sarConfig_directoryOutput(response);
  const style = styles();
  const formId = FormApp.getActiveForm().getId();
  const formType = formId == userConfig.missionFormId ?'MISSION':'EVENT';
  const parentDirectoryId = formType == 'MISSION' ? userConfig.missionDirectory : userConfig.trainingDirectory;
  const directoryName = formType == 'MISSION' ? sarConfigDirData.directoryNameMission : sarConfigDirData.directoryNameEvent;
  const assetsDirName = formType == 'MISSION' ? sarConfigDirData.assetsDirNameMission : sarConfigDirData.assetsDirNameEvent;
  const d = createDirectories(parentDirectoryId, directoryName, assetsDirName);
  const ds = sar_createDataSheet(d.dir,directoryName,d.assetsDir,userConfig.templateIAPId); 
  const sarConfigData = formType == 'MISSION' ? sarConfig_missionDataOutput(response,d,ds) : sarConfig_eventDataOutput(response,d,ds);
  sar_copyIAP(ds.eventIAP,response);
  formType == 'MISSION' ? addToSearchLog(userConfig,sarConfigData) : Logger.log('TRAINING: No data to add to search log.');
  const dataCodeorangeTeamAttendance = formType == 'MISSION' ? sarConfigData.dataCodeorangeTeamAttendanceMission : sarConfigData.dataCodeorangeTeamAttendanceEvent;
  addDataToSheet(userConfig.attendanceId,userConfig.attendanceGid,dataCodeorangeTeamAttendance);
  sar_updateSignInSheet(ds.signInForm);
  sar_updateDataSheet(ds.eventData,userConfig.rosterId);
  const responseSummary = formType == 'MISSION' ?  sarConfigData.responseMissionSummary : sarConfigData.responseEventSummary;
  sar_buildSummaryDoc(userConfig,formType,d,ds,directoryName,response,responseSummary,style);
  sar_createSignInPoster(d.dir,directoryName,userConfig.agencyFooter,response.date,response.time,ds.signInQRImage,style.center);

  // // TEST CODE FOR INJECTING FORM DATA INTO THE SHEET TO RECALL LATER FOR ADDITIONAL TEAM MESSAGING
  // allFormResponsesToSheet(responseSummary,ssTest,'CONFIG',sarMessagingConfig(response,availURL).codeOrangeEventMessage,sarMessagingConfig(response,availURL).codeOrangeEventMessageConf);

  // CODEORANGE COMMS ******** DEPLOYS MESSAGING TO ALL TEAMS *********************
  if (response['DEPLOY CODEORANGE'] == 'YES') {
    sendSmsToAll(codeorangeCallLog,sarMessagingConfig(response,ds.availURL).codeOrangeMissionMessage);
    Logger.log('ACTIVATED CODEORANGE');
  }
} // END OF theMission()