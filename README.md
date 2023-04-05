# SAR_EVENT_G-FORM
SAR_EVENT_G-FORM is a set of scripts designed to support SAR mission management.
The script library provides highly specific functionality in the context of SAR mission, preliminary data collection, and long-term SAR-mission data management.
The scripts rely on a set of pre-existing forms, sheets, directories, and template documents, including the following:
Required Forms:
* Event Form
* Mission Form
Required Sheets:
* Team Roster
* Search Log
* Attendance Log
Required Directories:
* Mission Directory
* Training Directory
Required Template Documents:
* IAP

The required ids for each should be entered into the userConfig.gs script.

The CODEORANGE_Scripts should be saved as a single script file on drive.

One of the two functions within the 'missionGenerator.gs' script should be associated with the trigger form (event, or mission).
The CODEORANGE_Scripts file should be added as a library within the trigger form script file. 
The applicable missionGenerator.gs script should be executed on form submit.



The Mission trigger-form that contains the following fields:
* Timestamp
* Email Address
* IS MUTUAL AID?
* EVENT TYPE
* RESOURCE NEEDS
* CP LOCATION
* GENERAL BRIEFING DATE
* GENERAL BRIEFING TIME
* MP NAME
* MP DOB
* MP LKP
* SCZ-SO CASE # / CAL OES #
* TRAINING SITE
* TRAINING TITLE
* INCIDENT NAME
* INCIDENT DESCRIPTION
* SARTOPO LINK
* DEPLOY CODEORANGE (Where 'CODEORANGE' is the name of the home-built broader team communications system project.)
* CONFIRMATION CODE

It Currently completes the following tasks:
* PULLED SUMMARY DETAILS FROM FORM FOR FORM & DOCUMENT CREATION
* SET DIRECTORY NAME BASED ON FORM INFORMATION
* DIRECTORY NAME: 2023-01-24 TWILIO TEST (NONE) undefined
* CREATED THE DIRECTORY
* STYLES SET
* CREATED THE DOC & MOVED TO EVENT DIRECTORY
* CREATED SPREADSHEET AND MOVED TO EVENT DIRECTORY
* CREATED THE FORM Sign-In Sheet
* CREATED THE FORM RESPONSES
* POPULATED THE SIGN-IN FORM
* POPULATED THE AVAILABILITY FORM
* CREATED THE AVAILABILITY LINK, QR CODE, & MOVE TO DIRECTORY
* CREATED THE SIGN-IN/SIGN-OUT QR CODE & MOVE TO DIRECTORY
* COPIED CODEORANGE ROSTER DATA TO EVENT DATA SHEET
* UPDATED SHEET WITH ASSET QUERY
* UPDATED SHEET WITH AVAILABLE ASSET QUERY
* UPDATED SHEET WITH RESPONDING QUERY
* UPDATED SHEET WITH CODEORANGE RECALL QUERY
* REARRANGED SHEETS
* HEADER & FOOTER SECTION ADDED
* ADDED HEADER TEXT
* ADDED FOOTER TEXT
* ADDED TITLE TEXT
* ADDED FULL REPORT TO SUMMARY DOC
* UPDATED SUMMARY DOC WITH ASSET SHEET LINK & DOCUMENT DIRECTORY LINK
* ADDED SIZED QR CODES TO DOC IN TABLE
* CREATED THE SIGN-IN POSTER FILE IN THE DIRECTORY
* HEADER & FOOTER SECTION ADDED
* ADDED HEADER TEXT
* ADDED FOOTER TEXT
* ADDED TITLE TEXT
* ADDED CONTENT TO THE SIGN-IN POSTER

FILE CREATION LIST:
* EVENT DATA sheet
* RESPONSE form
* Sign-In Sheet form
* AVAILABILITY QR CODE image
* SIGN-IN QR CODE image
* SIGN-IN / OUT LINK doc
* Summary & Notes doc

COMMUNICATION FACILITATED THROUGH TWILIO

***** UTILIZATION
* Create a Trigger Form
* Add script to form & replace default function with SAR_EVENT script.
* Update constants with applicable file and directory IDs. 
* Save script.
*** CRITICAL - ROSTER DATA must match formatting (To be added to documentation shortly).
* Set to tigger on form submit.



***** ROSTER DOC
'ROSTER' SHEET DATA FIELD LIST
* FullName
* LAST, First
* Rank
* CallSign
* LastName
* FirstName
* TeamStatus
* StartDate
* %Attendance
* AnnualHours
* Leave of Absense Date
* Suspension Date
* Resignation Date
* Termination Date
* Personnel File ID
* Personnel File
* DOB
* DLnumber
* DLstate
* DLexp
* InfoUpdateDate
* HomePhone
* WorkPhone
* CellPhone
* OtherPhone
* Carrier
* SCZSAREmail
* HomeEmail
* WorkEmail
* VoiceCallFirst
* VoiceCallSecond
* VoiceCallThird
* HomeStreet
* HomeCity
* HomeState
* HomeZip
* WorkStreet
* WorkCity
* WorkState
* WorkZip
* EmergencyContactName
* EmergencyContactPhone
* EmergencyContactCity
* EmergencyContactRelation
* Air
* Hasty
* K9
* Medical
* Mounted
* MountainBike
* OHV-ATV
* Overhead
* Swiftwater
* Tech
* CertSAR
* CertICS
* CertCPR
* CertMedical
* CertVehicle
* CertTech
* CertSwiftwater
* CertCave/Confined Spaces
* CertOverhead
* CertMountainBike
* CertEquestrian
* AllCertsCurrent
* AllCertsExpired
* ID Card
* Policy
* Photo
* Oath
* Emer Form
* DSW
* IssuedPager
* IssuedRadio
* IssuedGPS
* IssuedKey
* IssuedBook
* IssuedSwiftwater
* IssuedRopeRescue
* IssuedUniform
* GenderedSizing
* Hat/HelmetSize
* LongSleeveFieldUniformShirtSize
* ShortSleeveT-ShirtSize
* BDUPantSize
* DrySuitSize
* ShoeSize
* GloveSize
* JacketSize
* BikeJerseySize
* ContactId
* Groups
* Tags
* CurrentCodeRed
* CodeRedUpdate
* CODEORANGE
* isTL

***** ATTENDANCE DOC
* 'ALLEVENTS' SHEET DATA FIELD LIST
** Event Date
** Event Type
** Event Name
** DataSheetID
** Data Sheet Link
** YEAR
** EVENTID
** COPIED
** READY TO COPY
