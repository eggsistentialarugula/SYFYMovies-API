# SYFYMovies_API

# Overview

A Restful API that allows users to make requests to a Syfy movies database and receive responses from the server-side. The endpoints are described in https://mysyfymovies.herokuapp.com/documentation.html

# Description

This project is the server-side component for an application called "mySyfy Movies" that stores data about movies. It consists of a well-designed REST API and architected database built using _**Javascript**_, _**Node.js**_, _**Express**_, and _**MongoDB**_. 

The _**REST API**_ is hosted on _**Heroku**_ and accessed via commonly used HTTP methods like GET and POST. Similar methods (CRUD) will be used to retrieve data from the database and store that data in a non-relational way.

It is used by the mySyfy Movies client-side to give users access to information about different Syfy movies and the  directors and genres. Users will be able to sign up and create a list of their favorite movies. 

<h1 id = "essential-features">Essential Features</h1>

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

# Tech

* A Node.js and Express application
* TUses REST architecture, with URL endpoints corresponding to the data operations listed under [Essential Features](#essential-features).
* The API uses middleware modules, such as the body-parser package for reading data from requests and morgan for logging.
* Database built using MongoDB
* Business logic was modeled with Mongoose
*  API endpoints were tested using Postman
* Includes user authenticaion and authorization code
* Includes data validation logic


# Dependencies

* bcrypt: 5.0.1
* body-parser: 1.19.0
* cors: 2.8.5
* express: 4.17.1
* express-validator: 6.12.0
* jsonwebtoken: 8.5.1
* mongoose: 5.12.14
* morgan: 1.10.0
* passport: 0.4.1
* passport-jwt: 4.0.0
* passport-local: 1.0.0
* uuid: 8.3.2