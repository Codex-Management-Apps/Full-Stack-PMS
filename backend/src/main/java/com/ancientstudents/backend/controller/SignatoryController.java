package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.exception.SignatoryNotFoundException;
import com.ancientstudents.backend.model.AssignPosition;
import com.ancientstudents.backend.model.Signatory;
import com.ancientstudents.backend.repository.AssignPositionRepository;
import com.ancientstudents.backend.repository.SignatoryRepository;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5175/")
@RestController
public class SignatoryController {
    
    @Autowired
    private SignatoryRepository signatoryRepository;
    @Autowired
    private AssignPositionRepository assignPositionRepository;
    //---------------------------------CRUD Fucntions ------------------------------------

    // Find All Signatory
    @GetMapping("/signatory")
    List<Signatory> getAllSignatory() {
        return signatoryRepository.findAll();
    }
    

    // creating a new signatory
    @PostMapping("/signatory")
    Signatory createSignatory(@RequestBody Signatory signatory) {
        
        // Conditions to create a signatories:
        // 1. Manager or higher exists
        
        // New Superior
        AssignPosition superior = signatory.getSuperior();

        // Instance for Signatory
        Signatory newSignatory = new Signatory();
        newSignatory.setSuperior(superior);
        newSignatory.setStatus(signatory.getStatus());

        return signatoryRepository.save(newSignatory);
    }
    
    // Change or Assign a Superior
    @PutMapping("/signatory/AssignSuperior")
    @RequestMapping(value = "/signatory/AssignSuperior", method = RequestMethod.GET)
    ResponseEntity<String> ChangeSuperior(@RequestParam(value = "id") Long id, @RequestBody AssignPosition superior) {
        
        // Checker if its the id null
        if(id == null) throw new SignatoryNotFoundException(id);
        
        // get the data 
        Signatory signatory = signatoryRepository.findById(id).get();
        
        // change the superior
        signatory.setSuperior(superior);

        // Save the edited Data
        signatoryRepository.save(signatory);

        return ResponseEntity.ok("Superior Has been change");
    }

    // Add a Employee
    @RequestMapping(value = "/signatory/addEmployee", method = RequestMethod.GET)
    ResponseEntity<String> AddEmployeeInTheList(@RequestParam(value = "id") Long id, @RequestBody AssignPosition  employee) {
        
        // Checker if its the id null
        if(id == null) throw new SignatoryNotFoundException(id);
        // get the data 
        Signatory signatory = signatoryRepository.findById(id).get();

        // get the data
        AssignPosition emp = new AssignPosition(employee.getId(),employee.getEmployee(),employee.getPosition(),employee.getCreated_at());

        // added a superior
        emp.setSuperior(signatory);
        
        assignPositionRepository.save(emp);
        
        return ResponseEntity.ok("Employee has been assigned");
    }

    // Delete Signitory
    @DeleteMapping("signatory/{id}")
    ResponseEntity<String> DeleteSignatory(@PathVariable Long id){

        if(id == null) throw new SignatoryNotFoundException(id);

        signatoryRepository.deleteById(id);

        return ResponseEntity.ok("Signatory "+ id + " has been deleted");
    }
    // ---------------------------- Misc Function --------------------

    AssignPosition GetAssignPositionById(Long id){
         if(id == null) return null;
        return assignPositionRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }
}
