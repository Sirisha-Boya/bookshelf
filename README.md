# BOOKSHELF

## **Overview**

The Bookshelf project is a web application that allows users to organize and manage their book collections. It provides features for adding, and read books, as well as tracking reading progress.

### **Features:**

- ***User Accounts***: Authentication and Authorization of users
- ***Home Page***: Users can see different categories of books and search. Once clicking on book they can see book details like thumbnail, title, author, average rating. and add to their bookshelf to read.
- ***My Bookshelf***: Books added in home page will be added here.
- ***Theming***: Users have provision to change themes from light to dark mode and vice versa.

## **Dependencies to be installed for frontend(app)**

After cloning project change to app folder in the terminal and type the command below so that all dependencies in ***package.json*** will be installed.

```shell
npm install
```

## **Dependencies to be installed for Backend(server)**

In another terminal change to server folder and type the command:

```shell
npm install
```
## **To Start the project**

```shell
npm start
```

## **Packages used in frontend:**

```shell
npm install "@mui/material @emotion/react @emotion/styled"
npm install "@mui/icons-material" 
npm install "@reduxjs/toolkit"
npm install "axios"
npm install "formik"
npm install "yup"
npm install "notistack"
npm install "redux react-redux redux-logger redux-persist"
npm install "react-router-dom"
npm install "uuid"
npm install "json-server"
```

## **Packages used in backend:**

```shell
npm install "express"
npm install "cors"
npm install "dotenv"
npm install "body-parser"
npm install "mongoose"
npm install -D "nodemon"
```
## **Book Status used in Application** 
- **Status 0**: "Want to Read"
- **Status 1**: "Currently Reading"
- **Status 2**: "Completed"
## Flow of the application ##

Bookshelf application starts with a landing page which have Register/login screen.

- ***Registration of User***: Click on `New User?Register` link. Register with details and save.
- ***Login User***: Click on `Sign In to explore`  and enter login credentials and sign in.
- ***Home Page***: This is the default screen after logging in. Here we can see the books that we are currently reading.
- ***Library***: Explore different genre books in here. Click on a book and here we can add a rating to the book and we can `Add to Bookshelf`. 
- ***My Bookshelf***: Books added in library will be added in here.Now click on `Read Now`. This will add book to currently reading status and navigate to home page where we see currently reading books.
-  ***Home Page***: Here we can see book with progress and button to update progress. Click on it and update progress by entering percentage or if it is 100% then click on `I've Finished`. Now update and refresh the page to see updated progress for that book.
- ***Search***: We can search for books in library and add it to our bookshelf.
- ***Theme Change***: Here we have light and dark theme available to the application.
We can change it according to our preference by clicking on the theme icon present beside logout button.
- ***Logout***: User can logout by clicking on `logout` button on App Header and it redirect to default Landing screen.


