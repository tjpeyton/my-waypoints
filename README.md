# my-waypoints
MyWayPoints Web Application

Usage:

When you first open the Mywaypoints application, there are default values set into the input fields: Buffalo and Monterey. On the right half of the screen the map displays a directions route with markers at the starting and ending locations. There are also markers distributed at 1/3 of the route and 2/3 of the route. If you click on the markers, they will display an information window showing the name of the city, temperature and humidity. On the left half of the screen there are two sections containing a a graphic depicting the current weather at the starting and ending locations of the route, as well as the temperature. Below this, the total distance of the route and the total time it would take to drive the route is displayed. When the user inputs a starting location or ending location, presses the enter key, or clicks the go button, the map is updated with the inputted information.
If the browser send and alert that reads: directions service error: NOT_FOUND, try inputting another city, changing the first letter to uppercase (or vice-versa), or entering the state in addition to the city. The next version will have a custom message displayed to notify users of this problem. Please note that this is application is still in development and commits will be coming soon to give full functionality to the mongo database. At the moment, the database stores only the orgin and destination inputted by the user.



Web Stack:

This application is using a modified version of the MEAN stack (No Angular.js). This version of the application will only be using node.js and the express framework for the server and HTML5, CSS and JavaScript for the UI (front-end). The database used is mongodb. 

Files: 

index.html
server.js
package.json

The client-side part of this application is all in the index.html file. It contains the CSS at the top, for styling. Followed by the html which lays out the elements to be displayed to the client. After that, there is a script written in JavaScript which takes care of all the client-side scripting. The server-side scripting is done with the server.js file. It reads the index.html and displays it at the local machine port: 3000.  The package.json file lays out the dependencies that node needs like mongoose, body-parser and express.

APIs:

The application leverages two APIs: Google Maps JavaScript API and openweathermap API.
Make sure to enter your API key in the appropriate location in the index.html file to be granted access. The Google maps direction service is used to display the route on the map and the geocoding service is used to retrieve the latitude and longitude coordinates of the way-points along the route. We then pass the inputted values to the openweathermap API to get the weather details of the starting and destination location. We take the results from the geocoder and pass the latitude and longitude to the openweathermap API to receive the weather information for the way-points.


Running the Application:

NOTE: These instructions are for running this application on your local machine.

To deploy this application you will have to have node.js as well as express installed in the same directory as the index.html and server.js. Also you should have mongodb installed, as well the dependencies: mongoose, body-parser.  You will have to change the name of the database to yours, or create a database called “my-waypoints”.
In a UNIX terminal:
 $ mongod

This will start the mongodb database.  Then move to the folder where the files are located and in the command line of a UNIX terminal:
$: node server.js

Then move to: http://localhost:3000 on your browser.
