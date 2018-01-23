import express from 'express';
import Note from '../note/note.model';
import Activity from '../activity/activity.model';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) =>
  Activity.find({ plant_id: req.params.id }, (err, activities) => {
    res.send(activities);
  }).sort('-date')
);

router.post('/', (req, res) =>
  new Activity(req.body).save((err, activities) => res.send(activities))
);

router.put('/:activityId', (req, res) =>
  Activity.findByIdAndUpdate(
    req.params.activityId,
    req.body,
    (err, activities) => res.send(activities)
  )
);

router.delete('/:activityId', (req, res) =>
  Activity.findByIdAndRemove(req.params.activityId, () => res.sendStatus(204))
);

module.exports = router;
