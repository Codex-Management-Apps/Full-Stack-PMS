package com.ancientstudents.backend.tables.payhead;

import com.ancientstudents.backend.exception.AddEarningsNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PayheadController {
     
    @Autowired
    private PayheadRepository payheadRepository;
     
    @PostMapping("/payhead")
    Payhead newPayhead (@RequestBody Payhead newAddEarnings){
        if(newAddEarnings == null) return null;
        newAddEarnings.setCreatedAt(new Date());
        newAddEarnings.setLastUpdated(new Date());
        return payheadRepository.save(newAddEarnings);
    }
    
    @GetMapping("/payhead")
    List<Payhead> getAllPayheads(){
        return payheadRepository.findAll();
    }

    @GetMapping("/payhead/{id}")
    Payhead getPayheadById(@PathVariable Long id){
        if(id == null) return null;
        return payheadRepository.findById(id)
                .orElseThrow(()->new AddEarningsNotFoundException(id));
    }
     
    @PutMapping("payhead/{id}")
    Payhead updatePayhead(@RequestBody Payhead newPayhead, @PathVariable Long id){
        if(id == null) return null;
        return payheadRepository.findById(id)
                .map(payhead -> {
                    payhead.setName(newPayhead.getName());
                    payhead.setCreatedAt(newPayhead.getCreatedAt());
                    payhead.setLastUpdated(new Date());
                    return payheadRepository.save(newPayhead);
                }).orElseThrow(()->new AddEarningsNotFoundException(id));
    }
     
    @DeleteMapping("payhead/{id}")
    String deletePayhead(@PathVariable Long id){
        if(id == null) return null;
        if(!payheadRepository.existsById(id)){
            throw new AddEarningsNotFoundException(id);
        }
        payheadRepository.deleteById(id);
        return "payhead with id " + id + " has been deleted successfully.";
    }

    // @RequestMapping(value = "payhead/top", method=RequestMethod.GET)
    // public Page<Payhead> requestMethodName(@RequestParam(value ="count") String count) {
    //     PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
    //     Page<Payhead> topAddEarnings = payheadRepository.findAll(pageRequest);

    //     return topAddEarnings;
    // }

}
