import mongoose from "mongoose"
import User from "../models/user.js"
import Transaction from "../models/transaction.js"

const sendMoney = async (req, res) => {
  const { toUserId, amount } = req.body
  const senderId = req.user.id
  console.log("toUserId",toUserId)
  console.log("senderId",senderId)
  //  Prevent self transfer
  if (senderId === toUserId) {
    return res.status(400).json({ message: "Cannot send money to yourself" })
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    //  Find sender and receiver inside session
    const sender = await User.findById(senderId).session(session)
    const receiver = await User.findById(toUserId).session(session)

    if (!sender || !receiver) {
      await session.abortTransaction()
      return res.status(404).json({ message: "User not found" })
    }

    //  Check balance
    if (sender.balance < amount) {
      await session.abortTransaction()
      return res.status(400).json({ message: "Insufficient balance" })
    }

    //  Atomic balance update
    await User.findByIdAndUpdate(
      senderId,
      { $inc: { balance: -amount } },
      { session }
    )
    await User.findByIdAndUpdate(
      toUserId,
      { $inc: { balance: +amount } },
      { session }
    )

    //  Save two transaction records
    await Transaction.create(
      [
        { senderId, receiverId: toUserId, amount, type: "debit", status: "success" },
        { senderId, receiverId: toUserId, amount, type: "credit", status: "success" },
      ],
      { session ,ordered:true}
    )

    //  Commit
    await session.commitTransaction()

    res.status(200).json({ message: "Transfer successful" })

  } catch (err) {
    await session.abortTransaction()
    res.status(500).json({ message: err.message })

  } finally {
    session.endSession()
  }
}

 const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id

    const transactions = await Transaction.find({
      $or: [
        { senderId: userId },
        { receiverId: userId },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "name email")
      .populate("receiverId", "name email")

    res.status(200).json(transactions)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {sendMoney,getTransactions}