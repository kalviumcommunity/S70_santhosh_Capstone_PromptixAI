import Razorpay from 'razorpay';
import crypto from 'crypto';
import userModel from '../models/userModel.js';
import { plans } from '../config/plans.js';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/user/pay-razor
export const razorpayOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.userID;

    if (!userId || !planId) {
      return res.json({ success: false, message: 'Missing details' });
    }

    const plan = plans.find((p) => p.id === planId);
    if (!plan) {
      return res.json({ success: false, message: 'Invalid plan' });
    }

    const shortId = String(userId).slice(-8);
    const shortTs = String(Date.now()).slice(-8);
    const order = await razorpayInstance.orders.create({
      amount: plan.price * 100, // paise (INR)
      currency: 'INR',
      receipt: `rcpt_${shortId}_${shortTs}`,   // max 40 chars
      notes: { planId, userId, credits: plan.credits },
    });

    res.json({ success: true, order, plan });
  } catch (error) {
    const errMsg = error?.error?.description || error?.message || 'Razorpay order failed';
    console.error('razorpayOrder error:', errMsg, error);
    res.json({ success: false, message: errMsg });
  }
};

// POST /api/user/verify-razor
export const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
    } = req.body;
    const userId = req.userID;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: 'Payment verification failed' });
    }

    const plan = plans.find((p) => p.id === planId);
    if (!plan) {
      return res.json({ success: false, message: 'Invalid plan' });
    }

    // Top up credits
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: plan.credits } },
      { new: true }
    );

    res.json({
      success: true,
      message: `${plan.credits} credits added successfully!`,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error('verifyRazorpay error:', error);
    res.json({ success: false, message: error.message });
  }
};
