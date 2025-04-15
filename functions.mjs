import sqlite from "sqlite3";
export const db = new sqlite.Database("myDatabase.db", (err) => {
  if (err) throw err;
});

export function getAllCelebrities() {
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

//ora uso delle condizioni specifiche
// Funzione per ottenere i dati delle celebrità in base a condizioni specifiche
export function getAllSpecificCelebrities(HairColor) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CELEBRITIES WHERE HairColor = ?";
    db.all(sql, [HairColor], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getIDCelebrity(ID_Cel) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CELEBRITIES WHERE ID_Cel = ?";
    db.get(sql, [ID_Cel], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function addCelebrity(celebrity) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO CELEBRITIES (photo, profession, hairColor, glasses, skinColor, gender, hat, ageRange, mustache, eyeColor, name) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      celebrity.name,
    ];

    db.run(sql, values, function (err) {
      if (err) reject(err);
      else resolve("Celebrity added successfully");
    });
  });
}

export function updateCelebritiesProperty(id, property, newValue) {
  return new Promise((resolve, reject) => {
    // Costruisci la query per aggiornare il campo specificato
    const sql = `UPDATE CELEBRITIES SET ${property} = ? WHERE id_Cel = ?`;

    // Esegui la query con i parametri
    db.run(sql, [newValue, id], function (err) {
      if (err) {
        reject(`Failed to update ${property}: ${err.message}`);
      } else {
        resolve(`Successfully updated ${this.changes} record(s)`);
      }
    });
  });
}

export function deleteCelebrity(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM CELEBRITIES WHERE ID_Cel = ?`;
    db.run(sql, [id], function (err) {
      if (err) reject(err);
      else resolve("Celebrity deleted successfully");
    });
  });
}

/*
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
