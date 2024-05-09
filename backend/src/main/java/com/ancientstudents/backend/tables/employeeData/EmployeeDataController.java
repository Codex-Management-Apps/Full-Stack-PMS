package com.ancientstudents.backend.tables.employeeData;

import java.util.List;


import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.DataEmployeeNotFoundException;
import com.ancientstudents.backend.tables.employee.Employee;
import com.ancientstudents.backend.tables.employee.EmployeeRepository;

@RestController
@RequestMapping("/api")
public class EmployeeDataController {

    @Autowired
    private EmployeeDataRepository dataEmployeeRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
   
    // CRUD for Employee
    @PostMapping("/employee/info")
    EmployeeData newEmployee(@RequestBody EmployeeData newEmployee){
        if(newEmployee == null) return null;
        newEmployee.setCreatedAt(new Date());
        newEmployee.setLastUpdated(new Date());
        return dataEmployeeRepository.save(newEmployee);
    }

    @GetMapping("/employee/info")
    List<EmployeeData> getAllEmployees(){
        return dataEmployeeRepository.findAll();
    }

    @GetMapping("/employee/info/{id}")
    EmployeeData getEmployeeById(@PathVariable Long id){
        if(id == null) return null;
        return dataEmployeeRepository.findById(id)
                .orElseThrow(()->new DataEmployeeNotFoundException(id));
    }

    @PutMapping("employee/info/{id}")
    public EmployeeData updateEmployeeData(@RequestBody EmployeeData newEmployee, @PathVariable Long id){
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

    @DeleteMapping("employee/info/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
        if(!dataEmployeeRepository.existsById(id)){
            throw new DataEmployeeNotFoundException(id);
        }
        dataEmployeeRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";
    }

     // Get All EmployeeData that is not yet assigned
     @RequestMapping(value = "employee/info/find", method=RequestMethod.GET)
     private List<EmployeeData> getAssignedEmployeeData(@RequestParam(value ="isAssigned") boolean condition) {
         
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeData> allDataEmployees = dataEmployeeRepository.findAll();
        List<EmployeeData> filteredDataEmployees = new ArrayList<>();

        
        for (EmployeeData dataEmployee : allDataEmployees) {
            boolean found = false;
            for (Employee employee : employees) {
                if (employee.getEmployeeData() != null && employee.getEmployeeData().getId() == dataEmployee.getId()) {
                    found = true;
                    break;
                }
            }
            
            if (condition && found) {
                filteredDataEmployees.add(dataEmployee);
            } else if (!condition && !found) {
                filteredDataEmployees.add(dataEmployee);
            }
        }
    
        return filteredDataEmployees;
     }
    

}
