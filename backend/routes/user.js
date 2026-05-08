const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../../../Course-Selling-App/db");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

userRouter.post("/signup", async function (req, res) {
  const signupBody = z.object({
    email: z.string().email().min(3).max(100),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
  });

  const parsedBody = signupBody.safeParse(req.body);
  console.log("Parsed Body: ", parsedBody);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Invalid Input",
    });
  }

  const { email, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({
    email: email,
  });
  console.log(existingUser);
  if (existingUser) {
    return res.status(411).json({ message: "Email already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 3);

  const user = await User.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
  );

  return res.json({
    message: "User created successfully",
    token: token,
  });
});

userRouter.post("/signin", async function (req, res) {
  const signinBody = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string().min(3).max(100),
  });

  const parsedBody = signinBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.status(411).json({
      message: "Incorrect email / password",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
  );

  return res.json({
    token: token,
  });
});

userRouter.put("/", authMiddleware, async function (req, res) {
  const updatedBody = z.object({
    password: z.string().min(3).max(100).optional(),
    firstName: z.string().min(3).max(100).optional(),
    lastName: z.string().min(3).max(100).optional(),
  });

  const { success } = updatedBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Oops Invalid Body",
    });
  }

  try {
    console.log("Trying to update" + req.userId);

    await User.updateOne(
      {
        _id: req.userId,
      },
      req.body,
    );
  } catch (e) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update" });
  }
  res.json({ message: "Updated successfully" });
});

userRouter.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";
  console.log(filter);

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    }).select("firstName lastName");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error in fetchiung user details",
    });
  }

  return res.json({ users: users || [] });
});

module.exports = userRouter;
