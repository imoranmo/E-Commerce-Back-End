const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsDB = await Tag.findAll({
      include: [{
        model: Tag
      }]
    })
    res.status(200).json(tagsDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDB = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Product}]
    });
    if (!tagDB) {
      res.status(404).json({
        message: 'There is no tag with this id!'
      });
      return;
    }
    res.status(200).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagDB = await Tag.create(req.body);
    res.status(200).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagDB = await Tag.update({
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!tagDB) {
      res.status(404).json({
        message: 'There is no tag with this id!'
      });
      return;
    }
    res.status(200).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDB = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagDB) {
      res.status(404).json({
        message: 'There is no tag with this id!'
      });
      return;
    }
    res.status(200).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
