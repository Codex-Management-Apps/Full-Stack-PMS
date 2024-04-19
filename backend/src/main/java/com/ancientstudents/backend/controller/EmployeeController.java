package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.model.Employee;
import com.ancientstudents.backend.repository.EmployeeRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    // CRUD for Employee
    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee newEmployee){
        if(newEmployee == null) return null;
        newEmployee.setCreatedAt(new Date());
        newEmployee.setLastUpdated(new Date());
        return employeeRepository.save(newEmployee);
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
                    employee.setEmpNum(newEmployee.getEmpNum());
                    employee.setDepartment(newEmployee.getDepartment());
                    employee.setDesignation(newEmployee.getDesignation());
                    employee.setEmployeeData(newEmployee.getEmployeeData());
                    employee.setEmployeeType(newEmployee.getEmployeeType());
                    employee.setCreatedAt(newEmployee.getCreatedAt());
                    employee.setLastUpdated(new Date());
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
}
