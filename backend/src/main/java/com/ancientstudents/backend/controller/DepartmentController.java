package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.DepartmentNotFoundException;
import com.ancientstudents.backend.model.Department;
import com.ancientstudents.backend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping("/department")
    Department newDepartment(@RequestBody Department newDepartment){
        return departmentRepository.save(newDepartment);
    }

    @GetMapping("/departments")
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
                    department.setDepartment_name(newDepartment.getDepartment_name());
                    department.setStatus(newDepartment.getStatus());
                    return departmentRepository.save(department);
                }).orElseThrow(()->new DepartmentNotFoundException(id));
    }

    @DeleteMapping("department/{id}")
    String deleteUser(@PathVariable Long id){
        if(!departmentRepository.existsById(id)){
            throw new DepartmentNotFoundException(id);
        }
        departmentRepository.deleteById(id);
        return "Department with id " + id + " has been deleted successfully.";
    }
}
