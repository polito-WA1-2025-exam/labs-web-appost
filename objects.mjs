import sqlite from "sqlite3";
import {
  getAllCelebrities,
  getAllSpecificCelebrities,
  db,
} from "./functions.mjs"; // Importa la funzione getAllCelebrities dal file functions.mjs

function Celebrity(
  photo,
  profession,
  hairColor,
  glasses,
  skinColor,
  gender,
  hat,
  ageRange,
  mustache,
  eyeColor,
  name
) {
  (this.photo = photo),
    (this.profession = profession),
    (this.hairColor = hairColor),
    (this.glasses = glasses),
    (this.skinColor = skinColor),
    (this.gender = gender),
    (this.hat = hat),
    (this.ageRange = ageRange),
    (this.mustache = mustache),
    (this.eyeColor = eyeColor);
  this.name = name;
}

function match(difficulty) {
  (this.difficulty = difficulty), (this.selectedItems = []);
  this.secretItem = null;
  this.guesses = [];

  this.chooseSecretItem = (catalog) => {
    this.secretItem =
      catalog[Math.floor(Math.random() * (difficulty.value + 1))];
  };

  this.addItem = (catalog, difficulty) => {
    for (let i = 0; i < difficulty.value; i++) {
      this.selectedItems.push(catalog[i]);
    }
  };

  this.addGuess = (guess) => {
    this.guesses.push(guess);
  };

  this.hideItem = (guess) => {
    //this.selectedItems
    //selectedItems.property = guess.property -> selectedItems.value = guess.value
  };
}

function guess(property, value) {
  (this.property = property), (this.value = value);
  this.guessed = false;

  this.changeGuess = (guessedValue) => {
    this.guessed = guessedValue;
  };
}

function celebritiesCatalog() {
  this.catalog = [];
  this.addCatalog = (catalog) => {
    this.catalog = catalog;
  };
  this.addCelebrity = (celebrity) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO CELEBRITIES(Photo, Profession, HairColor, Glasses, SkinColor, Gender, Hat, AgeRange, Mustache, EyeColor, Name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.run(
        sql,
        [
          celebrity.photo,
          celebrity.profession,
          celebrity.hairColor,
          celebrity.glasses,
          celebrity.skinColor,
          celebrity.gender,
          celebrity.hat,
          celebrity.ageRange,
          celebrity.mustache,
          celebrity.eyeColor,
          celebrity.name,
          this.id,
        ],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  };
  this.deleteClebrities = (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CELEBRITIES WHERE ID_Cel = ?`;
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve("Celebrity deleted successfully");
      });
    });
  };
  this.updateCelebritiesProperty = (property, oldValue, newValue) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE CELEBRITIES SET ${property} = ? WHERE ${property} = ?`;
      db.run(sql, [newValue, oldValue], function (err) {
        if (err) {
          reject(`Failed to update ${property}: ${err.message}`);
        } else {
          resolve(`Successfully updated ${this.changes} records`);
        }
      });
    });
  };
}

function difficulty(type) {
  this.type = type; //type = easy, medium, hard
  this.value = 12;
  this.k = 1;
  if (this.type == "medium") {
    this.value = 24;
    this.k = 2;
  } else if (this.type == "hard") {
    this.value = 36;
    this.k = 3;
  }
}

async function main() {
  const catalog = await getAllCelebrities();
  const C = new celebritiesCatalog();
  //const r =await C.deleteClebrities(23);
  //console.log(r);
  //const r1 = await C.addCelebrity(new Celebrity("chris.jpg","Actor","Blonde","No","Light","Male","No","Middle-Aged","No","Blue","Chris Hemsworth"));
  //console.log("L'errore  è ",r1);
  const r2 = await C.deleteClebrities(38);
  const blondeCelebrities = await getAllSpecificCelebrities("Blonde");
  //console.log(blondeCelebrities);
}

main();
