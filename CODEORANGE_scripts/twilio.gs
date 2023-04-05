// GLOBAL VARIABLES
  var MEMBER = 0;
  var CELL_PHONE = 1;
  var MESSAGE_STATUS = 2;  // Whether the SMS was sent or not
  var LAST_RESPONSE = 3;

function sendSms(memberPhoneNumber,memberName,credentials,theMessage) {
  var twilioAccountSID = credentials.SID;
  var twilioAuthToken = credentials.AUTHTOKEN;
  var twilioPhoneNumber = credentials.PHONE;
  var twilioUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + twilioAccountSID + '/Messages.json';
  var authenticationString = twilioAccountSID + ':' + twilioAuthToken;
  try {
    UrlFetchApp.fetch(twilioUrl, {
      method: 'post',
      headers: {
        Authorization: 'Basic ' + Utilities.base64Encode(authenticationString)
      },
      payload: {
        To: "+1"+memberPhoneNumber,
        Body: `${memberName}: ${theMessage}`,
        From: twilioPhoneNumber,  // Your Twilio phone number
      },
    });
    return 'sent: ' + new Date();
  } catch (err) {
    return 'error: ' + err;
  }
};
function sendSmsToAll(sheet,message,otherSheet) {
  var rows = sheet.getDataRange().getValues();
  var headers = rows.shift();
  rows.forEach(function(row) {row[MESSAGE_STATUS] =  sendSms(row[CELL_PHONE],row[MEMBER],twilioCredentials(),message);
  });
    sheet.getRange(2, 1, rows.length, 3).setValues(rows);
};