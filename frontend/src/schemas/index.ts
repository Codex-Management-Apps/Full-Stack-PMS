import * as z from "zod"

export const postSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export const addEmpSchema = z.object({
    firstname: z.string().min(1),
    middlename: z.string().min(1),
    lastname: z.string().min(1),
    addressline: z.string().min(1),
    barangay: z.string().min(1),
    province: z.string().min(1),
    country: z.string().min(1),
});