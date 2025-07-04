const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password){
        return res.send('Could not login. Make sure to provide username and password.');
    }
    for (const user of users){
        if (user.username === username){
            return res.send('Username already exists');
        }
    }
    users.push({username: username, password: password});
    return res.send('User "' + username + '" registered successfully').status(200);
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    isbn = parseInt(req.params.isbn);
    if (!books[isbn]) {
        return res.send('Book not found').status(404);
    }
    return res.status(200).json(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let booksByAuthor = [];
    for (const isbn in books) {
        const book = books[isbn];
        if (book.author === author){
            booksByAuthor.push(book);
        }
    }
    if (booksByAuthor.length < 1){
        return res.send('No books found by that author').status(404);
    }
    return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let booksByTitle = [];
    for (const isbn in books) {
        const book = books[isbn];
        if (book.title === title){
            booksByTitle.push(book);
        }
    }
    if (booksByTitle.length < 1){
        return res.send('No books found with that title.').status(404);
    }
    return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    isbn = parseInt(req.params.isbn);
    if (!books[isbn]) {
        return res.send('Book not found').status(404);
    }
    return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
