#   Description
This app is created using MERN Stack and additionally some packages. With the 'Popularity Social App', you can register as a new user and sign in, you can add new posts, like posts, add friends, remove friends, read feeds, make comments, chat with friends, i will try to improve it and add some other functionalities in the future hopefully.

#   Tools
##  Front End
1.  Material UI - For the styling and material ui built in components.
2.  React-Redux and Redux-Toolkit - For the state management and api end point calls, react-redux is used with the help of the redux-toolkit.
3.  Redux-Persist - Redux Persist is used to store token as local storage on the browser
4.  Formik - Yup - For the form values, formik is used to handle value states and errors, and for the validation of form, Yup is used.
5.  React-Dropzone - For the picture uploading.
6.  React-Router - For the routing.
7.  Socket-io-client - for the socket client configuration of chat functionality.
##  Back End
1.  Nodemon - To simulate dev enviroment easily.
2.  Cors - For the enabling cors.
3.  Bycrpt - To hashing password when storing to DB.
4.  Dotenv - for the usage of environment variables.
5.  Helmet - To secure app by using HTTP header.
6.  JSONWebToken - To create web token.
7.  Mongoose - Mongo ODM makes query easier for MongoDB.
8.  Morgan - It logs http request to the terminal.
9.  Multer - It is used to handle picture uploads.
10. Socket-io - For the socket server configuration.

#   Installation
Pull this repo and install required packages using `npm i`, Don't forget to .env files to both `server` and `client`
##  Server .env
This env file should include `MONGO_URL` which represents your mongo database url connection string, specify `PORT` as avaliable port for your machine (i used `3001`) and lastly `JWT_SECRET` which should be your secret string for hashing passwords when saving user to data
##  Client .env
Client side .env includes one entry, and its `VITE_BASE_URL` which is `http://localhost:3001` in my case, you can specify port however you want. Since client side is powered using VITE, you don't need to install 'dotenv' package to use environment variables.

