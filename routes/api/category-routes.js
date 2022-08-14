const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET ALL CATEGORIES
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
  try{
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that Id' });
      return;
    }

    res.status(200).json(categoryData); 
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE A CATEGORY 
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
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
