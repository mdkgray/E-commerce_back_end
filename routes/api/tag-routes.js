const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET ALL TAGS
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
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
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
    console.log(err);
    res/status(400).json(err);
  });
});

// // CREATE a location
// router.post('/', async (req, res) => {
//   try {
//     const locationData = await Location.create(req.body);
//     res.status(200).json(locationData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// UPDATE A TAG
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    return ProductTag.findAll({ where: { tag_id: req.params.id } });
  })
  .then((productTags) => {
    const productTagIds = productTags.map(({ product_id }) => product_id);
    const newProductTags = req.body.productIds
    .filter((product_id) => !productTagIds.includes(product_id))
    .map((product_id) => {
      return {
        tag_id: req.params.id,
        product_id
      };
    });

    const productTagsToRemove = productTags
    .filter(({ product_id }) => !req.body.productIds.includes(product_id))
    .map(({ id }) => id);

    return Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  })
  .then((updatedProductTags) => res.json(updatedProductTags))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

// DELETE A TAG 
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
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
