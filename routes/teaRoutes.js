import express from "express";
import Tea from "../models/tea.js";

//Creating a router
const router = express.Router();

//GET request (READ)
//http://localhost/api/teas
router.get("/", async (req, res) => {
  const teas = await Tea.find();

  return res.status(200).json(teas);
});

//GET request (READ)
//TEA by id
//http://localhost/api/teas/byid/

//http:localhost:3000/api/teas/byid/6331602ecd811bb7e32113ab
router.get("/byid/:id", async (req, res) => {
  const tea = await Tea.findById(req.params.id);

  return res.status(200).json(tea);
});

//GET request (READ)
//TEA by name
//http://localhost/api/teas/byname/Ceylon Tea
router.get("/byname/:name", async (req, res) => {
  //returns the first tea it finds with that name
  const tea = await Tea.findOne({ name: req.params.name });

  if (!tea) {
    return res.status(404).json("Tea not found");
  }

  return res.status(200).json(tea);
});

//GET request (READ)
//TEA by name
//http://localhost/api/teas/byname/multiple/Ceylon Tea
router.get("/byname/multiple/:name", async (req, res) => {
  //returns the first tea it finds with that name
  const tea = await Tea.find({ name: req.params.name });

  if (!tea) {
    return res.status(404).json("Tea not found");
  }

  return res.status(200).json(tea);
});

//POST request (CREATE)
//http://localhost/api/teas/create
//BODY:
// {
// 	"name":"Ceylon Tea",
// 	"description":"Very tasty tea from Sri Lanka",
// 	"category":"BLACKTEA",
// 	"price":"2.99"
// }

router.post("/create", async (req, res) => {
  function sanitiseCategory(string) {
    const firstChar = string[0].toUpperCase();

    return firstChar + string.slice(1);
  }

  try {
    const createdTea = await Tea.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category?.toLowerCase(), // normalization
      ingredients: req.body.ingredients,
      price: req.body.price,
      origin: req.body.origin,
    });

    return res.status(200).json({ message: "Tea created", createdTea });
  } catch (error) {
    //if there's an error
    return res.status(500).json({ message: error.message });
  }
});

//PATCH request (UPDATE resource partly)
//http://localhost/api/teas/update/632c28187b61a7af2621ef3a (! this is an example id)
//BODY
// {
// 	"name":"Jasmine Tea 6",
// 	"description":"Very tasty jasmine tea"
// }
router.patch("/update/:id", async (req, res) => {
  try {
    //first param = id
    //second param = changes I would like to make
    //last param = options

    const updatedTea = await Tea.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category?.toLowerCase(), // normalization
        price: req.body.price,
        // the operator $push will add the new value to the array, even if it already exists
        // $push: { ingredients: req.body.ingredients },
        // the operator $addToSet will only add the value, if it does not exist
        $addToSet: { ingredients: req.body.ingredients },
      },
      { new: true }
    );
    // I didn't find a tea with this ID
    if (!updatedTea) {
      return res.status(404).json("Tea not found");
    }

    return res.status(200).json({ message: "Tea updated", updatedTea });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/comments/:id", async (req, res) => {
  try {
    const updatedTea = await Tea.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            author: req.body.author,
            text: req.body.text,
          },
        },
      },
      { new: true } // return updated record
    );

    res.status(200).send(updatedTea);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// find a comment by id
router.get("/comments/:commentId", async (req, res) => {
  try {
    const tea = await Tea.find({ "comments._id": req.params.commentId });

    res.status(200).send(tea);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

//DELETE request (DELETE a resource)
//http://localhost:3000/api/teas/delete/632c28e67b61a7af2621ef3d
router.delete("/delete/:id", async (req, res) => {
  try {
    const tea = await Tea.findByIdAndDelete(req.params.id);

    //if tea does not exist
    if (!tea) {
      return res.status(404).json("Tea not found");
    }
    //send back the tea has been deleted
    return res.status(200).json({ message: "Tea Deleted", tea });
  } catch (error) {
    return res.status(500).json({ message: "Error happened" });
  }
});

//DELETE request (DELETE a resource)
//http://localhost:3000/api/teas/delete/category/BLACKTEA
router.delete("/delete/category/:category", async (req, res) => {
  try {
    //removes all the teas containing the provided category.
    const resDeleteTea = await Tea.deleteMany({
      category: req.params.category,
    });

    console.log("resDeleteTea", resDeleteTea);

    //send back the tea has been deleted
    return res.status(200).json({
      message: `Message:${resDeleteTea.deletedCount} teas were deleted.`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error happened" });
  }
});

export default router;
