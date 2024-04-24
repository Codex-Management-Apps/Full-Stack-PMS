import * as z from "zod"

export const postSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export const payrollSchema = z.object({
    signatory: z.string().min(1),
    payperiod: z.string().min(1)
})

export const DataEmployeeSchema = z.object({
    firstname: z.string().min(1),
    middlename: z.string().min(1),
    lastname: z.string().min(1),
    birthday: z.string().min(1),
    contact: z.number().min(1),
    email: z.string().email().min(1),
    gender: z.string().min(1),
    addressLine: z.string().min(1),
    barangay: z.string().min(1),
    country: z.string().min(1),
    province: z.string().min(1),
})

export const EmployeeSchema = z.object({
    department: z.string().min(1),
    designation: z.string().min(1),
    employeeType: z.string().min(1),
    status:z.string().min(1)
})

export const DepartmentEmployeeSchema = z.object({
    department: z.string().min(1),
})


export const DesignationEmployeeSchema = z.object({
    designation: z.string().min(1),
})

export const EmployeeStatusSchema = z.object({
    status: z.string().min(1),
})

export const AssignPayheadSchema = z.object({
    payhead: z.string().min(1).optional(),
    amount : z.string().min(1),
    description: z.string().min(1)
})