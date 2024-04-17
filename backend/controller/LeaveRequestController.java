package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.LeaveRequestNotFoundException;
import com.ancientstudents.backend.model.LeaveRequest;
import com.ancientstudents.backend.repository.LeaveRequestRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
public class LeaveRequestController {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @PostMapping("/leaveRequest")
    LeaveRequest newLeaveRequest(@RequestBody LeaveRequest newLeaveRequest){
        if(newLeaveRequest == null) return null;
        return leaveRequestRepository.save(newLeaveRequest);
    }

    @GetMapping("/leaveRequest")
    List<LeaveRequest> getAllLeaveRequests(){
        return leaveRequestRepository.findAll();
    }

    @GetMapping("/leaveRequest/{id}")
    LeaveRequest getLeaveRequestById(@PathVariable Long id){
        if(id == null) return null;
        return leaveRequestRepository.findById(id)
                .orElseThrow(()->new LeaveRequestNotFoundException(id));
    }

    @PutMapping("leaveRequest/{id}")
    LeaveRequest updateLeaveRequest(@RequestBody LeaveRequest newLeaveRequest, @PathVariable Long id){
        if(id == null) return null;
        return leaveRequestRepository.findById(id)
                .map(leaveRequest -> {
                    leaveRequest.setEmployee(newLeaveRequest.getEmployee());
                    leaveRequest.setReason(newLeaveRequest.getReason());
                    leaveRequest.setDateOfLeave(newLeaveRequest.getDateOfLeave());
                    leaveRequest.setDateOfEnd(newLeaveRequest.getDateOfEnd());
                    leaveRequest.setStatus(newLeaveRequest.getStatus());
                    leaveRequest.setComment(newLeaveRequest.getComment());
                    leaveRequest.setCreated_at(newLeaveRequest.getCreated_at());
                    return leaveRequestRepository.save(leaveRequest);
                }).orElseThrow(()->new LeaveRequestNotFoundException(id));
    }


    @DeleteMapping("leaveRequest/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
        if(!leaveRequestRepository.existsById(id)){
            throw new LeaveRequestNotFoundException(id);
        }
        leaveRequestRepository.deleteById(id);
        return "LeaveRequest with id " + id + " has been deleted successfully.";
    }

//    @RequestMapping(value = "leaveRequest/top", method=RequestMethod.GET)
//    public Page<LeaveRequest> requestMethodName(@RequestParam(value ="count") String count) {
//        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
//        Page<LeaveRequest> topLeaveRequest = leaveRequestRepository.findAll(pageRequest);
//
//        return topLeaveRequest;
//    }
}
