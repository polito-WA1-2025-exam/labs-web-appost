function celebrities(
  photo,
  profession,
  hairColor,
  glasses,
  skinColor,
  gender,
  hat,
  ageRange,
  mustache,
  eyeColor
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
  this.addCelebrity = (celebrity) => {
    this.catalog.push(celebrity);
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
