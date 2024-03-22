import pg from "pg";
import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "781121",
    port: 5432
});
db.connect();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

async function getBooks() {
    try {
        const response = await axios.get(`https://openlibrary.org/subjects/random.json`);
        const covers = response.data;
        const books = [];
        const seenCoverIds = new Map();
        
        covers.works.forEach(cover => {
            const book = {
                id: cover.cover_id,
                title: cover.title,
                author: cover.authors[0].name,
                cover: `https://covers.openlibrary.org/b/id/${cover.cover_id}-M.jpg`,
                release_date: cover.first_publish_year
            };
            
            if (!seenCoverIds.has(book.id)) {
                books.push(book);
                seenCoverIds.set(book.id, true);
            }
        });
        return books;
    } catch (error) {
        console.error('Error fetching book covers:', error);
        throw new Error('Error fetching book covers');
    }
}
const books = await getBooks();

app.get("/", async (req, res) => {
    res.render("books", { books: books });
});

app.get("/read", async (req, res) => {
    const result = await db.query("SELECT * FROM books ORDER BY id");
    const readBooks = result.rows;
    res.render("readBooks.ejs", { books: readBooks });
})

app.post("/read/:id", async (req, res) => {
    let answer=true;
    const id = req.params.id;
    const book =await books.find(book => book.id == id);
    try {
        await db.query("INSERT INTO books VALUES($1, $2, $3, $4, $5)", [book.id, book.title, book.author, book.cover, book.release_date]);
        console.log("Book added successfully.");
    } catch (error) {
        console.error("Already added");
        answer=false;
    }

    const data = {
        answer: answer
    };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
