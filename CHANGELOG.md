# Changelog Vidis-Button

## Version 1.11.0

- FMUV-191 add Option to directly dispĺay the IDP-Selection

## Version 1.10.2

### Added:

- VBTN-119: Build Minimization

### Fixed:

- VBTN-122: npm audit vulnerabilities

## Version 1.9.7

### Added:

- VBTN-114 improved Security of Cookies

### Fixed:

- VBTN-104 Fixed visual Bugs in various Mobile Sizes
- VBTN-113 Fixed Scrolling Behavior

## Version 1.9.3

### Fixed:

- VBTN-107 Fix Showblocking Error when using Cookie and Mobile View

## Version 1.9.2

### Fixed:

- VBTN-109 Fix visual bug with the Entrance Button with long names
- VBTN-113 Fix Issue with multiple Scrollbars.
- VBTN-107 Fix showblocking Encapsulation Bugs for Button Size S

## Version 1.8.1

### Added

- VBTN-111: Changed Url of a link in the help view and removed another Link

### Fixed:

- VBTN-109: Fixed a visual Bug for the Entry Button in small views

## Version 1.7.1

### Added

- VBTN-90: Encapseling of the VBTN from the host page

### Fixed

- VBTN-110: Fix that the footer covering the page on small sizes

## Version 1.6.3

### Added

- VBTN-17: Added Accessability Tests based on Axe and Selenium

## Version 1.6.2

### Added

- VBTN-3: Added selenium tests.

## Version 1.6.1

### Fixed

- VBTN-106: Fixed not finding idps after clicking go-back button

## Version 1.6.0

### Added

- VBTN-50: Added a version check into the Pipeline to prevent faulty versions to be merged.
- VBTN-71: Changed some Labels based on the clients request.
- VBTN-88: Improvement of Bugfix Pipeline.

## Version 1.4.0

### Added

- VBTN-98: Reseting IDP-Section is now possible
- VBTN-81: Added Accessability by making all Windows closable correctly using "Esc"
- VBTN-82: Added/Changed an array of visual effects and fonts

### Fixed

- VBTN-84: Fixing Visual Bug in Safari

## Version 1.1.0

### Added

- VBTN-96: The IDP-Autocomplete now comes with a Label that indicates what the autocomplete does.

## Version 1.0.16

### Added

- VBTN-95: The Service Provider can now specify the Request Method (GET, POST, ...) that is used for redirection of the user

## Version 1.0.15

### Added

- VBTN-92: The Service Provider can now specify the preselected idphint via the attribute api.

## Version 1.0.14

### Added

- VBTN-85: User now can change their idp-selection after they saved it in the cookie

## Version 1.0.13

### Fixed

- VBTN-80: fixed hover color of the idp-redirect button

## Version 1.0.12

### Added

- VBTN-86: Changed the browserlist Config to support more browsers

### Fixed

- VBTN-75: Fix Image Quality of "DigitalPakt Schule"

## Version 1.0.11

### Added

- VBTN-91: Automatically Focus on the idp-seletion when it comes into view

## Version 1.0.10

### Fixed

- VBTN-73: Fixed a visual Bug, which prevented to user to completely scroll down in the help view.

### Added

- VBTN-89: Now it can be controlled which idps.json should be used, by using idpdatafile="idps-test" oder idpdatafile="idps-dev"
- VBTN-22: Now if the cookie has stored the last used idp, the button will lead the user to the login page of the stored idp,
  whithout going through the trouble of selecting a specific idp.

## Version 1.0.7

### Fixed

- VBTN-87: Fixed a Bug in which the VBTN changed the fonts of the Host-Page of the Service Provider

### Added

- VBTN-87: Added a changelog.md to track the changes beeing made.
