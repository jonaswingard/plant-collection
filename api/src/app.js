import express from 'express';
import mongoose from 'mongoose';
import PlantComponent from './plant/plant.component';
import NoteComponent from './note/note.component';
import ActivityComponent from './activity/activity.component';
import busboy from 'express-busboy';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const PORT = process.env.PORT || 8080;

busboy.extend(app, {
  upload: true,
  path: './public/images/plants/',
  allowedPath: /./
});

app.get('/', (req, res) => res.send('Plants API'));
app.use('/api/plants', PlantComponent);
app.use('/api/plants/:id/notes', NoteComponent);
app.use('/api/plants/:id/activities', ActivityComponent);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
