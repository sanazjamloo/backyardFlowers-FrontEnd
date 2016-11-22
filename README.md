# Backyard Flowers - Front-End
 Final Project
 Full CRUD action with Angular JS front-end and Rails Back-end

# About the Project

 Backyard flowers is a web application that allows users to keep track of their flowers in their backyard.  A user can sign up, and create a personal account, and keep a list of their flowers. As a successfully logged in user, user can also add, edit, and delete any flower on their list. At the end of the session, user can sign out, so other users can sign in and utilize the application.

# Technologies and frameworks used
- HTML 5
- CSS
- Angular JS
- Node.js
- Express.js
- Rails

# Approach Taken
1. I started by drawing wireframes using draw.io first. After wireframes, I created the ERD (Entity Relational Diagram) for the data model relationships for this application. An image of the ERD will be attached to this markdown.
2. Based on data model schema, I started building the back-end in rails. All the RESTFUL methods for both models of user, and flower, and authentication has been tested through the Postman.
3. Full CRUD action was achieved at the front-end using Angular JS.
4. Back-end and front-end portions of the application have been created in two separate repositories.  I created the application by connecting the two portions through localhost.  The final product has been deployed to Heroku.

# Unresolved Problems
On the Edit flower route in the front-end portion of the application, I came across the Angular JS error for date format for the data type 'Date'. All date-related inputs require the model to be a Date object. If the model is something else, this error will be thrown. Angular does not set validation errors on the in this case as those errors are shown to the user. The model must always be a Date object, otherwise Angular will throw an error. Invalid Date objects (dates whose getTime() is NaN) will be rendered as an empty string. As a result of this issue, my Edit flower route in the front-end isn't able to live update the flower. The update action runs in the back-end and in order to see the changes, the user must log out and log back in.  The updated data is being saved, but is not shown immediately. I tried to change the data type Date to Text to resolve the issue, but the issue still persists.  Further implementations are needed to fix this bug.

# Links
Back-end repository on Github: https://github.com/sanazjamloo/backyardFlowers
Front-end repository on Github: https://github.com/sanazjamloo/backyardFlowers-FrontEnd
Back-end  Heroku link:
Front-end Heroku link:
Wireframes: https://www.draw.io/#G0By2Z2MfeQ8w0ZWVsUjlNWXJYcWs
