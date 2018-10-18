# Banner Timing Previewer

## Setup Instructions
### Back-end
1. Create or setup a database to use.  I was using xampp's MySQL.  Update the database config in server/config/Database.php with your database information.
2. Create a 'banners' table in your database.  Alternatively name the table anything, but update the model in server/models/Banner.php to reflect your table names.
    * The Banner table should have an ID field set to autoincrement and a route column.

### Front-end
1. In client/src/app/services verify that both the banner and file-uploader services are using the correct localhost port for your setup.  Mine is configured for port 8080.

### Startup
1. Ensure your MySQL database is up and running and you have a backend server up and running.  If using xampp, this is just starting Apache and MySQL.
2. Navigate to the client folder in a different terminal and run ng serve to begin running your dev server on port 4200.