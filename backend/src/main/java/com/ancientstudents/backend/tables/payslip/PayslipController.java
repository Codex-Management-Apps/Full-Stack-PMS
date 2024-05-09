package com.ancientstudents.backend.tables.payslip;

import com.ancientstudents.backend.exception.PayslipNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api")
public class PayslipController {
    @Autowired
    private PayslipRepository payslipRepository;

    // Crud Function
    @PostMapping("/payslip")
    Payslip newPayslip(@RequestBody Payslip newPayslip){
        if(newPayslip == null) return null;
        newPayslip.setCreatedAt(new Date());
        newPayslip.setLastUpdated(new Date());
        newPayslip.setIssued_date(new Date());
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
                    payslip.setPayroll(newPayslip.getPayroll());
                    payslip.setIssued_date(newPayslip.getIssued_date());
                    payslip.setCreatedAt(newPayslip.getCreatedAt());
                    payslip.setLastUpdated(new Date());
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
}
