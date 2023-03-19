const { "Dinos": dinoData = [] } = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
};

const comparisonFactory = (() => {
    const compare = ({ species, otherAnimals = [], topic }) => otherAnimals
        .slice(otherAnimals.findIndex(({ species: lookaheadSpecies }) => species === lookaheadSpecies), otherAnimals.length)
        .filter(({ species: lookaheadSpecies }) => species !== lookaheadSpecies)
        .map(({ species }) => species)
        .reduce((acc, next) => Object.assign({}, acc, { species: [...acc.species, next] }), { topic, species: [] });

    const tallerThanComparison = ({
        species,
        otherAnimals = dinosaurs.sort((a, b) => b.feet - a.feet)
    }) => compare({ species, otherAnimals, topic: "taller than" });

    const sameDietThanComparison = (({ species, otherAnimals }) => {
        const { diet } = otherAnimals.find(({ species: lookaheadSpecies }) => species === lookaheadSpecies);
        return otherAnimals
            .filter((({ diet: lookaheadDiet, species: lookaheadSpecies }) => diet === lookaheadDiet && species !== lookaheadSpecies))
            .map(({ species }) => species)
            .reduce((acc, next) => Object.assign({}, acc, { species: [...acc.species, next] }), { topic: "same diet", species: [] });
    });

    const heavierThanComparison = ({
        species,
        otherAnimals = dinosaurs.sort((a, b) => b.lbs - a.lbs)
    }) => compare({ species, otherAnimals, topic: "heavier than" });

    const getComparisons = ({ species, otherAnimals = [] }) => ({
        tallerThan: tallerThanComparison({ species, otherAnimals }),
        heavierThan: heavierThanComparison({ species, otherAnimals }),
        sameDietThan: sameDietThanComparison({ species, otherAnimals })
    });

    return { getComparisons };
})();


const sameDietHabitThanComparison = (baseAnimal, otherAnimals = []) => {

}

const convertInchesToFoot = (inches) => parseFloat(inches * 0.0833333);
// const convertFootToInches = (foot) => parseFloat(foot * 12);

const shuffle = (arr = []) => {
    const max = arr.length * 2;
    return arr
        .reduce((acc, next) => {
            const index = Math.random();
            return [...acc, { i: acc.find(({ i }) => index !== i) ? index : index + max, next }];
        }, [])
        .sort((a, b) => a.i - b.i)
        .map(({ next }) => next);
};

const HUMAN_CONFIG = { species: "Human", config: { color: 'rgba(106, 125, 204, 0.5)', filename: 'human.png' } };

const DINOSAUR_CONFIGS = [
    { species: "Triceratops", config: { color: 'rgba(5, 155, 140, 0.8)', filename: 'triceratops.png' } },
    { species: "Tyrannosaurus Rex", config: { color: 'rgba(222, 124, 95, 0.8)', filename: 'tyrannosaurus rex.png' } },
    { species: "Anklyosaurus", config: { color: 'rgba(79, 181, 194, 0.8)', filename: 'anklyosaurus.png' } },
    { species: "Brachiosaurus", config: { color: 'rgba(245, 188, 103, 0.8)', filename: 'brachiosaurus.png' } },
    { species: "Stegosaurus", config: { color: 'rgba(107, 170, 106, 0.8)', filename: 'stegosaurus.png' } },
    { species: "Elasmosaurus", config: { color: 'rgba(187, 70, 108, 0.8)', filename: 'elasmosaurus.png' } },
    { species: "Pteranodon", config: { color: 'rgba(129, 102, 181, 0.8)', filename: 'pteranodon.png' } },
    { species: "Pigeon", config: { color: 'rgba(129, 102, 181, 0.8)', filename: 'pigeon.png' } },
];

const dinosaurs = dinoData.map(({ species, fact, weight, diet, height }) => new Dinosaur(species, fact, height, weight, diet));

const tilesFactory = (({ dinosaurs, humanConfig, dinosaurConfigs = [], shuffle }) => {
    const { config: { filename, humanImageUrl = `images/${filename}`, color } } = humanConfig;
    let tiles = [...dinosaurs
        .map(({ species, fact }) => {
            const { config: { color, filename } } = dinosaurConfigs.find(({ species: lookaheadSpecies }) => species === lookaheadSpecies);
            const imageUrl = `images/${filename}`;
            const comparisons = comparisonFactory.getComparisons(({ species, otherAnimals: dinosaurs }));
            return new Tile(species, fact, color, imageUrl);
        }), new Tile("unnamed human", "", color, humanImageUrl)];

    const byHumanTile = ({ imageUrl }) => "images/human.png" === imageUrl;
    const byDinosaurTile = ({ imageUrl }) => "images/human.png" !== imageUrl;
    const randomizeTiles = () => {
        const humanTile = tiles.find(byHumanTile);
        const randomizableTiles = shuffle(tiles.filter(byDinosaurTile));
        tiles = [...randomizableTiles.slice(0, 4), humanTile, ...randomizableTiles.slice(4, 9)];
    };

    const setHumanTile = ({ tile: newTile }) => {
        tiles = tiles.map(tile => humanImageUrl !== tile.imageUrl ? tile : newTile);
        randomizeTiles();
    };

    const getTiles = () => (tiles);

    randomizeTiles();

    return { getTiles, randomizeTiles, setHumanTile };
})({ dinosaurs, humanConfig: HUMAN_CONFIG, dinosaurConfigs: DINOSAUR_CONFIGS, shuffle });

function Tile(name, fact, color, imageUrl) {
    this.name = name;
    this.fact = fact;
    this.color = color;
    this.imageUrl = imageUrl;
}

function Animal(species, fact, inches, lbs, diet) {
    this.species = species;
    this.fact = fact;
    this.inches = inches;
    this.feet = convertInchesToFoot(inches);
    this.lbs = lbs;
    this.diet = diet;
}

Animal.prototype.getFact = function () {
    return this.fact;
}

function Dinosaur(species, fact, inches, weight, diet) {
    Animal.call(this, species, fact, inches, weight, diet);
}

Dinosaur.prototype = Object.create(Animal.prototype);
Dinosaur.prototype.constructor = Dinosaur;

Dinosaur.prototype.getSpecies = function () {
    return this.species;
}

function Human(species, fact, inches, weight, diet, name) {
    Animal.call(this, species, fact, inches, weight, diet);
    this.name = name;
}

Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human;


const createTileEl = ({ imageUrl, name, color, fact }) => {
    const dinosaurContainerEl = document.createElement("div");
    const dinosaurDataContainerEl = document.createElement("div");
    dinosaurDataContainerEl.classList = ['dinosaur-data-container'];
    dinosaurDataContainerEl.innerHTML = "some data goes here";
    dinosaurContainerEl.classList = ['dinosaur-container'];
    dinosaurContainerEl.style.backgroundColor = color;
    const dinosaurNameContainerEl = document.createElement("div");
    dinosaurNameContainerEl.classList = ['dinosaur-name-container'];
    const dinosaurNameEl = document.createElement("dinosaur-name");
    dinosaurNameEl.classList = ["dinosaur-name"];
    dinosaurNameEl.textContent = name;
    const dinosaurImageContainerEl = document.createElement("div");
    dinosaurImageContainerEl.classList = ["dinosaur-img-container"];
    const dinosaurImageEl = document.createElement("div");
    dinosaurImageEl.classList = ["dinosaur-img"];
    const imageEl = document.createElement("img");
    imageEl.classList = ["dinosaur"];
    imageEl.setAttribute("src", `./${imageUrl}`);
    imageEl.setAttribute("alt", "");
    imageEl.setAttribute("srcset", "");
    imageEl.setAttribute("width", "380px");
    imageEl.setAttribute("height", "220px");
    dinosaurNameContainerEl.appendChild(dinosaurNameEl);
    dinosaurImageEl.appendChild(imageEl);
    dinosaurImageContainerEl.appendChild(dinosaurImageEl);
    const factContainerEl = document.createElement("div");
    factContainerEl.classList = ["fact-container"];
    const factTextEl = document.createElement("div");
    factTextEl.classList = ["fact-text"];
    factTextEl.textContent = fact;
    factContainerEl.appendChild(factTextEl);
    dinosaurContainerEl.appendChild(dinosaurDataContainerEl);
    dinosaurContainerEl.appendChild(dinosaurNameContainerEl);
    dinosaurContainerEl.appendChild(dinosaurImageContainerEl);
    dinosaurContainerEl.appendChild(factContainerEl);
    dinosaurContainerEl.addEventListener("mouseenter", () => {
        dinosaurContainerEl.style.transition = "background-color 0.6s ease";
        dinosaurContainerEl.style.backgroundColor = 'rgba(0,0,0,0.2)';
        imageEl.style.transition = "left 0.6s ease";
        imageEl.style.left = '-100px';
        dinosaurDataContainerEl.style.transition = "display 0.6s ease";
        dinosaurDataContainerEl.style.display = "block";
    });

    dinosaurContainerEl.addEventListener("mouseleave", () => {
        dinosaurContainerEl.style.backgroundColor = color;
        dinosaurDataContainerEl.style.display = "none";
        imageEl.style.left = '54px';
    });
    return dinosaurContainerEl;
}

(function () {
    window.addEventListener("load", () => {
        const mainElements = (function () {
            const compareButton = document.getElementById('btn');
            const dinoCompareForm = document.getElementById('dino-compare');
            const nameInput = document.getElementById('name');
            const feetInput = document.getElementById('feet');
            const inchesInput = document.getElementById('inches');
            const weightInput = document.getElementById('weight');
            const dietDropDown = document.getElementById('diet');
            const grid = document.getElementById('grid');

            return {
                compareButton,
                dinoCompareForm,
                nameInput,
                feetInput,
                inchesInput,
                weightInput,
                dietDropDown,
                grid
            }
        })();

        mainElements.compareButton.addEventListener('click', () => {
            const { value: nameText } = mainElements.nameInput;
            const { value: inchesText } = mainElements.inchesInput;
            const { value: feetText } = mainElements.feetInput;
            const { value: weightText } = mainElements.weightInput;
            const { options: dietOptions, value: dietSelectedValue } = mainElements.dietDropDown;
            const dietText = Array.from(dietOptions).find(({ value }) => dietSelectedValue === value).innerHTML
            const requiredFields = [
                nameText,
                inchesText,
                feetText,
                weightText,
                dietSelectedValue
            ];

            const everyFieldWasFilled = requiredFields.every((value) => 'string' === typeof value && 0 !== value.length);

            if (!everyFieldWasFilled) {
                alert('please fill all fields')
                return;
            }

            const inches = parseFloat(inchesText);
            const feet = parseFloat(feetText);
            const weight = parseFloat(weightText);
            const human = new Human("Human", "", inches, weight, dietText, nameText);
            const { config: { filename, humanImageUrl = `images/${filename}`, color } } = HUMAN_CONFIG;
            const humanTile = new Tile(human.name, human.fact, color, humanImageUrl);
            tilesFactory.setHumanTile({ tile: humanTile });
            const tilesEls = tilesFactory
                .getTiles()
                .map((tile) => createTileEl(tile));
            tilesEls.forEach(tile => mainElements.grid.appendChild(tile));
            mainElements.dinoCompareForm.style = "display:none";
        });
    });

})();