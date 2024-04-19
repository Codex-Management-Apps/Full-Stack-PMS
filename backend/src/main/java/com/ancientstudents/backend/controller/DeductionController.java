package com.ancientstudents.backend.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.DeductionNotFoundException;
import com.ancientstudents.backend.model.Deduction;
import com.ancientstudents.backend.repository.DeductionRepository;

@CrossOrigin("http://localhost:5175/")
@RestController
public class DeductionController {
    
    @Autowired
    private DeductionRepository deductionRepository;

    
    @PostMapping("/deduction")
    Deduction newAddEarnings(@RequestBody Deduction newAddEarnings){
        if(newAddEarnings == null) return null;
        newAddEarnings.setCreatedAt(new Date());
        newAddEarnings.setLastUpdated(new Date());
        return deductionRepository.save(newAddEarnings);
    }

    @GetMapping("/deduction")
    List<Deduction> getAllAddEarningss(){
        return deductionRepository.findAll();
    }

    @GetMapping("/deduction/{id}")
    Deduction getAddEarningsById(@PathVariable Long id){
        if(id == null) return null;
        return deductionRepository.findById(id)
                .orElseThrow(()->new DeductionNotFoundException(id));
    }

    @PutMapping("deduction/{id}")
    Deduction updateAddEarnings(@RequestBody Deduction newDeduction, @PathVariable Long id){
        if(id == null) return null;
        return deductionRepository.findById(id)
                .map(deduction -> {
                    deduction.setTypeOfDeduction(deduction.getTypeOfDeduction());
                    deduction.setAmount(deduction.getAmount());
                    deduction.setCreatedAt(deduction.getCreatedAt());
                    deduction.setLastUpdated(new Date());
                    return deductionRepository.save(deduction);
                }).orElseThrow(()->new DeductionNotFoundException(id));
    }
    

    @DeleteMapping("deduction/{id}")
    String deleteAddEarnings(@PathVariable Long id){
        if(id == null) return null;
        if(!deductionRepository.existsById(id)){
            throw new DeductionNotFoundException(id);
        }
        deductionRepository.deleteById(id);
        return "AddEarnings with id " + id + " has been deleted successfully.";
    }
}
