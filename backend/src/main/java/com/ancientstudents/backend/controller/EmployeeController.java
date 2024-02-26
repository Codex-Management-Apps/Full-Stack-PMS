package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.model.Employee;
import com.ancientstudents.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee newEmployee){
        return employeeRepository.save(newEmployee);
    }

    @GetMapping("/employees")
    List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @GetMapping("/employee/{id}")
    Employee getEmployeeById(@PathVariable Long id){
        return employeeRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }

    @PutMapping("employee/{id}")
    Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id){
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setEmp_num(newEmployee.getEmp_num());
                    employee.setFirstname(newEmployee.getFirstname());
                    employee.setMiddlename(newEmployee.getMiddlename());
                    employee.setLastname(newEmployee.getLastname());
                    employee.setAddress_line(newEmployee.getAddress_line());
                    employee.setBarangay(newEmployee.getBarangay());
                    employee.setProvince(newEmployee.getProvince());
                    employee.setCountry(newEmployee.getCountry());
                    return employeeRepository.save(employee);
                }).orElseThrow(()->new EmployeeNotFoundException(id));
    }

    @DeleteMapping("employee/{id}")
    String deleteUser(@PathVariable Long id){
        if(!employeeRepository.existsById(id)){
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";
    }
}
