import {Department} from "./department"

export type Designation = {
    id: string,
    department_id: Department,
    designation_name: string,
    status: string,
}