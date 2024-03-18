// index.js
import express from "express";
import axios from "axios";
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Endpoint to fetch book covers
app.get('/covers', async (req, res) => {
    try {
        const response = await axios.get('https://openlibrary.org/dev/docs/api/covers');
        const covers = response.data;
        res.render('covers', { covers });
    } catch (error) {
        console.error('Error fetching book covers:', error);
        res.status(500).send('Error fetching book covers');
    }
});

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
