package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.PayslipNotFoundException;
import com.ancientstudents.backend.model.Payslip;
import com.ancientstudents.backend.repository.PayslipRepository;
import com.ancientstudents.backend.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:5175/")
@RestController
public class PayslipController {
    @Autowired
    private PayslipRepository payslipRepository;

    @PostMapping("/payslip")
    Payslip newPayslip(@RequestBody Payslip newPayslip){
        if(newPayslip == null) return null;
        return payslipRepository.save(newPayslip);
    }

    @GetMapping("/payslip")
    List<Payslip> getAllPayslips(){
        return payslipRepository.findAll();
    }

    @GetMapping("/payslip/{id}")
    Payslip getPayslipById(@PathVariable Long id){
        if(id == null) return null;
        return payslipRepository.findById(id)
                .orElseThrow(()->new PayslipNotFoundException(id));
    }

    @PutMapping("payslip/{id}")
    Payslip updatePayslip(@RequestBody Payslip newPayslip, @PathVariable Long id){
        if(id == null) return null;
        return payslipRepository.findById(id)
                .map(payslip -> {
                    payslip.setDeductions(newPayslip.getDeductions());
                    payslip.setAddEarnings(newPayslip.getAddEarnings());
                    payslip.setPayroll(newPayslip.getPayroll());
                    payslip.setEmployee(newPayslip.getEmployee());
                    payslip.setStatus(newPayslip.getStatus());
                    payslip.setCreated_by(newPayslip.getCreated_by());
                    payslip.setUpdated_by(newPayslip.getUpdated_by());
                    return payslipRepository.save(payslip);
                }).orElseThrow(()->new PayslipNotFoundException(id));
    }
    

    @DeleteMapping("payslip/{id}")
    String deletePayslip(@PathVariable Long id){
        if(id == null) return null;
        if(!payslipRepository.existsById(id)){
            throw new PayslipNotFoundException(id);
        }
        payslipRepository.deleteById(id);
        return "Payslip with id " + id + " has been deleted successfully.";
    }

    @RequestMapping(value = "payslip/top", method=RequestMethod.GET)
    public Page<Payslip> requestMethodName(@RequestParam(value ="count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
        Page<Payslip> topPayslip = payslipRepository.findAll(pageRequest);

        return topPayslip;
    }




    //Get Employee by Payslip ID
    @RequestMapping(value ="payslip/employee", method = RequestMethod.GET)
    public Payslip getEmployeebyPayslipId(@RequestParam(value = "id") Long empId) {
        if(empId == null) return null;

        List<Payslip> x =  payslipRepository.findAll();
        Payslip found = new Payslip();

        for(Payslip y : x){
            Employee data = y.getEmployee();
            if( data.getId() == empId){
                found = y;
                System.out.println(found);
                break;
            }
                
        }
        return found;
    }
    
}
