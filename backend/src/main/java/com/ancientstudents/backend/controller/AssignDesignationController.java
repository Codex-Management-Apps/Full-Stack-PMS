package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.AssignDesignationNotFoundException;
import com.ancientstudents.backend.exception.DesignationNotFoundException;
import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.model.AssignDesignation;
import com.ancientstudents.backend.model.Designation;
import com.ancientstudents.backend.model.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.jaxb.PageAdapter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.repository.AssignDesignationRepository;
import com.ancientstudents.backend.repository.DesignationRepository;
import com.ancientstudents.backend.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
public class AssignDesignationController {
    
    @Autowired
    private AssignDesignationRepository assignDesignationRepository;
    @Autowired
    private DesignationRepository designationRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @PostMapping("/assigned")
    public AssignDesignation newAssignDesignation(@RequestBody AssignDesignation newData) {

        Long desigId =  newData.getDesignation().getId();
        Long empId = newData.getEmployee().getId();
        
        AssignDesignation assignDesignation = new AssignDesignation();
        assignDesignation.setEmployeeType(newData.getEmployeeType());
        assignDesignation.setStatus(newData.getStatus());
        assignDesignation.setDesignation(getDesignationById(desigId));
        assignDesignation.setEmployee(getEmployeeById(empId));
        System.out.println(assignDesignation);
        return assignDesignationRepository.save(assignDesignation);

    }
    @RequestMapping(value = "/assigned/top", method=RequestMethod.GET)
    public Page<AssignDesignation> requestMethodName(@RequestParam(value = "count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.parseInt(count));
        Page<AssignDesignation> topEmployee = assignDesignationRepository.findAll(pageRequest);
        return topEmployee;
    }
    
    
    @PutMapping("assigned/{id}")
    public AssignDesignation updateAssignDesignation(@PathVariable Long id, @RequestBody AssignDesignation newData) {
        if(newData == null || id == null) return null;
        
        return assignDesignationRepository.findById(id)
                .map( assign ->{
                    assign.setDesignation(getDesignationById(newData.getDesignation().getId()));
                    assign.setEmployee(getEmployeeById(newData.getEmployee().getId()));
                    assign.setEmployeeType(newData.getEmployeeType());
                    assign.setStatus(newData.getStatus());
                    return assignDesignationRepository.save(assign);
                }).orElseThrow(() -> new AssignDesignationNotFoundException(id));
    }

    
    // Note: Both Assigned Method can Might be merge as one, as for now this is the current solution

    @RequestMapping(value ="/assigned/employee", method = RequestMethod.GET)
    public AssignDesignation getAssignDesignationByEmployeeId(@RequestParam(value = "id") Long empId) {
        if(empId == null) return null;

        List<AssignDesignation> x =  assignDesignationRepository.findAll();
        AssignDesignation found = new AssignDesignation();

        for(AssignDesignation y : x){
            Employee data = y.getEmployee();
            if( data.getId() == empId){
                found = y;
                System.out.println(found);
                break;
            }
                
        }
        return found;
    }
    
    // Request that recieved emp id as parameter and sends if user exists or not
    // This method is costly, it gets expensive when we now have multiple data
    @RequestMapping(value ="/assigned", method = RequestMethod.GET)
    public Boolean isEmployeeAssigned(@RequestParam(value = "id") Long empId){ 

        if(empId == null) return null;
        
        boolean isfound = false;
        List<AssignDesignation> x =  assignDesignationRepository.findAll();
        
        // This only find one instance of assignedDesignation data from employee
        if(!x.isEmpty()){
            for(AssignDesignation y : x){
                Employee data = y.getEmployee();
                if( data.getId() == empId){
                    isfound = true;
                    break;
                }
                    
            }
        }

        return isfound;
    }


    private Employee getEmployeeById(@PathVariable Long id){
        return employeeRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }
    private Designation getDesignationById(@PathVariable Long id){
        return designationRepository.findById(id)
                .orElseThrow(()->new DesignationNotFoundException(id));
    }
}
