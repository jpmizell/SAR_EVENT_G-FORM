/**
 * TITE: SARTeamEventGeneration
 * DESCRIPTION: Script designed for SAR team search managment. Script executes on input from a single google 'event' form. Script creates forms, sheets, documents, and triggers a notification.
 * AUTHOR: John Mizell
 * AUTHOR URL: www.mizellbros.com
 * MATINENANCE DATE: 2023-03-16
 * ORGANIZATION: SANTA CRUZ COUNTY SEARCH AND RESCUE
 * ORGANIZATON URL: www.sczsar.com
 * COPYRIGHT HOLDER: John Mizell, 2023
 */
 
 // !! INSPECT MissionGeneration FORM ALIGNS EXACTLY WITH CONFIGURATION-NOTES.
 
 // !! IMPORT THE CODEORANGE LIBRARY - 'CODEORANGE_Scripts'

function SCZSAR_MissionGenerator() {
  const orange = CODEORANGE_Scripts;
  const formId = FormApp.getActiveForm().getId;       // error! - inject the trigger formId manually until corrected.
  const response = orange.lastFormResponse(formId);
  orange.theMission(response);
}
