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

let getBooks = new Promise((resolve, reject) => {
    if (!books){
        reject('No books found');
    } else {
        resolve(books);
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    getBooks.then((value) => {
        return res.status(200).json(value);
    }, (error) => {
        return res.status(404).json({ message: error });
    });
});

async function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        if (!books[isbn]){
            reject('Book not found');
        } else {
            resolve(books[isbn]);
        }
    });
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = parseInt(req.params.isbn);
    await getBookByISBN(isbn).then((value) => {
        return res.status(200).json(value);
    }, (error) => {
        return res.status(404).json({ message: error });
    });
});

async function getBooksByFilter(data) {
    // Get filter by author or title
    const filter = data.filter;
    let booksByFilter = [];
    for (const isbn in books){
        const book = books[isbn];
        // Save book if the filter matches the parameter
        if (book[filter] === data.parameter){
            booksByFilter.push(book);
        }
    }
    // Handle no books found or send books found and return promise
    return new Promise((resolve, reject) => {
        if (booksByFilter.length < 1){
            reject(`No books found by that ${filter}`);
        } else {
            resolve(booksByFilter);
        }
    });
}

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    await getBooksByFilter({ filter: 'author', parameter: author})
        .then((value) => {
            return res.status(200).json(value);
        }, (error) => {
            return res.status(404).json({ message: error });
        });
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    await getBooksByFilter({ filter: 'title', parameter: title})
        .then((value) => {
            return res.status(200).json(value);
        }, (error) => {
            return res.status(404).json({ message: error });
        });
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
