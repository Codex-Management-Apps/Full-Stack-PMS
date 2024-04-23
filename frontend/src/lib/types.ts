export type Department = {
  id: number;
  departmentName: string;
  status: string;
  createdAt: string;
  lastUpdated: string;
};
  
export type Designation = {
  id: number;
  designationName: string;
  status: string,
  createdAt: string;
  lastUpdated: string;
};

export type EmployeeData = {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  birthday: string;
  contact: string;
  email: string;
  gender: string;
  addressLine: string;
  barangay: string;
  country: string;
  province: string;
  createdAt: string;
  lastUpdated: string;
};

export type Employee = {
  id: number;
  empNum: string;
  department: Department;
  designation: Designation;
  employeeData: EmployeeData;
  employeeType: string;
  status: string;
  createdAt: string;
  lastUpdated: string;
};

export type Signatory = {
  id: number;
  name: string;
  employee: Employee;
  status: string;
  createdAt: string;
  lastUpdated: string;
};

export type Payroll = {
  id: number;
  signatory: Signatory;
  employee: Employee;
  start: string;
  end: string;
  total_earnings: string;
  total_deductions: string;
  net_pay: string;
  status: string;
  createdAt: string;
  lastUpdated: string;
};

export type Payslip = {
  id: number,
  payroll: Payroll,
  issued_date: string,
  create_at: string,
  last_updated: string,
}

export type LeaveRequest = {
  id: number,
  name: string,
  comment: string,
  created_at: Date,
  dateOfLeave: Date,
  dateOfEnd: Date,
  last_updated: Date,
  leaveType: string,
  status: string,
  employee: Employee,
}

export type Payhead = {
  id: number;
  amount: string;
  created_at?: string;
  last_updated?: string;
  name: string;
  type: string;
};
