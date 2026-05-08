const { Router } = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async function (req, res) {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    return res.json({ message: account.balance });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Balance not found",
    });
  }
});

accountRouter.post("/transfer", authMiddleware, async function (req, res) {
  const session = await mongoose.startSession();
  s;
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      },
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      },
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  } finally {
    session.endSession();
  }
});

module.exports = accountRouter;
