import zod from "zod";
const signupSchema = zod.object({
  name: zod.string(),
  email: zod.email(),
  password: zod.string().min(6),
});

const loginSchema = zod.object({
  email: zod.string(),
  password: zod.string().min(6),
});
export { signupSchema, loginSchema };
