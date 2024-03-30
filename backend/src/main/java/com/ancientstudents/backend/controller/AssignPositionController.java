package com.ancientstudents.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.AssignPositionNotFoundException;
import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.exception.PositionNotFoundException;
import com.ancientstudents.backend.model.AssignDesignation;
import com.ancientstudents.backend.model.AssignPosition;
import com.ancientstudents.backend.model.Position;
import com.ancientstudents.backend.repository.AssignDesignationRepository;
import com.ancientstudents.backend.repository.AssignPositionRepository;
import com.ancientstudents.backend.repository.PositionRepository;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin("http://localhost:5175/")
@RestController
public class AssignPositionController {
    
    @Autowired
    private  AssignPositionRepository assignPositionRepository;
    @Autowired
    private PositionRepository positionRepository;
    @Autowired
    private AssignDesignationRepository assignDesignationRepository;
    // ---------------------------------CRUD Functions--------------------------------

    // get
    @GetMapping("/assigned/position")
    List<AssignPosition> getAllAssignedPosition(){
        return assignPositionRepository.findAll();
    }
    

    // set
    @PostMapping("/assigned/position")
    AssignPosition newAssignPosition(@RequestBody AssignPosition newData){

        // Grab Employee ID and Position ID;
        Long positionId = newData.getPosition().getId();
        Long empId = newData.getEmployee().getId();

        AssignPosition assignPosition = new AssignPosition();
        assignPosition.setEmployee(getEmployeeById(empId));
        assignPosition.setPosition(getPositionById(positionId));
        assignPosition.setCreated_at("0:0:0:0");
        
        return assignPositionRepository.save(assignPosition);
    }
    // update
    @PutMapping("assigned/position/{id}")
    AssignPosition putMethodName(@PathVariable Long id, @RequestBody AssignPosition newData) {
        if(newData == null  || id == null) throw new AssignPositionNotFoundException(id);
        
        return assignPositionRepository.findById(id)
                .map( assign -> {
                    assign.setEmployee(getEmployeeById(newData.getId()));
                    assign.setPosition(getPositionById(newData.getPosition().getId()));
                    return assignPositionRepository.save(assign);
                }).orElseThrow(() -> new AssignPositionNotFoundException(id));
    }
    
    // delete

    //--------------------------- Other Functions ----------------------------
 
    //-----------------------------Miscs Functions ---------------------------
    private AssignDesignation getEmployeeById(Long id){
        if(id == null) return null;
        return assignDesignationRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }
    private Position getPositionById(Long id){
        if(id == null) return null;
        return positionRepository.findById(id)
                .orElseThrow(()->new PositionNotFoundException(id));
    }
}
