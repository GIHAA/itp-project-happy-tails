const asyncHandler = require("express-async-handler");
const InventoryItem = require("../models/inventoryItemModel");

//post - add item
const addItem = asyncHandler(async (req, res) => {
  const { item_code, item_name, item_brand, category } = req.body;

  //check whether all values exists
  if (!item_code || !item_name || !item_brand || !category) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if item already exists
  const itemExists = await InventoryItem.findOne({ item_code });

  if (itemExists) {
    res.status(409);
    throw new Error("Item already exists");
  }

  //create item
  const inventoryItem = await InventoryItem.create({
    item_code,
    item_name,
    item_brand,
    category,
  });

  inventoryItem
    ? res.status(201).json(inventoryItem)
    : res.status(400).json({ message: "Failed to add item" });
});

//get - read all items
const readAllItems = asyncHandler(async (req, res) => {
  const inventoryItem = await InventoryItem.find({});

  res.status(200).json(inventoryItem);
});

//put - update
const updateItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { item_code, item_name, item_brand, category, qty } = req.body;

  //check whether all values exists
  if (!item_code || !item_name || !item_brand || !category || !qty) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const inventoryItem = await InventoryItem.findByIdAndUpdate(id, {
    item_code,
    item_name,
    item_brand,
    category,
    qty,
  });

  inventoryItem
    ? res.status(201).json(inventoryItem)
    : res.status(400).json({ message: "item not updated" });
});

//delete
const deleteItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const inventoryItem = await InventoryItem.findByIdAndDelete(id);

  inventoryItem
    ? res.status(200).json(inventoryItem)
    : res.status(400).json({ message: "item not deleted" });
});

//get one item
const getOneItem = async (req, res) => {
  const { id } = req.params;

  let item = null;

  try {
    item = await InventoryItem.findOne({ _id: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  // check if item exists
  if (!item) {
    return res.status(404).json({
      error: "item not found",
    });
  }
  res.status(200).json({ item });
};

const addQuantity = asyncHandler(async (req, res) => {
  try {
    const itemcode = req.params.itemcode;
    const qty = req.params.qty;
    const newqty = parseInt(qty);
    console.log("item qty :" + newqty);

    // Get the document to update and access the previous quantity value
    const itemToUpdate = await InventoryItem.findOne({ item_code: itemcode });
    const previousQty = itemToUpdate.qty;

    const updatedQty = previousQty + newqty;

    // Update the quantity field with the new value
    await InventoryItem.updateOne(
      { item_code: itemcode },
      { $set: { qty: updatedQty } }
    );

    // Log the update result and the previous and new quantity values
    console.log(
      `Updated item ${itemcode} quantity from ${previousQty} to ${updatedQty} by adding ${newqty}`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const subtractQuantity = asyncHandler(async (req, res) => {
  try {
    const { item_code, release_qty } = req.body;
    console.log(req.body);

    // Get the document to update and access the available_qty value
    const itemToUpdate = await InventoryItem.findOne({ item_code: item_code });
    const availableQty = itemToUpdate.qty;

    const updatedQty = availableQty - release_qty;

    // Update the quantity field with the new value
    await InventoryItem.updateOne(
      { item_code: item_code },
      { $set: { qty: updatedQty } }
    );
    res.status(200).json({ message: "Item qty updated" });

    // Log the update result and the previous and new quantity values
    console.log(
      `Updated item ${item_code} quantity from ${availableQty} to ${updatedQty} by substracting ${release_qty}`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//process stock in data
const groupByCategory = async (req, res) => {
  try {
    const stockIn = await InventoryItem.aggregate([
      {
        $match: {
          qty: { $gt: 0 }, // filter documents based on qty > 0
        },
      },
      {
        $group: {
          _id: "$category",
          total_qty_in: { $sum: "$qty" },
        },
      },
    ]);

    res.status(200).json(stockIn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addItem,
  readAllItems,
  getOneItem,
  updateItem,
  deleteItem,
  addQuantity,
  subtractQuantity,
  groupByCategory,
};
