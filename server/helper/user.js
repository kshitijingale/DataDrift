const path = require('path')
const fs = require('fs');
const dataFolderPath = path.join(__dirname, '..', 'data');
const userFilePath = path.join(dataFolderPath, 'users.txt');

exports.userExists = (email) => {
    const users = getUsers();
    return users.some(user => user.email === email);
}

// Helper function to save user to file

exports.saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
}

// Helper function to find user by email

exports.findUser = (email) => {
    const users = getUsers();
    return users.find(user => user.email === email);
}

// Helper function to get users from file

function getUsers() {
    try {
        const data = fs.readFileSync(userFilePath);
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return an empty array
        return [];
    }
}