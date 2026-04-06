import zod from 'zod'
const uservalidator=zod.object({
    name:zod.string(),
    password:zod.string().min(6)
})
 export {uservalidator}