const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET ALL CATEGORIES
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE CATEGORY
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that Id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE A CATEGORY 
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE A CATEGORY
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that Id' });
      return;
    }

    res.status(200).json(categoryData);  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE A CATEGORY 
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: require.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that Id' });
      return;
    };
    
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
