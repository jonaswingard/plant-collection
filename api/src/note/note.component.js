import express from 'express';
import Note from '../note/note.model';
import Activity from '../activity/activity.model';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) =>
  Note.find({ plant_id: req.params.id }, (err, notes) => {
    res.send(notes);
  })
);

router.post('/', (req, res) =>
  new Note(req.body).save((err, note) => res.send(note))
);

router.put('/:noteId', (req, res) =>
  Note.findByIdAndUpdate(req.params.noteId, req.body, (err, note) =>
    res.send(note)
  )
);

router.delete('/:noteId', (req, res) =>
  Note.findByIdAndRemove(req.params.noteId, () => res.sendStatus(204))
);

module.exports = router;
