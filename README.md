# SYFYMovies_API
 
# Objective

Server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

# Essential Features

* Return a list of ALL movies to the user
* Return data (description, genre, director, image URL, whether it’s featured or not) about a * * * single movie by title to the user
* Return data about a genre (description) by name/title (e.g., “Thriller”)
* Return data about a director (bio, birth year, death year) by name
* Allow new users to register
* Allow users to update their user info (username, password, email, date of birth)
* Allow users to add a movie to their list of favorites
* Allow users to remove a movie from their list of favorites
* Allow existing users to deregister

# Built using:

* Javascript
* Node.js
* Express
* MongoDB
* VS Code

# Dependencies

* "bcrypt": "^5.0.1",
* "body-parser": "^1.19.0",
* "cors": "^2.8.5",
* "express": "^4.17.1",
* "express-validator": "^6.12.0",
* "jsonwebtoken": "^8.5.1",
* "mongoose": "^5.12.14",
* "morgan": "^1.10.0",
* "passport": "^0.4.1",
* "passport-jwt": "^4.0.0",
* "passport-local": "^1.0.0",
* "uuid": "^8.3.2"