import {Department} from "./department"

export type Designation = {
    id: string,
    departmentId: Department,
    designationName: string,
    status: string,
}