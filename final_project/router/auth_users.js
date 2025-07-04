const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    let user = users.filter((user) => user.username === username);
    return user.length > 0 ? true : false;
}

const authenticatedUser = (username, password) => { //returns boolean
    let validUsers = users.filter((user) => {
        return user.username === username && user.password === password;
    });
    if (validUsers.length > 0 && validUsers.length < 2){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password){
        return res.send('Could not login. Make sure to provide username and password.');
    }

    if (!isValid(username)){
        return res.send('Invalid username. Try again');
    }

    if (authenticatedUser(username, password)){
        let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60 * 60});
        req.session.authorization = {accessToken, username};

        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid login. Check username and password." });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
