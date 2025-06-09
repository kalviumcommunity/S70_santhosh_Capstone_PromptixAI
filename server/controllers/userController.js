  import userModel from "../models/userModel.js";
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";

  const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are mandatory" });
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.json({ success: false, message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({
        success: true,
        token,
        user: { name: newUser.name }
      });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid Password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({
        success: true,
        token,
        user: { name: user.name }
      });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };

  const userCredits = async (req, res) => {
    try {
      const userId = req.userID; // from middleware
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({
        success: true,
        credits: user.creditBalance,
        user: { name: user.name }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export { registerUser, loginUser, userCredits };
