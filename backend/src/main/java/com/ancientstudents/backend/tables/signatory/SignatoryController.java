package com.ancientstudents.backend.tables.signatory;

import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.exception.SignatoryNotFoundException;
import com.ancientstudents.backend.tables.employee.Employee;
import com.ancientstudents.backend.tables.employee.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SignatoryController {
    @Autowired
    private SignatoryRepository signatoryRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    // Crud Functionality
    @PostMapping("/signatory")
    Signatory newSignatory(@RequestBody Signatory newSignatory){
        if(newSignatory == null) return null;

        Signatory sig = new Signatory();
        sig.setName(newSignatory.getName());
        sig.setEmployee(getEmployeeById(newSignatory.getEmployee().getId()));
        sig.setStatus(newSignatory.getStatus());
        sig.setCreatedAt(new Date());
        sig.setLastUpdated(new Date());
        return signatoryRepository.save(sig);
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
                    signatory.setEmployee(getEmployeeById(newSignatory.getEmployee().getId()));
                    
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

    private Employee getEmployeeById(@PathVariable Long id){
        if(id == null) return null;
        return employeeRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }
}
