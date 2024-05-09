package com.ancientstudents.backend.tables.payroll;

import com.ancientstudents.backend.exception.PayrollNotFoundException;
import com.ancientstudents.backend.tables.employee.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api")
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

                    payroll.setStart(newPayroll.getStart());
                    payroll.setEnd(newPayroll.getEnd());
                    
                    payroll.setStatus(newPayroll.getStatus());
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


    @RequestMapping(value = "/payroll/employee",method= RequestMethod.GET)
    private List<Payroll> getPayrollByEmployeeID(@RequestParam(value="id") Long empID){
        if(empID == null) return null;

        List<Payroll> data = payrollRepository.findAll();
        List<Payroll> found = new ArrayList<Payroll>();

        for(Payroll x : data){
            Employee emp = x.getEmployee();
            if(emp.getId() == empID){
                found.add(x);
            }
        }

        return found;
    }

}
