package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.SignatoryNotFoundException;
import com.ancientstudents.backend.model.Signatory;
import com.ancientstudents.backend.repository.SignatoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
public class SignatoryController {
    @Autowired
    private SignatoryRepository signatoryRepository;

    // Crud Functionality
    @PostMapping("/signatory")
    Signatory newSignatory(@RequestBody Signatory newSignatory){
        if(newSignatory == null) return null;
        newSignatory.setCreatedAt(new Date());
        newSignatory.setLastUpdated(new Date());
        return signatoryRepository.save(newSignatory);
    }

    @GetMapping("/signatory")
    List<Signatory> getAllSignatorys(){
        return signatoryRepository.findAll();
    }

    @GetMapping("/signatory/{id}")
    Signatory getSignatoryById(@PathVariable Long id){
        if(id == null) return null;
        return signatoryRepository.findById(id)
                .orElseThrow(()->new SignatoryNotFoundException(id));
    }

    @PutMapping("signatory/{id}")
    Signatory updateSignatory(@RequestBody Signatory newSignatory, @PathVariable Long id){
        if(id == null) return null;
        return signatoryRepository.findById(id)
                .map(signatory -> {
                    signatory.setName(newSignatory.getName());
                    signatory.setEmployee(newSignatory.getEmployee());
                    signatory.setStatus(newSignatory.getStatus());
                    signatory.setCreatedAt(newSignatory.getCreatedAt());
                    signatory.setLastUpdated(new Date());
                    return signatoryRepository.save(signatory);
                }).orElseThrow(() -> new SignatoryNotFoundException(id));
    }


    @DeleteMapping("signatory/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
        if(!signatoryRepository.existsById(id)){
            throw new SignatoryNotFoundException(id);
        }
        signatoryRepository.deleteById(id);
        return "Signatory with id " + id + " has been deleted successfully.";
    }

    // @RequestMapping(value = "signatory/top", method=RequestMethod.GET)
    // public Page<Signatory> requestMethodName(@RequestParam(value ="count") String count) {
    //     PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
    //     Page<Signatory> topSignatory = signatoryRepository.findAll(pageRequest);

    //     return topSignatory;
    // }
}
