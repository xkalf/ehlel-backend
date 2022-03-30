const router = require("express").Router();
const Address = require("../models/Address");

router.get("/:id", async (req, res) => {
  try {
    const qId = req.params.id;
    const address = Address.findById(qId);
    if (!address) res.status(400).json("User not found");
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const address = await new Address(req.body);
    if (!address) res.status(402).json("Cannot save");
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
