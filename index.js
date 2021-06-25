const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const uuid = require('uuid');

const Models = require('./models.js');

// call models from model.js
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/mySyfyDB', { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

//log requests to terminal
app.use(morgan('common'));
//serve "documentation.html" from "/public" folder
app.use(express.static('public'));
app.use(bodyParser.json());

//''top'' movies
let syfyFilms = [
    {
        title: 'Sharknado',
        description: 'Sharknado is a 2013 American made-for-television sci-fi disaster film about a waterspout that lifts sharks out of the ocean and deposits them in Los Angeles. It is the first installment in the Sharknado film series.',
        director: 'Anthony C. Ferrante',
        genres: 'Dark Comedy',
        image: 'https://m.media-amazon.com/images/M/MV5BODcwZWFiNTEtNDgzMC00ZmE2LWExMzYtNzZhZDgzNDc5NDkyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
    },
    {
        title: 'Sharknado 2: The Second One',
        description: 'A sequel to the 2013 television film Sharknado and the second installment in the Sharknado film series.',
        director: 'Anthony C. Ferrante',
        genres: 'Dark Comedy',
        image: 'https://m.media-amazon.com/images/M/MV5BMjA0MTIxMDEwNF5BMl5BanBnXkFtZTgwMDk3ODIxMjE@._V1_UY1200_CR113,0,630,1200_AL_.jpg'
    },
    {
        title:'Sharknado 3: Oh Hell No!',
        description: 'The third installment in the Sharknado film series.',
        director:'Anthony C. Ferrante',
        genres: 'Dark Comedy',
        image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDUzNzQzOF5BMl5BanBnXkFtZTgwMDg4NTYzNTE@._V1_.jpg'
    },
    {
        title: 'Sharktopus',
        description: 'Geneticist Nathan Sands and his daughter Nicole are hired by the U.S. Navy to create a new weapon; they create an intelligent shark that has the tentacles of an octopus, dubbed S-11, controlling the creature using electromagnetic pulses with a device attached to its head.',
        director: 'Declan O\'Brien',
        genres: 'Science Fiction',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51tdFU8yZlL._AC_.jpg'
    },
    {
        title:'Sharktopus vs. Pteracuda',
        description: 'The sequel to the 2010 SyFy original monster film Sharktopus.',
        director:'Kevin O\'Neill',
        genres:'Science Fiction',
        image: 'https://m.media-amazon.com/images/M/MV5BNDdkOTAwMTQtNGJlYS00YTY5LTk2OTgtNmMxZDk0OWJlMzFmXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg'
    },
    {
        title:'Sharktopus vs. Whalewolf',
        description: 'Since its fight with the Pteracuda, the Sharktopus is still at large and is lurking in the waters of the Dominican Republic. The third and final installment in the Sharktopus franchise, after Sharktopus (2010) and Sharktopus vs. Pteracuda (2014).',
        director:'Kevin O\'Neill',
        genres: 'Thriller',
        image: 'https://m.media-amazon.com/images/M/MV5BMTg2OGU5ZTMtOWU3MS00ZDdmLWFmMjEtZjYwZWQyZWVlZmExXkEyXkFqcGdeQXVyNjM2NTM3ODA@._V1_.jpg'
    },
    {
        title:'Big Ass Spider!',
        description: 'The film tells the story of a bug exterminator, who, with the help of a hospital security guard and the military, battles a giant spider that goes on a rampage in Los Angeles.',
        director:'Mike Mendez',
        genres:'Dark Comedy',
        image: 'https://m.media-amazon.com/images/M/MV5BOTAzNTI3Nzg4Nl5BMl5BanBnXkFtZTcwMzU5MTgwOQ@@._V1_.jpg'
    },
    {
        title:'Mega Shark Versus Giant Octopus',
        description: 'The film is about the hunt for two prehistoric sea monsters causing mayhem and carnage at sea, and is the first installment in the Mega Shark series of films.',
        director:'Jack Perez',
        genres: 'Disaster',
        image: 'https://m.media-amazon.com/images/M/MV5BNjc5OGY4YWMtNDZhZi00YjE1LTg0MzQtMmM4ODVmNjgwMjQ1XkEyXkFqcGdeQXVyOTYyMTM3OTU@._V1_.jpg'
    },
    {
        title:'Mega Shark Versus Crocosaurus',
        description: 'The film is a sequel to the 2009 film Mega Shark Versus Giant Octopus and is the second installment in the Mega Shark series of films, but contains little of the original cast from that film.',
        director:'Christopher Douglas-Olen Ray',
        genres:'Disaster',
        image: 'https://m.media-amazon.com/images/M/MV5BOTA2MmNjMjgtMTllZC00OGI0LTlhOGItZmE0ZmJmNDMzNWE1XkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_.jpg'
    },
    {
        title:'Mega Shark Versus Mecha Shark',
        description: 'The film is a sequel to Mega Shark Versus Giant Octopus and Mega Shark Versus Crocosaurus, and is the third installment in the Mega Shark film series.',
        director:'Emile Edwin Smith',
        genres: 'Disaster',
        image: 'https://m.media-amazon.com/images/M/MV5BMTQzMDIyMjgxMF5BMl5BanBnXkFtZTgwODYzNjg4MDE@._V1_.jpg'
    },
    {
        title: 'Mega Shark Versus Kolossus',
        description: 'Some time after the events of the previous film, the world\'s governments institute preparation plans in case another Mega Shark appears; another shark is awakened by Russian miners drilling underwater for red mercury.',
        director: 'Christopher Douglas-Olen Ray',
        genres:'Disaster',
        image: 'https://images-na.ssl-images-amazon.com/images/I/91aKXO9TDLL._SL1500_.jpg'
    }
]
//directors
let directors = [
    {
        name: 'Anthony C. Ferrante',
        biography: 'Anthony C. Ferrante is an American film director, producer, and writer, known for directing the Sharknado series, the 2017 thriller Forgotten Evil and the 2005 ghost story Boo, which was his feature film writing and directing debut.',
        birthday: 'July 30, 1969'
    },
    {
        name: 'Declan O\'Brien',
        biography: 'Declan O\'Brien is an American writer and director. O\'Brien is known as the director of three films in the Wrong Turn series (2009–2012). O\'Brien is the president of Utopia Pictures & Television',
        birthday:'January 01, 1962'
    },
    {
        name: 'Mike Mendez',
        biography: 'Mike Mendez was in the backyard making movies since the age of 10. At the age of 23, Mike made his first feature film "Killers," which was accepted into the Sundance Film Festival in 1997. The film was picked up by Alpine Pictures, who distributed the feature in the U.S. The film also received a worldwide theatrical release.',
        birthday: '1973'
    }
]
//genres
let genres = [
    {
        genre: 'Dark Comedy',
        description: 'A style of comedy that makes light of subject matter that is generally considered taboo, particularly subjects that are normally considered serious or painful to discuss. Writers and comedians often use it as a tool for exploring vulgar issues by provoking discomfort, serious thought, and amusement for their audience. Thus, in fiction, for example, the term black comedy can also refer to a genre in which dark humor is a core component. Popular themes of the genre include death, violence, discrimination, disease, and human sexuality.'
    },
    {
        genre: 'Science Fiction',
        description: 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and often explores the potential consequences of scientific, social, and technological innovations.'
    },
    {
        genre: 'Thriller',
        description:'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
    },
    {
        genre: 'Disaster',
        description: 'A disaster film or disaster movie is a film genre that has an impending or ongoing disaster as its subject and primary plot device. Such disasters may include natural disasters, accidents, military/terrorist attacks or global catastrophes such as a pandemic.'
    }
]

let filmStars = [
    {
        name: 'Tara Reid',
        bio: 'Tara Donna Reid is an American actress. She played Vicky in the films American Pie (1999), American Pie 2 (2001), and American Reunion (2012), and Bunny Lebowski in The Big Lebowski (1998). In 2013, she starred as April Wexler in the television film Sharknado, and went on to reprise the role in five sequels (2013–2018).',
        birthday: 'November 8, 1975',
        movies: ['American Pie','American Pie 2', 'American Reunion', 'The Big Lebowski', 'Sharknado', 'Sharknado 2: The Second One', 'Sharknado 3: Oh Hell No!', 'Sharknado: The 4th Awakens!', 'Sharknado 5: Global Swarming!']
    },
    {
        name: 'Ian Ziering',
        bio: 'Ian Ziering is an American actor and voice actor best known for his role as Steve Sanders on the television series Beverly Hills, 90210, which he played from 1990 to 2000. He is also the voice of Vinnie on Biker Mice from Mars. From 2013 to 2018, he starred as Fin Shepard in the Sharknado film series. In 2019, he played the DC Comics character Blue Devil on the series Swamp Thing.',
        birthday: 'March 30, 1964',
        movies: ['Sharknado', 'Sharknado 2: The Second One', 'Sharknado 3: Oh Hell No!', 'Sharknado: The 4th Awakens!', 'Sharknado 5: Global Swarming!']
    },
    {
        name:'Eric Roberts',
        bio:'Eric Anthony Roberts is an American actor. His career began with a leading role in King of the Gypsies (1978), for which he received his first Golden Globe Award nomination. He was again recognized at the Golden Globes for his role in Bob Fosse\'s Star 80 (1983). Roberts\' performance in Runaway Train (1985), as prison escapee Buck McGeehy, earned him a third Golden Globe nod and a nomination for the Academy Award for Best Supporting Actor.',
        birthday: 'April 18, 1956',
        movies: ['Sharktopus', 'King of the Gypsies', 'Star 80', 'Runaway Train']
    }

]


// GET requests

//express route located at the endpoint "/"
app.get('/', (req, res) => {
    res.send('Welcome to my Syfy Films database!');
});

//return list of ALL movies
app.get('/movies', (req, res) => {
    Movies.find().then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

//return data about a single movie by title 
app.get('/movies/:Title', (req,res) => {
    Movies.findOne( { Title: req.params.Title}).then((movie) => {
        res.json(movie);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

//Return data about a specific genre (description) by name
app.get('/movies/genre/:Name', (req, res)=>{
    Movies.findOne( { "Genre.Name": req.params.Name }).then((movies) => {
        res.json(movies.Genre);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

//Return data about a director by name
app.get('/movies/director/:Name', (req, res) => {
    Movie.findOne( { "Director.Name": req.params.Name}).then((movies) => {
        res.json(movies.Director);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// Get all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//allow new users to register
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
});

// Get information about a specific user based on their username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// update username of a specific user
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    {new: true}, //this makes sure the updated document is returned
    (err, updatedUser) => {
        if(err){
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});


// deregister a user by their username
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});


//allow users to add a movie to their list favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate( { Username: req.params.Username }, {
        $addToSet: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, //this makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err){
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else{
            res.json(updatedUser);
        }
    });
});


//Allow users to remove a movie from their list of favorites 
app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate( 
        { Username: req.params.Username}, 
        {
            $pull: { FavoriteMovies: req.params.MovieID }
        },
        { new: true },
        (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser);
            }
        }
    )
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