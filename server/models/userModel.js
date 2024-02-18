// userModel.js
const db = require('../config/db');

exports.createUser = async (username, password, phonenumber) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, password, phonenumber) VALUES (?, ?, ?)', [username, password, phonenumber], (error, results) => {
      if (error) {
        console.error('Error creating user:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getUserByUsername = async (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
      if (error) {
        console.error('Error getting user:', error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};
