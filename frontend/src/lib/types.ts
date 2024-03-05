export type AssignDesignation = {
    id: string,
    employeeType: string,
    status: string,
    designation: Designation,
    employee: Employee,
}

export type Designation = {
    id: string,
    departmentId: Department,
    designationName: string,
    status: string,
}
export type Department = {
    departmentName: string,
    status: string,
}

export type Employee = {
    id?: string,
    address_line: string;
    barangay: string;
    country: string;
    firstname: string;
    lastname: string;
    middlename: string;
    province: string;
    last_update?: string;
};

export type AssignDesignationSubmission = {
    employeeType: string,
    status: string,
    designation:{
        id:string
    },
    employee:{
        id:string
    }
}