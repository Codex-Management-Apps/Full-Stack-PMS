package com.ancientstudents.backend.tables.leaveRequest;

import com.ancientstudents.backend.exception.LeaveRequestNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LeaveRequestController {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @PostMapping("/leave")
    LeaveRequest newLeaveRequest(@RequestBody LeaveRequest newLeaveRequest){
        if(newLeaveRequest == null) return null;
        newLeaveRequest.setCreatedAt(new Date());
        newLeaveRequest.setLastUpdated(new Date());
        return leaveRequestRepository.save(newLeaveRequest);
    }

    @GetMapping("/leave")
    List<LeaveRequest> getAllLeaveRequests(){
        return leaveRequestRepository.findAll();
    }

    @GetMapping("/leave/{id}")
    LeaveRequest getLeaveRequestById(@PathVariable Long id){
        if(id == null) return null;
        return leaveRequestRepository.findById(id)
                .orElseThrow(()->new LeaveRequestNotFoundException(id));
    }

    @PutMapping("leave/{id}")
    LeaveRequest updateLeaveRequest(@RequestBody LeaveRequest newLeaveRequest, @PathVariable Long id){
        if(id == null) return null;
        return leaveRequestRepository.findById(id)
                .map(leaveRequest -> {
                    leaveRequest.setEmployee(newLeaveRequest.getEmployee());
                    leaveRequest.setLeaveType(newLeaveRequest.getLeaveType());
                    leaveRequest.setDateOfLeave(newLeaveRequest.getDateOfLeave());
                    leaveRequest.setDateOfEnd(newLeaveRequest.getDateOfEnd());
                    leaveRequest.setStatus(newLeaveRequest.getStatus());
                    leaveRequest.setComment(newLeaveRequest.getComment());
                    leaveRequest.setCreatedAt(newLeaveRequest.getCreatedAt());
                    leaveRequest.setLastUpdated(new Date());
                    return leaveRequestRepository.save(leaveRequest);
                }).orElseThrow(()->new LeaveRequestNotFoundException(id));
    }


    @DeleteMapping("leave/{id}")
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
