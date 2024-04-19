package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.PayrollNotFoundException;
import com.ancientstudents.backend.model.Payroll;
import com.ancientstudents.backend.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@CrossOrigin("http://localhost:5175/")
@RestController
public class PayrollController {
    @Autowired
    private PayrollRepository payrollRepository;

    @PostMapping("/payroll")
    Payroll newPayroll(@RequestBody Payroll newPayroll){
        if(newPayroll == null) return null;
        newPayroll.setCreatedAt(new Date());
        newPayroll.setLastUpdated(new Date());
        return payrollRepository.save(newPayroll);
    }

    @GetMapping("/payroll")
    List<Payroll> getAllPayrolls(){
        return payrollRepository.findAll();
    }

    @GetMapping("/payroll/{id}")
    Payroll getPayrollById(@PathVariable Long id){
        if(id == null) return null;
        return payrollRepository.findById(id)
                .orElseThrow(()->new PayrollNotFoundException(id));
    }

    @PutMapping("payroll/{id}")
    Payroll updatePayroll(@RequestBody Payroll newPayroll, @PathVariable Long id){
        if(id == null) return null;
        return payrollRepository.findById(id)
                .map(payroll -> {
                    payroll.setSignatory(newPayroll.getSignatory());
                    payroll.setEmployee(newPayroll.getEmployee());

                    //TODO: turn newPayroll to a date datatype
                    payroll.setStart(newPayroll.getStart());
                    payroll.setEnd(newPayroll.getEnd());
                    
                    payroll.setTotal_earnings(newPayroll.getTotal_earnings());
                    payroll.setTotal_deductions(newPayroll.getTotal_deductions());
                    payroll.setNet_pay(newPayroll.getNet_pay());
                    
                    payroll.setCreatedAt(newPayroll.getCreatedAt());
                    payroll.setLastUpdated(new Date());
                    return payrollRepository.save(payroll);
                }).orElseThrow(()->new PayrollNotFoundException(id));
    }
    

    @DeleteMapping("payroll/{id}")
    String deletePayroll(@PathVariable Long id){
        if(id == null) return null;
        if(!payrollRepository.existsById(id)){
            throw new PayrollNotFoundException(id);
        }
        payrollRepository.deleteById(id);
        return "Payroll with id " + id + " has been deleted successfully.";
    }

    // @RequestMapping(value = "payroll/top", method=RequestMethod.GET)
    // public Page<Payroll> requestMethodName(@RequestParam(value ="count") String count) {
    //     PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
    //     Page<Payroll> topPayroll = payrollRepository.findAll(pageRequest);

    //     return topPayroll;
    // }
    
}
