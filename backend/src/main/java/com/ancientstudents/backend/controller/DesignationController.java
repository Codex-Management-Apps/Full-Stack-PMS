package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.DesignationNotFoundException;
import com.ancientstudents.backend.model.Department;
import com.ancientstudents.backend.model.Designation;
import com.ancientstudents.backend.repository.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
public class DesignationController {
    @Autowired
    private DesignationRepository designationRepository;

    @PostMapping("/designation")
    Designation newDesignation(@RequestBody Designation newDesignation){
        return designationRepository.save(newDesignation);
    }

    @GetMapping("/designation")
    List<Designation> getAllDesignations(){
        return designationRepository.findAll();
    }

    @GetMapping("/designation/{id}")
    Designation getDesignationById(@PathVariable Long id){
        return designationRepository.findById(id)
                .orElseThrow(()->new DesignationNotFoundException(id));
    }

    @PutMapping("designation/{id}")
    Designation updateDesignation(@RequestBody Designation newDesignation, @PathVariable Long id){
        return designationRepository.findById(id)
                .map(designation -> {
                    designation.setDesignationName(newDesignation.getDesignationName());
                    designation.setDepartmentId(newDesignation.getDepartmentId());
                    designation.setStatus(newDesignation.getStatus());
                    return designationRepository.save(designation);
                }).orElseThrow(()->new DesignationNotFoundException(id));
    }

    @DeleteMapping("designation/{id}")
    String deleteUser(@PathVariable Long id){
        if(!designationRepository.existsById(id)){
            throw new DesignationNotFoundException(id);
        }
        designationRepository.deleteById(id);
        return "Designation with id " + id + " has been deleted successfully.";
    }
    
    @RequestMapping(value = "designation/top", method=RequestMethod.GET)
    public Page<Designation> requestMethodName(@RequestParam(value ="count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
        Page<Designation> topDesignation = designationRepository.findAll(pageRequest);

        return topDesignation;
    }
}
