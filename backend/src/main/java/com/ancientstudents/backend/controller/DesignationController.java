package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.DesignationNotFoundException;
import com.ancientstudents.backend.model.Designation;
import com.ancientstudents.backend.repository.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
public class DesignationController {
    @Autowired
    private DesignationRepository designationRepository;

    @PostMapping("/designation")
    Designation newDesignation(@RequestBody Designation newDesignation){
        if (newDesignation == null) return null;
        newDesignation.setCreatedAt(new Date());
        newDesignation.setLastUpdated(new Date());
        return designationRepository.save(newDesignation);
    }

    @GetMapping("/designation")
    List<Designation> getAllDesignations(){
        List<Designation> x = designationRepository.findAll();
        System.out.println(x);
        return x;
    }

    @GetMapping("/designation/{id}")
    Designation getDesignationById(@PathVariable Long id){
        if(id == null) return null;
        return designationRepository.findById(id)
                .orElseThrow(()->new DesignationNotFoundException(id));
    }

    @PutMapping("designation/{id}")
    Designation updateDesignation(@RequestBody Designation newDesignation, @PathVariable Long id){
        if(id == null) return null;
        return designationRepository.findById(id)
                .map(designation -> {
                    designation.setDesignationName(newDesignation.getDesignationName());
                    designation.setCreatedAt(newDesignation.getCreatedAt());
                    designation.setLastUpdated(new Date());
                    return designationRepository.save(designation);
                }).orElseThrow(()->new DesignationNotFoundException(id));
    }

    @DeleteMapping("designation/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
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

    // Misc Function
    
}
