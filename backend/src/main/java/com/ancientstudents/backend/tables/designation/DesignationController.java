package com.ancientstudents.backend.tables.designation;

import com.ancientstudents.backend.exception.DesignationNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
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

}
