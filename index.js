const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api/customers', customerRoutes);


app.use('/api/auth', authRoutes); 



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log(" DB Connection Error:", err));
    


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on: http://localhost:${PORT}`);
});