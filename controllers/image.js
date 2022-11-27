import Clarifai from 'clarifai';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'b026f34cc94c4a8caa3f47a30a32b893'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
};

// export default handleImage;

export { handleImage, handleApiCall }