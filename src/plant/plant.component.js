import express from 'express';
import Plant from './plant.model';

const router = express.Router();

router.get('/', (req, res) => {
  Plant.find((err, plants) => res.send(plants));
});

router.get('/:id', (req, res) => {
  Plant.findById(req.params.id, (err, plant) => {
    res.send(plant);
  });
});

router.put('/:id', (req, res) => {
  Plant.findByIdAndUpdate(req.params.id, req.body, (err, plant) => {
    res.sendStatus(200);
  });
});

router.post('/', (req, res) => {
  new Plant({
    name: req.body.name
  }).save(() => res.sendStatus(200));
});

router.delete('/:id', (req, res) => {
  Plant.findByIdAndRemove(req.params.id, () => {
    res.sendStatus(200);
  });
});

module.exports = router;
