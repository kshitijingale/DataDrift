require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const csv = require('csv-parser');
const { userExists, findUser, saveUser } = require('./helper/user');
const app = express();
const port = 8081;

// Use CORS with default options
app.use(cors());
app.use(express.json())

// Endpoints
app.get('/', (req, res) => {
    res.send('Hello World!, from DataDrift');
});

app.get('/api/data', async (req, res) => {
    try {

        const filters = req.query;
        const results = [];
        fs.createReadStream('./data/data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(filters);
                const filteredData = filterData(results, filters)
                res.json(filteredData);
            });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error reading CSV file');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = findUser(email);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json({ message: 'Login successful', email });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        if (userExists(email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to file
        const user = { name, email, password: hashedPassword };
        saveUser(user);

        res.status(201).json({ message: 'User registered successfully', email });

    } catch (error) {
        console.error('Error in register:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

const filterData = (data, filters) => {
    const convertToDateObject = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    return data.filter(item => {
        const itemDate = convertToDateObject(item.Day);

        const matchesAge = filters.age ? item.Age === filters.age : true;
        const matchesGender = filters.gender ? item.Gender === filters.gender : true;

        const matchesDateRange = filters.dateRangeStart
            ? (itemDate >= new Date(filters.dateRangeStart) && itemDate <= new Date(filters.dateRangeEnd))
            : true;

        return matchesAge && matchesGender && matchesDateRange;
    });
};


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
