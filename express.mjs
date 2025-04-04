import express from "express";
import morgan from "morgan";
import {
  getAllCelebrities,
  getAllSpecificCelebrities,
  getIDCelebrity,
  db,
} from "./functions.mjs";

const app = express();
const PORT = 3000; //port number of our page

app.use(express.json()); //
app.use(morgan("dev"));

app.get("/api/celebrities/", async (req, res) => {
  try {
    const celebrities = await getAllCelebrities();
    if (celebrities.error) {
      res.status(404).json(celebrities);
    } else {
      res.json(celebrities);
    }
  } catch (error) {
    console.error("Error fetching celebrities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/celebrities/hairColor/:hairColor", async (req, res) => {
  try {
    const celebrities = await getAllSpecificCelebrities(req.params.hairColor);
    if (celebrities.error) {
      res.status(404).json(celebrities);
    } else {
      res.json(celebrities);
    }
  } catch (error) {
    console.error("Error fetching celebrities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/celebrities/id/:id", async (req, res) => {
  try {
    const celebrity = await getIDCelebrity(req.params.id);
    if (!celebrity) {
      // Controlla se non ci sono risultati
      return res.status(404).json({ message: "Celebrity not found" });
    }
    res.json(celebrity);
  } catch (error) {
    console.error("Error fetching celebrity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
