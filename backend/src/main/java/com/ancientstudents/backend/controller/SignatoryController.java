package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.SignatoryNotFoundException;
import com.ancientstudents.backend.model.Signatory;
import com.ancientstudents.backend.repository.SignatoryRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
public class SignatoryController {
    @Autowired
    private SignatoryRepository signatoryRepository;

    @PostMapping("/signatory")
    Signatory newSignatory(@RequestBody Signatory newSignatory){
        if(newSignatory == null) return null;
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
                    signatory.setEmployeeId(newSignatory.getEmployeeId());
                    signatory.setHigherSuperiorId(newSignatory.getHigherSuperiorId());
                    signatory.setStatus(newSignatory.getStatus());
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
