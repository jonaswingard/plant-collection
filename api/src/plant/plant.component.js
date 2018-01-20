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
    res.send(plant);
  });
});

router.post('/', (req, res) => {
  new Plant(req.body).save((err, plant) => {
    res.send(plant);
  });
});

router.delete('/:id', (req, res) => {
  Plant.findByIdAndRemove(req.params.id, () => {
    res.sendStatus(204);
  });
});

module.exports = router;
