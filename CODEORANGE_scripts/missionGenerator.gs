/**
 * TITE: SARTeamEventGeneration
 * DESCRIPTION: SAR team search managment script. More information at www.mizellbros.com/sar-scripts
 * AUTHOR: John Mizell
 * AUTHOR URL: www.mizellbros.com
 * MATINENANCE DATE: 2023-04-05
 * ORGANIZATION: SANTA CRUZ COUNTY SEARCH AND RESCUE
 * ORGANIZATON URL: www.sczsar.com
 * COPYRIGHT HOLDER: John Mizell, 2023
 */

function SCZSAR_MissionGenerator() {
  const orange = CODEORANGE_Scripts;
  const formId = FormApp.getActiveForm().getId(); //'1wUbg-q9iCqePRDmvyHRErQ_HnE8JaQgVXbT1C06Qw-w' <- mission formId
  const response = orange.lastFormResponse(formId);
  orange.theMission(response);
}

/**
 * TITE: SARTeamEventGeneration
 * DESCRIPTION: SAR team search managment script. More information at www.mizellbros.com/sar-scripts
 * AUTHOR: John Mizell
 * AUTHOR URL: www.mizellbros.com
 * MATINENANCE DATE: 2023-04-05
 * ORGANIZATION: SANTA CRUZ COUNTY SEARCH AND RESCUE
 * ORGANIZATON URL: www.sczsar.com
 * COPYRIGHT HOLDER: John Mizell, 2023
 */

function SCZSAR_EventGenerator() { // <---- SCRIPT TO BE ADDED TO THE FORM TRIGGER. - READY FOR TESTING. 
  const orange = CODEORANGE_Scripts;
  const formId = FormApp.getActiveForm().getId();
  const response = orange.lastFormResponse(formId);
  orange.theMission(response);
}