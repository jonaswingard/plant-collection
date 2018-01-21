import express from 'express';
import Plant from './plant.model';
import Note from '../note/note.model';

const router = express.Router();

router.get('/', (req, res) => Plant.find((err, plants) => res.send(plants)));

router.get('/:id', (req, res) =>
  Plant.findById(req.params.id, (err, plant) => res.send(plant))
);

router.post('/', (req, res) =>
  new Plant(req.body).save((err, plant) => res.send(plant))
);

router.put('/:id', (req, res) =>
  Plant.findByIdAndUpdate(req.params.id, req.body, (err, plant) =>
    res.send(plant)
  )
);

router.delete('/:id', (req, res) =>
  Plant.findByIdAndRemove(req.params.id, () => res.sendStatus(204))
);

router.get('/:id/notes', (req, res) =>
  Note.find({ plant_id: req.params.id }, (err, notes) => {
    res.send(notes);
  })
);

router.post('/:id/notes', (req, res) =>
  new Note(req.body).save((err, note) => res.send(note))
);

router.put('/:id/notes/:noteId', (req, res) =>
  Note.findByIdAndUpdate(req.params.noteId, req.body, (err, note) =>
    res.send(note)
  )
);

router.delete('/:id/notes/:noteId', (req, res) =>
  Note.findByIdAndRemove(req.params.noteId, () => res.sendStatus(204))
);

module.exports = router;
