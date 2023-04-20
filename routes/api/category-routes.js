const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  }).then((categories) => {
    res.json(categories);
  });
});

/* Category.findAll()
    .then(data => {
      console.log("Data: ", data);
      res.status(200).json(data);
    })
    .catch(error => {
    //  throw error;
      res.status(500).json({ meesage: error })
    })
    
    */

//   try {
//     const allCategories = await Category.findAll();

//     console.log("Categories: ", allCategories);
//     res.status(200).json(allCategories);
//   } catch (error) {
//     res.status(500).json({ meesage: error });
//   }
//   // be sure to include its associated Products
//   // res.send("Hit Categories Route");
// });

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  }).then((categories) => {
    res.json(categories);
  });
});

router.post("/", (req, res) => {
  // this is the information od DATA coming from the CLIENT / Request / Insomina
  console.log("request: ", req.body);
  // create a new category
  Category.create(req.body)
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((error) => {
      // throw error;
      res.status(500).json({ message: error });
    });

  //res.send("Category Post Route");
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.json(category))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.json(category))
    .catch((err) => res.json(err));
});

module.exports = router;
