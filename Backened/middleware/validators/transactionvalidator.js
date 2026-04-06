import zod from 'zod'
import mongoose from 'mongoose'

const transactionSchema = zod.object({
  toUserId: zod.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid receiver ID" }
  ),
  amount: zod.coerce.number().min(1, "Amount must be at least 1"),
})

// const transactionMiddleware = (req, res, next) => {
//   const result = transactionSchema.safeParse(req.body);

//   if (!result.success) {
//     return res.status(400).json({
//       error: result.error.errors
//     });
//   }

//   req.body = result.data;
//   next();
// };

export { transactionSchema}