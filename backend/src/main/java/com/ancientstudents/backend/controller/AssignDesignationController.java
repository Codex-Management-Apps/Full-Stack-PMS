package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.AssignDesignationNotFoundException;
import com.ancientstudents.backend.model.AssignDesignation;
import com.ancientstudents.backend.model.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.repository.AssignDesignationRepository;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
public class AssignDesignationController {
    
    @Autowired
    private AssignDesignationRepository assignDesignationRepository;
    
    @PostMapping("/assigned")
    public AssignDesignation newAssignDesignation(@RequestBody AssignDesignation newData) {
        if(newData == null) return null;
        
        return assignDesignationRepository.save(newData);
    }
    
    @PutMapping("assigned/{id}")
    public AssignDesignation updateAssignDesignation(@PathVariable Long id, @RequestBody AssignDesignation newData) {
        if(newData == null || id == null) return null;
        
        return assignDesignationRepository.findById(id)
                .map( assign ->{
                    assign.setDesignationId(newData.getDesignationId());
                    assign.setEmpNum(newData.getEmpNum());
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
            Employee data = y.getEmpNum();
            if( data.getId() == empId)
                found = y;
                break;
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
                Employee data = y.getEmpNum();
                if( data.getId() == empId)
                    isfound = true;
                    break;
            }
        }

        return isfound;
    }
    
}
