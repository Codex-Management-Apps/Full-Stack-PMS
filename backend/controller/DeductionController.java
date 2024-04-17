package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.DeductionNotFoundException;
import com.ancientstudents.backend.model.Deduction;
import com.ancientstudents.backend.repository.DeductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:5175/")
@RestController
public class DeductionController {
    @Autowired
    private DeductionRepository deductionRepository;

    @PostMapping("/deduction")
    Deduction newDeduction(@RequestBody Deduction newDeduction){
        if(newDeduction == null) return null;
        return deductionRepository.save(newDeduction);
    }

    @GetMapping("/deduction")
    List<Deduction> getAllDeductions(){
        return deductionRepository.findAll();
    }

    @GetMapping("/deduction/{id}")
    Deduction getDeductionById(@PathVariable Long id){
        if(id == null) return null;
        return deductionRepository.findById(id)
                .orElseThrow(()->new DeductionNotFoundException(id));
    }

    @PutMapping("deduction/{id}")
    Deduction updateDeduction(@RequestBody Deduction newDeduction, @PathVariable Long id){
        if(id == null) return null;
        return deductionRepository.findById(id)
                .map(deduction -> {
                    deduction.setContribution_type(newDeduction.getContribution_type());
                    deduction.setAmount(newDeduction.getAmount());
                    return deductionRepository.save(deduction);
                }).orElseThrow(()->new DeductionNotFoundException(id));
    }
    

    @DeleteMapping("deduction/{id}")
    String deleteDeduction(@PathVariable Long id){
        if(id == null) return null;
        if(!deductionRepository.existsById(id)){
            throw new DeductionNotFoundException(id);
        }
        deductionRepository.deleteById(id);
        return "Deduction with id " + id + " has been deleted successfully.";
    }

    @RequestMapping(value = "deduction/top", method=RequestMethod.GET)
    public Page<Deduction> requestMethodName(@RequestParam(value ="count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
        Page<Deduction> topDeduction = deductionRepository.findAll(pageRequest);

        return topDeduction;
    }
    
}
