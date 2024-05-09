package com.ancientstudents.backend.tables.employee;

import com.ancientstudents.backend.exception.DataEmployeeNotFoundException;
import com.ancientstudents.backend.exception.DepartmentNotFoundException;
import com.ancientstudents.backend.exception.DesignationNotFoundException;
import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.tables.department.Department;
import com.ancientstudents.backend.tables.department.DepartmentRepository;
import com.ancientstudents.backend.tables.designation.Designation;
import com.ancientstudents.backend.tables.designation.DesignationRepository;
import com.ancientstudents.backend.tables.employeeData.EmployeeData;
import com.ancientstudents.backend.tables.employeeData.EmployeeDataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeDataRepository dataEmployeeRepository;
    @Autowired
    private DesignationRepository designationRepository;
    @Autowired
    private DepartmentRepository departmentRepository;

    // CRUD for Employee   
    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee data){
        if(data == null) return null;

        Employee emp = new Employee();
        emp.setEmployeeData(getEmployeeDataById(data.getEmployeeData().getId()));
        emp.setDepartment(getDepartmentById(data.getDepartment().getId()));
        emp.setDesignation(getDesignationById(data.getDesignation().getId()));

        emp.setEmpNum(data.getEmpNum());
        emp.setEmployeeType(data.getEmployeeType());
        emp.setStatus(data.getStatus());
        emp.setCreatedAt(new Date());
        emp.setLastUpdated(new Date());

        return employeeRepository.save(emp);
    }

    @GetMapping("/employee")
    List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @GetMapping("/employee/{id}")
    Employee getEmployeeById(@PathVariable Long id){
        if(id == null) return null;
        return employeeRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }

    @PutMapping("employee/{id}")
    Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id){
        if(id == null) return null;
        return employeeRepository.findById(id)
                .map(employee -> { 
 
                    EmployeeData oldEmpData = newEmployee.getEmployeeData();
                    EmployeeData newEmpData = updateEmployeeData(oldEmpData, oldEmpData.getId());
                    employee.setEmployeeData(newEmpData);
                    
                    employee.setDepartment(getDepartmentById(newEmployee.getDepartment().getId()));
                    employee.setDesignation(getDesignationById(newEmployee.getDesignation().getId()));

                    employee.setEmpNum(newEmployee.getEmpNum());
                    employee.setEmployeeData(newEmployee.getEmployeeData());
                    employee.setEmployeeType(newEmployee.getEmployeeType());
                    employee.setStatus(newEmployee.getStatus());
                    employee.setCreatedAt(newEmployee.getCreatedAt());
                    employee.setLastUpdated(new Date());
                    System.out.println(employee);
                    return employeeRepository.save(employee);
                }).orElseThrow(()->new EmployeeNotFoundException(id));
    }

    @DeleteMapping("employee/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
        if(!employeeRepository.existsById(id)){
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";
    }
 
    @RequestMapping(value = "employee/top", method=RequestMethod.GET)
    public Page<Employee> requestMethodName(@RequestParam(value ="count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
        Page<Employee> topEmployee = employeeRepository.findAll(pageRequest);

        return topEmployee;
    }

    private Designation getDesignationById( Long id){
        if(id == null) return null;
        return designationRepository.findById(id)
                .orElseThrow(()->new DesignationNotFoundException(id));
    }

    private Department getDepartmentById(Long id){
        if(id == null) return null;
        return departmentRepository.findById(id)
                .orElseThrow(()->new DepartmentNotFoundException(id));
    }

    EmployeeData getEmployeeDataById(Long id){
        if(id == null) return null;
        return dataEmployeeRepository.findById(id)
                .orElseThrow(()->new DataEmployeeNotFoundException(id));
    }
    
     private EmployeeData updateEmployeeData(EmployeeData newEmployee, Long id){
        if(id == null) return null;
        return dataEmployeeRepository.findById(id)
            .map(employee -> {
                employee.setFirstname(newEmployee.getFirstname());
                employee.setMiddlename(newEmployee.getMiddlename());
                employee.setLastname(newEmployee.getLastname());

                employee.setBirthday(newEmployee.getBirthday());
                employee.setContact(newEmployee.getContact());
                employee.setEmail(newEmployee.getEmail());
                employee.setGender(newEmployee.getGender());

                employee.setAddressLine(newEmployee.getAddressLine());
                employee.setBarangay(newEmployee.getBarangay()); 
                employee.setProvince(newEmployee.getBarangay());
                employee.setCountry(newEmployee.getCountry());
                employee.setCreatedAt(newEmployee.getCreatedAt());
                employee.setLastUpdated(new Date());
                return dataEmployeeRepository.save(employee);
            }).orElseThrow(()->new DataEmployeeNotFoundException(id));
    }

}
