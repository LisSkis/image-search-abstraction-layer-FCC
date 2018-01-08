const express = require('express');
const GoogleImages = require('google-images');
const _ = require('lodash');

const { mongoose } = require('./db');
const { Search } = require('./search');

const port = process.env.PORT || 3000;
const app = express();
const googleClient = new GoogleImages('017363384425117809469:xtfnyufluw0', 'AIzaSyB8astGm0Si8bMQsty2BfvnSrm9okCPR2Y');

app.get('/api/imagesearch/:term', (req, res) => {
  const { term } = req.params;
  const page = req.query.page || req.query.offset / 10 || 1;
  googleClient.search(term, { page })
    .then((googleResponse) => {
      const images = [];
      googleResponse.forEach((pureImage) => {
        const image = {
          url: pureImage.url,
          snippet: pureImage.description,
          thumbnail: pureImage.thumbnail.url,
          context: pureImage.parentPage,
        };
        images.push(image);
      });
      const search = new Search({
        term,
        when: new Date().toISOString(),
      });
      search.save();
      res.send(images);
    });
});

app.get('/api/latest/imagesearch', (req, res) => {
  Search.find({}).then((docs) => {
    const searchQueries = [];
    docs.forEach((doc) => {
      searchQueries.push(_.pick(doc, ['term', 'when']));
    });
    res.send(searchQueries);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
