
export const validate = (schema)=>(req, res, next) => {
   console.log("schema →", schema)
  console.log("body →", req.body)
  
    const result = schema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }
    next()
}
