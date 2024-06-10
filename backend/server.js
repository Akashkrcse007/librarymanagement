// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const bookRoutes = require('./routes/bookRoutes');

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use('/api', bookRoutes);

// // Connect to MongoDB and start server
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// })
// .catch(err => console.error('Error connecting to MongoDB:', err));




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this line
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Add this line

// Routes
app.use('/api', bookRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch(err => console.error('Error connecting to MongoDB:', err));
