import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userID;

    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: "No credit balance", creditBalance: user.creditBalance });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIP_DROP,
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer'
      }
    );

    const base64image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64image}`;

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    res.json({ success: true, image: resultImage, creditBalance: user.creditBalance - 1 });
  } catch (error) {
    console.error("Error in generateImage:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
