const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET ALL TAGS
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        { 
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']  
        }
      ]
    });
  
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE TAG 
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [
        { 
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']  
        }
      ]
    });

    if (!tagData) {
      res.status(400).json({ message: 'No tag found with that Id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE A TAG 
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATE A TAG
router.put('/:id', async (req, res) => {
  try{
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that Id' });
      return;
    }

    res.status(200).json(tagData); 
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE A TAG 
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that Id' });
      return;
    };

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
