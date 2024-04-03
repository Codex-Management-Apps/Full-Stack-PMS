export type returnData<T> = {
    response: T,
    hasRoles: boolean,
    hasDesignation: boolean,
}

// Fetch Data Types

export type AssignPosition = {
    created_at : string,
    employee: AssignDesignation,
    id: string,
    position: Position,
    superior: Signatory,
}

export type Position = {
    id: string,
    positionName: string,
}

export type Signatory = {
    id: string,
    status: string,
    superior: AssignPosition,
}

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
    id: string,
    departmentName: string,
    status: string,
}

export type Employee = {
    id: string,
    address_line: string,
    barangay: string,
    country: string,
    firstname: string,
    lastname: string,
    middlename: string,
    province: string,
    last_update?: string,
};



// Data for submission

export type AddEmployeeSchema = {
    address_line: string,
    barangay: string,
    country: string,
    firstname: string,
    lastname: string,
    middlename: string,
    province: string,
}
export type AssignDesignationSubmission = {
    employeeType: string,
    status: string,
    designation: Designation,
    employee: Employee,
    // Employee Data will be added after the initial creation of data
}

export type AddAssignDesignationSchema = {
    employeeType: string,
    status: string,
    designation: string,
    employee: string,
}

export type AddSignatorySchema = {
    position: string,
    status: string,
}

export type AddPositionSchema = {
    superior: string,
    position: string,
    status: string,
}

export type AddPositionSubmission = {
    employee: AssignDesignation,
    postion: Position,
    superior: Signatory
    status: string,
}


export type AddAssignPositionSubmissionSchema = {
    employee: AssignDesignation,
    position: Position,
    status: string,
}

export type SignatorySubmissionSchema = {
    status: string,
    superior: AddAssignPositionSubmissionSchema,
}