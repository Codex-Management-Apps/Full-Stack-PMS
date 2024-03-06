package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.DepartmentNotFoundException;
import com.ancientstudents.backend.model.Department;
import com.ancientstudents.backend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@CrossOrigin("http://localhost:5175/")
@RestController
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping("/department")
    Department newDepartment(@RequestBody Department newDepartment){
        return departmentRepository.save(newDepartment);
    }

    @GetMapping("/department")
    List<Department> getAllDepartments(){
        return departmentRepository.findAll();
    }

    @GetMapping("/department/{id}")
    Department getDepartmentById(@PathVariable Long id){
        return departmentRepository.findById(id)
                .orElseThrow(()->new DepartmentNotFoundException(id));
    }

    @PutMapping("department/{id}")
    Department updateDepartment(@RequestBody Department newDepartment, @PathVariable Long id){
        return departmentRepository.findById(id)
                .map(department -> {
                    department.setDepartmentName(newDepartment.getDepartmentName());
                    department.setStatus(newDepartment.getStatus());
                    return departmentRepository.save(department);
                }).orElseThrow(()->new DepartmentNotFoundException(id));
    }
    

    @DeleteMapping("department/{id}")
    String deleteDepartment(@PathVariable Long id){
        if(!departmentRepository.existsById(id)){
            throw new DepartmentNotFoundException(id);
        }
        departmentRepository.deleteById(id);
        return "Department with id " + id + " has been deleted successfully.";
    }

    @RequestMapping(value = "department/top", method=RequestMethod.GET)
    public Page<Department> requestMethodName(@RequestParam(value ="count") String count) {
        PageRequest pageRequest = PageRequest.of(0,Integer.valueOf(count));
        Page<Department> topDepartment = departmentRepository.findAll(pageRequest);

        return topDepartment;
    }
    
}
