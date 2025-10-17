import {z} from 'zod'

export const createPropertySchema = z.object({
    title: z.string().min(3, "Title is required  "),
    description: z.string().min(1, "Description is required"),
    price: z.number("Number is required"),
    address: z.string().min(1, "Address is required"),
    images: z.array(z.string().min(1)).min(1, "Atleast 5 images").max(10),
    currency: z.string().min(1, "required"),
    category: z.string("Category is required").min(1),
    area: z.string().min(1,"An area is reqiured"),
    state: z.string().min(1, "A state is required"),
    
})