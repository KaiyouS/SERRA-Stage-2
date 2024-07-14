const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'sysdev_recruitment'
});

const HOST = 'localhost';
const PORT = 3000;

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL: ', err);
        return;
    }
    
    console.log('Successfully connected to MySQL!')
});

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Java\n\nInclude your favorite programming language in this format:\n\nhttp://${HOST}:${PORT}/language?favorite=[PROGRAMMING LANGUAGE]`);
})

app.get('/language', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const language = req.query.favorite;
    if (!language) {
        res.end(`Please include your favorite programming language in this format:\n\nhttp://${HOST}:${PORT}/language?favorite=[PROGRAMMING LANGUAGE]`);
    }
    
    const queryText = 'INSERT INTO programming_languages (favorites) VALUES (?)';
    connection.query(queryText, [language], (err) => {
        if (err) {
            console.log('Error inserting into MySQL: ', err);
        }
    });
    res.end(`Added ${language} to MySQL database.`)
});

app.get('*', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Please include your favorite programming language in this format:\n\nhttp://${HOST}:${PORT}/language?favorite=[PROGRAMMING LANGUAGE]`);
});

app.listen(PORT, HOST, () => {
    console.log('Listening...');
});


/*
    CREATE DATABASE sysdev_recruitment;
    USE sysdev_recruitment;
    CREATE TABLE programming_languages (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        favorites VARCHAR(255)
    );
    INSERT INTO programming_languages (favorites) VALUES ('Java');
*/