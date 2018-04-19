import express from 'express';
import Plant from './plant.model';
import Note from '../note/note.model';
import Activity from '../activity/activity.model';
import jwt from 'express-jwt';

const router = express.Router();

// router.get('/', (req, res) => Plant.find((err, plants) => res.send(plants)));

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});


router.get('/', auth, function (req, res) {
  return Plant.find((err, plants) => res.send(plants));
});


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

router.post('/:id/image/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  res.send({ url: req.files.image.file.replace('public', '') });
});

module.exports = router;
