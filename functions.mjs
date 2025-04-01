import sqlite from "sqlite3";
const db = new sqlite.Database("myDatabase.db", (err) => {
  if (err) throw err;
});

function getAllCelebrities() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CELEBRITIES";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err); // Se c'è un errore, la Promise viene rifiutata
      } else {
        resolve(rows); // La Promise viene risolta con i dati
      }
    });
  });
}

async function main() {
  const catalog = await getAllCelebrities();
  console.log(catalog);
}

main();

/*
//ora uso delle condizioni specifiche
// Funzione per ottenere i dati delle celebrità in base a condizioni specifiche
function getAllBlondeCelebrities() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CELEBRITIES WHERE HairColor = 'blonde'";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

getAllBlondeCelebrities()
  .then((blondeCelebrities) => {
    let blondeCelebrityArray = blondeCelebrities;
    console.log(blondeCelebrityArray);
  })
  .catch((err) => {
    console.error("Errore nel recupero delle celebrità bionde:", err);
  });

function addCelebrity(celebrity) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO CELEBRITIES (photo, profession, hairColor, glasses, skinColor, gender, hat, ageRange, mustache, eyeColor) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
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
    ];

    db.run(sql, values, function (err) {
      if (err) reject(err);
      else resolve("Celebrity added successfully");
    });
  });
}

addCelebrity({
  photo: "photo_url2",
  profession: "rockstar",
  hairColor: "red",
  glasses: "yes",
  skinColor: "black",
  gender: "female",
  hat: "yes",
  ageRange: "20-30",
  mustache: "no",
  eyeColor: "green",
})
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.error(err);
  });

function deleteCelebrity(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM CELEBRITIES WHERE ID_Cel = ?`;

    const values = [id]; // Devi passare solo l'ID come valore

    db.run(sql, values, function (err) {
      if (err) reject(err);
      else resolve("Celebrity deleted successfully");
    });
  });
}

deleteCelebrity(1)
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.error(err);
  }); */
