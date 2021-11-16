const router = require('express').Router();
const { Category, Product, Category } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesDB = await Category.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(categoriesDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDB = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product
      }]
    });
    if (!categoryDB) {
      res.status(404).json({
        message: 'There is no category with this id!'
      });
      return;
    }
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryDB = await Category.create(req.body)
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(500).json(err);
  };
});
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryDB = await Category.update({
      category_name: req.body.category_name},
      {
      where: {
        id: req.params.id
      }
    });
    if (!categoryDB) {
      res.status(404).json({
        message: 'There is no category with this id!'
      });
      return;
    }
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDB = await Category.destroy(
      {
      where: {
        id: req.params.id
      }
    });
    if (!categoryDB) {
      res.status(404).json({
        message: 'There is no category with this id!'
      });
      return;
    }
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
