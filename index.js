const express = require('express'),
    morgan = require('morgan');
const app = express();

let syfyFilms = [
    {
        title: 'Sharknado (2013)',
        description: 'Sharknado is a 2013 American made-for-television sci-fi disaster film about a waterspout that lifts sharks out of the ocean and deposits them in Los Angeles. It is the first installment in the Sharknado film series.',
        genre: 'Dark Comedy, Science Fiction, Horror',
        productionCompany: 'Syfy Films',
        director: 'Anthony C. Ferrante',
        musicComp: 'Ramin Kousha',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BODcwZWFiNTEtNDgzMC00ZmE2LWExMzYtNzZhZDgzNDc5NDkyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'

    },
    {
        title: 'Sharknado 2: The Second One (2014)',
        description: 'A sequel to the 2013 television film Sharknado and the second installment in the Sharknado film series.',
        genre: 'Dark Comedy, Science Fiction, Horror',
        productionCompany: 'Syfy Films',
        director: 'Anthony C. Ferrante',
        musicComp: 'Christopher Cano, Chris Ridenhour',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BMjA0MTIxMDEwNF5BMl5BanBnXkFtZTgwMDk3ODIxMjE@._V1_UY1200_CR113,0,630,1200_AL_.jpg'

    },
    {
        title: 'Sharknado 3: Oh Hell No! (2015)',
        description: 'The third installment in the Sharknado film series.',
        genre: 'Dark Comedy, Science Fiction, Horror',
        productionCompany: 'Syfy Films',
        director: 'Anthony C. Ferrante',
        musicComp: 'Christopher Cano, Chris Ridenhour',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDUzNzQzOF5BMl5BanBnXkFtZTgwMDg4NTYzNTE@._V1_.jpg'

    },
    {
        title: 'Sharktopus (2010)',
        description: 'Geneticist Nathan Sands and his daughter Nicole are hired by the U.S. Navy to create a new weapon; they create an intelligent shark that has the tentacles of an octopus, dubbed S-11, controlling the creature using electromagnetic pulses with a device attached to its head.',
        genre: 'Dark Comedy, Science Fiction, Horror',
        productionCompany: 'Syfy Films',
        director: 'Declan O\'Brien',
        musicComp: 'Tom Hiel',
        officialLang: 'English',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51tdFU8yZlL._AC_.jpg'
    },
    {
        title: 'Sharktopus vs. Pteracuda (2014)',
        description: 'The sequel to the 2010 SyFy original monster film Sharktopus.',
        genre: 'Dark Comedy, Science Fiction, Horror',
        productionCompany: 'Syfy Films',
        director: 'Kevin O\'Neill',
        musicComp: 'Cynthia Brown',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BNDdkOTAwMTQtNGJlYS00YTY5LTk2OTgtNmMxZDk0OWJlMzFmXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg'
    },
    {
        title: 'Sharktopus vs. Whalewolf (2015)',
        description: 'Since its fight with the Pteracuda, the Sharktopus is still at large and is lurking in the waters of the Dominican Republic. The third and final installment in the Sharktopus franchise, after Sharktopus (2010) and Sharktopus vs. Pteracuda (2014).',
        genre: 'Dark Comedy, Science Fiction, Thriller',
        productionCompany: 'Syfy Films',
        director: 'Kevin O\'Neill',
        musicComp: 'Charles Bernstein, Ryan Beveridge',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BMTg2OGU5ZTMtOWU3MS00ZDdmLWFmMjEtZjYwZWQyZWVlZmExXkEyXkFqcGdeQXVyNjM2NTM3ODA@._V1_.jpg'
    },
    {
        title: 'Big Ass Spider! (2013)',
        description: 'The film tells the story of a bug exterminator, who, with the help of a hospital security guard and the military, battles a giant spider that goes on a rampage in Los Angeles.',
        productionCompany: 'Epic Pictures Group',
        genre: 'Horror, Comedy, Science Fiction',
        director: 'Mike Mendez',
        musicComp: 'Ceiri Torjussen',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BOTAzNTI3Nzg4Nl5BMl5BanBnXkFtZTcwMzU5MTgwOQ@@._V1_.jpg'
    },
    {
        title: 'Mega Shark Versus Giant Octopus (2009)',
        description: 'The film is about the hunt for two prehistoric sea monsters causing mayhem and carnage at sea, and is the first installment in the Mega Shark series of films.',
        productionCompany: 'The Asylum',
        genre: 'Horror, Science Fiction, Disaster',
        director: 'Jack Perez',
        musicComp: 'Chris Ridenhour',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BNjc5OGY4YWMtNDZhZi00YjE1LTg0MzQtMmM4ODVmNjgwMjQ1XkEyXkFqcGdeQXVyOTYyMTM3OTU@._V1_.jpg'
    },
    {
        title: 'Mega Shark Versus Crocosaurus (2010)',
        description: 'The film is a sequel to the 2009 film Mega Shark Versus Giant Octopus and is the second installment in the Mega Shark series of films, but contains little of the original cast from that film.',
        productionCompany: 'The Asylum',
        genre: 'Horror, Science Fiction, Disaster',
        director: 'Christopher Douglas-Olen Ray',
        musicComp: 'Chris Ridenhour',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BOTA2MmNjMjgtMTllZC00OGI0LTlhOGItZmE0ZmJmNDMzNWE1XkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_.jpg'
    },
    {
        title: 'Mega Shark Versus Mecha Shark (2014)',
        description: 'The film is a sequel to Mega Shark Versus Giant Octopus and Mega Shark Versus Crocosaurus, and is the third installment in the Mega Shark film series.',
        productionCompany: 'The Asylum',
        genre: 'Horror, Science Fiction, Disaster',
        director: 'Emile Edwin Smith',
        musicComp: 'Isaac Sprintis',
        officialLang: 'English',
        image: 'https://m.media-amazon.com/images/M/MV5BMTQzMDIyMjgxMF5BMl5BanBnXkFtZTgwODYzNjg4MDE@._V1_.jpg'
    },
    {
        title: 'Mega Shark Versus Kolossus (2015)',
        description: 'Some time after the events of the previous film, the world\'s governments institute preparation plans in case another Mega Shark appears; another shark is awakened by Russian miners drilling underwater for red mercury.',
        productionCompany: 'The Asylum',
        genre: 'Horror, Science Fiction, Disaster',
        director: 'Christopher Douglas-Olen Ray',
        musicComp: 'Chris Ridenhour',
        officialLang: 'English',
        image: 'https://images-na.ssl-images-amazon.com/images/I/91aKXO9TDLL._SL1500_.jpg'
    }
]

// GET requests

//log request to terminal
app.use(morgan('common'));

//express route located at the endpoint "/"
app.get('/', (req, res) => {
  res.send('Welcome to my Syfy Films database!');
});

//"documentation.html" from "/public" folder
app.use(express.static('public'));

//route located at the endpoint "/movies"
app.get('/movies', (req, res) => {
  res.json(syfyFilms);
});

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});