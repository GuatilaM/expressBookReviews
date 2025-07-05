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
    // pending: check if there was a review sent
    const review = req.body.review;
    const username = req.session.authorization.username;
    const isbn = parseInt(req.params.isbn);
    if (!books[isbn]) {
        return res.status(404).send('Book not found');
    }
    // Add a new review under the username who posted
    books[isbn].reviews[username] = review;
    return res.status(200).json({ 
        message: "Review added successfully", 
        book: books[isbn],
    });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const username = req.session.authorization.username;
    if (!books[isbn]){
        return res.status(404).send('Book not found');
    }
    let bookReviews = books[isbn].reviews;
    const numberOfReviews = Object.keys(bookReviews).length;
    for (const review in bookReviews){
        if (review === username){
            delete bookReviews[review];
        }
    }
    const updatedNumberOfReviews = Object.keys(bookReviews).length; 
    if (numberOfReviews === updatedNumberOfReviews){
        return res.status(200).json({ message: 'No changes made to reviews'});
    } 
    return res.status(200).json({
        message: `Reviews deleted successfully for user ${username}`,
        book: books[isbn],
    })
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
