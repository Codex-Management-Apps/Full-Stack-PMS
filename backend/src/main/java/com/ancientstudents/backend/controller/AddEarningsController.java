package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.AddEarningsNotFoundException;
import com.ancientstudents.backend.model.AddEarnings;
import com.ancientstudents.backend.repository.AddEarningsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@CrossOrigin("http://localhost:5175/")
@RestController
public class AddEarningsController {
    @Autowired
    private AddEarningsRepository addEarningsRepository;

    @PostMapping("/addEarnings")
    AddEarnings newAddEarnings(@RequestBody AddEarnings newAddEarnings){
        if(newAddEarnings == null) return null;
        newAddEarnings.setCreatedAt(new Date());
        newAddEarnings.setLastUpdated(new Date());
        return addEarningsRepository.save(newAddEarnings);
    }

    @GetMapping("/addEarnings")
    List<AddEarnings> getAllAddEarningss(){
        return addEarningsRepository.findAll();
    }

    @GetMapping("/addEarnings/{id}")
    AddEarnings getAddEarningsById(@PathVariable Long id){
        if(id == null) return null;
        return addEarningsRepository.findById(id)
                .orElseThrow(()->new AddEarningsNotFoundException(id));
    }

    @PutMapping("addEarnings/{id}")
    AddEarnings updateAddEarnings(@RequestBody AddEarnings newAddEarnings, @PathVariable Long id){
        if(id == null) return null;
        return addEarningsRepository.findById(id)
                .map(addEarnings -> {
                    addEarnings.setTypeOfEarnings(newAddEarnings.getTypeOfEarnings());
                    addEarnings.setAmount(newAddEarnings.getAmount());
                    addEarnings.setCreatedAt(newAddEarnings.getCreatedAt());
                    addEarnings.setLastUpdated(new Date());
                    return addEarningsRepository.save(addEarnings);
                }).orElseThrow(()->new AddEarningsNotFoundException(id));
    }
    

    @DeleteMapping("addEarnings/{id}")
    String deleteAddEarnings(@PathVariable Long id){
        if(id == null) return null;
        if(!addEarningsRepository.existsById(id)){
            throw new AddEarningsNotFoundException(id);
        }
        addEarningsRepository.deleteById(id);
        return "AddEarnings with id " + id + " has been deleted successfully.";
    }

    @RequestMapping(value = "addEarnings/top", method=RequestMethod.GET)
    public Page<AddEarnings> requestMethodName(@RequestParam(value ="count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
        Page<AddEarnings> topAddEarnings = addEarningsRepository.findAll(pageRequest);

        return topAddEarnings;
    }
    
}
