package com.ancientstudents.backend.controller;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.DataEmployeeNotFoundException;
import com.ancientstudents.backend.model.DataEmployee;
import com.ancientstudents.backend.repository.DataEmployeeRepository;

@CrossOrigin("http://localhost:5175/")
@RestController
public class DataEmployeeController {

    @Autowired
    private DataEmployeeRepository dataEmployeeRepository;
    // CRUD for Employee
    @PostMapping("/employee/info")
    DataEmployee newEmployee(@RequestBody DataEmployee newEmployee){
        if(newEmployee == null) return null;
        newEmployee.setCreatedAt(new Date());
        newEmployee.setLastUpdated(new Date());
        return dataEmployeeRepository.save(newEmployee);
    }

    @GetMapping("/employee/info")
    List<DataEmployee> getAllEmployees(){
        return dataEmployeeRepository.findAll();
    }

    @GetMapping("/employee/info/{id}")
    DataEmployee getEmployeeById(@PathVariable Long id){
        if(id == null) return null;
        return dataEmployeeRepository.findById(id)
                .orElseThrow(()->new DataEmployeeNotFoundException(id));
    }

    @PutMapping("employee/info/{id}")
    DataEmployee updateEmployee(@RequestBody DataEmployee newEmployee, @PathVariable Long id){
        if(id == null) return null;
        return dataEmployeeRepository.findById(id)
                .map(employee -> {
                    employee.setFirstname(newEmployee.getFirstname());
                    employee.setMiddlename(newEmployee.getMiddlename());
                    employee.setLastname(newEmployee.getLastname());
                    employee.setAddressLine(newEmployee.getAddressLine());
                    employee.setBarangay(newEmployee.getBarangay()); 
                    employee.setProvince(newEmployee.getBarangay());
                    employee.setCountry(newEmployee.getCountry());
                    employee.setCreatedAt(newEmployee.getCreatedAt());
                    employee.setLastUpdated(new Date());
                    return dataEmployeeRepository.save(employee);
                }).orElseThrow(()->new DataEmployeeNotFoundException(id));
    }

    @DeleteMapping("employee/info/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
        if(!dataEmployeeRepository.existsById(id)){
            throw new DataEmployeeNotFoundException(id);
        }
        dataEmployeeRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";
    }
}
