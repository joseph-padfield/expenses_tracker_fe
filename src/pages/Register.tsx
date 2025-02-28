import { SubmitHandler, useForm} from "react-hook-form"
import { z } from "zod"
import { zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
    "name": z.string(),
    "email": z.string().email(),
    "password": z.string().min(8)
})