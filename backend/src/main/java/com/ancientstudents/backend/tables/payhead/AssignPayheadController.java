package com.ancientstudents.backend.tables.payhead;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.AddEarningsNotFoundException;
import com.ancientstudents.backend.exception.AssignPayheadNotFoundException;
import com.ancientstudents.backend.exception.DataEmployeeNotFoundException;
import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.tables.employee.Employee;
import com.ancientstudents.backend.tables.employee.EmployeeRepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class AssignPayheadController {
    
    @Autowired
    private AssignPayheadRepository assignPayheadRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PayheadRepository payheadRepository;

    @GetMapping("/assign/payhead")
    private List<AssignPayhead> getAllPayHead(){
        return assignPayheadRepository.findAll();
    }

    @GetMapping("/assign/payhead/{id}")
    private AssignPayhead getAssignedPayheadById(@PathVariable Long id){
        if(id == null) return null;
        return assignPayheadRepository.findById(id)
            .orElseThrow(() -> new AssignPayheadNotFoundException(id));
    }

    @PostMapping("/assign/payhead")
    private AssignPayhead newPayhead(@RequestBody AssignPayhead newAssignPayhead){
        if (newAssignPayhead == null) return null;

        AssignPayhead assignPayhead = new AssignPayhead();
        assignPayhead.setPayhead(getPayheadById(newAssignPayhead.getPayhead().getId()));
        assignPayhead.setEmployee(getEmployeeById(newAssignPayhead.getEmployee().getId()));
        assignPayhead.setAmount(newAssignPayhead.getAmount());
        assignPayhead.setDescription(newAssignPayhead.getDescription());
        assignPayhead.setCreatedAt(new Date());
        assignPayhead.setLastUpdated(new Date());
        return assignPayheadRepository.save(assignPayhead);
    }

    @PutMapping("/assign/payhead/{id}")
    private AssignPayhead updateAssignPayhead(@RequestBody AssignPayhead newAssignPayhead, @PathVariable Long id){
        if(id == null) return null;
        return assignPayheadRepository.findById(id)
                .map(assignPayhead -> {
                    assignPayhead.setEmployee(getEmployeeById(newAssignPayhead.getEmployee().getId()));
                    assignPayhead.setPayhead(getPayheadById(newAssignPayhead.getPayhead().getId()));
                    assignPayhead.setAmount(newAssignPayhead.getAmount());
                    assignPayhead.setDescription(newAssignPayhead.getDescription());
                    assignPayhead.setCreatedAt(newAssignPayhead.getCreatedAt());
                    assignPayhead.setLastUpdated(new Date());
                    System.out.println(assignPayhead);
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
    private List<AssignPayhead> GetAllTypeUnderEmployeeID(
        @RequestParam(value="id") Long ID, 
        @RequestParam(value ="type", required = false) String type
    ) {

        if(ID == null) return null;
        List<AssignPayhead> allData = assignPayheadRepository.findAll();
        List<AssignPayhead> filteredData = new ArrayList<AssignPayhead>();

        if(!allData.isEmpty()){
            for(AssignPayhead data : allData){
                Employee x = data.getEmployee();
                Payhead y = data.getPayhead();
                if(x.getId() == ID){
                    if (type == null) {
                        filteredData.add(data);
                    } else if (y.getType().toLowerCase().equals(type.toLowerCase())){
                        filteredData.add(data);
                    }
                }
            }
            return filteredData;
        }
        return null;
    }
    // Utility methods
    private Employee getEmployeeById(Long id){
        if(id == null) return null;
        return employeeRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }

    private Payhead getPayheadById(Long id){
        if(id == null) return null;
        return payheadRepository.findById(id)
                .orElseThrow(()->new AddEarningsNotFoundException(id));
    }
}