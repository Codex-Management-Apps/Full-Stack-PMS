package com.ancientstudents.backend.controller;

import java.util.ArrayList;
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

import com.ancientstudents.backend.exception.AssignPayheadNotFoundException;
import com.ancientstudents.backend.exception.DataEmployeeNotFoundException;
import com.ancientstudents.backend.model.AssignPayhead;
import com.ancientstudents.backend.model.Payhead;
import com.ancientstudents.backend.model.Payroll;
import com.ancientstudents.backend.repository.AssignPayheadRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin("http://localhost:5175/")
@RestController
public class AssignPayheadController {
    
    @Autowired
    private AssignPayheadRepository assignPayheadRepository;

    @GetMapping("/assign/payhead")
    private List<AssignPayhead> getAllPayHead(){
        return assignPayheadRepository.findAll();
    }

    @GetMapping("/assign/payhead/{id}")
    private AssignPayhead getPayheadById(@PathVariable Long id){
        if(id == null) return null;
        return assignPayheadRepository.findById(id)
            .orElseThrow(() -> new AssignPayheadNotFoundException(id));
    }

    @PostMapping("/assign/payhead")
    private AssignPayhead newPayhead(@RequestBody AssignPayhead newAssignPayhead){
        if (newAssignPayhead == null) return null;
        
        newAssignPayhead.setCreatedAt(new Date());
        newAssignPayhead.setLastUpdated(new Date());
        return assignPayheadRepository.save(newAssignPayhead);
    }

    @PutMapping("/assign/payhead/{id}")
    private AssignPayhead updateAssignPayhead(@RequestBody AssignPayhead newAssignPayhead, @PathVariable Long id){
        if(id == null) return null;
        return assignPayheadRepository.findById(id)
                .map(assignPayhead -> {
                    assignPayhead.setPayroll(newAssignPayhead.getPayroll());
                    assignPayhead.setPayhead(newAssignPayhead.getPayhead());
                    assignPayhead.setCreatedAt(newAssignPayhead.getCreatedAt());
                    assignPayhead.setLastUpdated(new Date());
                    return assignPayheadRepository.save(assignPayhead);
                }).orElseThrow(() -> new AssignPayheadNotFoundException(id));
    }

    @DeleteMapping("/assign/payhead/{id}")
    private String deleteAssignPayhead(@PathVariable Long id){
        if(id == null) return null;

        if(!assignPayheadRepository.existsById(id)){
            throw new DataEmployeeNotFoundException(id);
        }

        assignPayheadRepository.deleteById(id);
        return "Assign Payhead with id" + id + " has been deleted successfully";
    }


    @RequestMapping(value="/assign/payhead/data", method=RequestMethod.GET)
    private List<AssignPayhead> GetAllTypeUnderPayrollID(@RequestParam(value="payID") Long ID, @RequestParam(value ="type")String type) {

        if(ID == null) return null;
        List<AssignPayhead> allData = assignPayheadRepository.findAll();
        List<AssignPayhead> filteredData = new ArrayList<AssignPayhead>();

        if(!allData.isEmpty()){
            for(AssignPayhead data : allData){
                Payroll x = data.getPayroll();
                Payhead y = data.getPayhead();
                System.out.println(x.getId() + " == " + ID + " and " + y.getType().toLowerCase() + " == " + type.toLowerCase());
                if(x.getId() == ID && y.getType().toLowerCase().equals(type.toLowerCase())){
                    System.out.println(data);
                    filteredData.add(data);
                }
            }
            return filteredData;
        }
        return null;
    }
    
}