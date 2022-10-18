import express from "express";
import Order from "../models/order.js";
import passport from "passport";

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

//GET::list of all orders
//http://localhost:3000/api/orders/
router.get("/", async (req, res) => {
  console.log("The user that made this request is:", req.user);
  const orders = await Order.find().populate("user");

  return res.status(200).json(orders);
});

//GET::list of all orders by user id
//http://localhost:3000/api/orders/byuser/633d47d1628fa92dfc021122 (! example user id)
router.get("/byuser/:userid", async (req, res) => {
  const orders = await Order.find({ user: req.params.userid }).populate("user");

  return res.status(200).json(orders);
});

//GET::list of all orders by user id
//http://localhost:3000/api/orders/byuser/633d47d1628fa92dfc021122 (! example user id)
router.get("/myorders", async (req, res) => {
  console.log("the user is ", req.user);
  //req.user gives us access to the user who requested this endpoint
  const orders = await Order.find({ user: req.user._id }).populate("user");

  return res.status(200).json(orders);
});

//POST:: create new order
//http://localhost:3000/api/orders/create
//BODY
// {
// 	"orderDescription":"Tasty tea order 3",
// 	"totalPrice":100,
// 	"vat":19,
// 	"totalPriceInclVat":119,
// 	"userID":"633d47d1628fa92dfc021122"
// }
router.post("/create", async (req, res) => {
  try {
    const createdOrder = await Order.create({
      orderDescription: req.body.orderDescription,
      totalPrice: req.body.totalPrice,
      vat: req.body.vat,
      totalPriceInclVat: req.body.totalPriceInclVat,
      user: req.body.userID, //we post the user ID, this is a reference to the user document
    });

    return res.status(200).json({ message: "Order was created", createdOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
