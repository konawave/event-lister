# Pseudocode

## User Experience
* User enters page, is presented with login or sign up options:
    * If login, enter user/password (stored in database), directed to calendar page
    * If sign up, directed to page requesting username, password, and re-entered password.
        * Then directed to calendar page
* Once on the calendar page:
    * Calendar presents week chronologically (time of day descending, day of week L -> R).
    * Option to enter or delete events - input event name, start time, end time, and date.

---------------------------------------
## File Path Experience
* User experience via files
    * server.js establishes connection. 
    * Start in views folder - main page handlebars. Functionality and design provided by files in public folder.
    * Can login or be directed to sign up handlebars view.
        * All direction is handled by controllers folder (routes files).
    * Directed to schedule handlebars views.
        * Schedule populated by events database.
            * database uses models/seeds/db folders to generate, populate, and update values.