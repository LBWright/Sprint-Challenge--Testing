const express = require('express');
const server = express();
server.use(express.json());

let games = [
  {
    id: '1',
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  },
  {
    id: '2',
    title: 'DragonAge', // required
    genre: 'RPG', // required
    releaseYear: 2009 // not required
  },
  {
    id: '3',
    title: 'Halo', // required
    genre: 'First Person Shooter', // required
    releaseYear: 2003 // not required
  }
];
let id = 3;

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  let game = games.filter(game => game.id === id);
  if (game.length === 0) {
    res.status(404).json({ error: 'Game not found' });
  }
  game = game[0];
  res.status(200).json(game);
});

server.post('/games', (req, res) => {
  const game = req.body;
  if (!game.title || !game.genre) {
    return res
      .status(422)
      .json({ error: 'All games must have a title and genre' });
  }
  game.id = ++id;
  games.push(game);
  res.status(201).json(games);
});

module.exports = server;
