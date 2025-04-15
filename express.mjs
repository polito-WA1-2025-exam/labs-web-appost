import express from "express";
import morgan from "morgan";
import {
  getAllCelebrities,
  getAllSpecificCelebrities,
  getIDCelebrity,
  db,
  addCelebrity,
  updateCelebritiesProperty,
  deleteCelebrity,
} from "./functions.mjs";

const app = express();
const PORT = 3000; //port number of our page

app.use(express.json());
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

// adding a celebrity
app.post("/api/celebrities/", async (req, res) => {
  const newCelebrity = req.body;
  try {
    const celebrity = await addCelebrity(newCelebrity);
    if (!celebrity) {
      return res.status(400).json({ message: "Celebrity not added" });
    }
    res.status(201).json({ message: "Celebrity added successfully" });
  } catch (error) {
    console.error("Error adding celebrity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//modification of a celebrity
app.put("/api/celebrities/id/:id/property/:property", async (req, res) => {
  console.log("DEBUG: body ricevuto:", req.body);
  const { property } = req.params;
  const { newValue } = req.body;

  try {
    const result = await updateCelebritiesProperty(
      req.params.id,
      property,
      newValue
    );
    res.json({ message: result });
  } catch (error) {
    console.error("Error updating celebrity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//deleting a celebrity
app.delete("/api/celebrities/id/:id", async (req, res) => {
  try {
    const result = await deleteCelebrity(req.params.id);
    res.json({ message: result });
  } catch (error) {
    console.error("Error deleting celebrity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
