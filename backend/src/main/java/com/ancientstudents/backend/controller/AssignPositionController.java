package com.ancientstudents.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.AssignPositionNotFoundException;
import com.ancientstudents.backend.exception.EmployeeNotFoundException;
import com.ancientstudents.backend.exception.PositionNotFoundException;
import com.ancientstudents.backend.model.AssignDesignation;
import com.ancientstudents.backend.model.AssignPosition;
import com.ancientstudents.backend.model.Employee;
import com.ancientstudents.backend.model.Position;
import com.ancientstudents.backend.model.Signatory;
import com.ancientstudents.backend.repository.AssignDesignationRepository;
import com.ancientstudents.backend.repository.AssignPositionRepository;
import com.ancientstudents.backend.repository.PositionRepository;
import com.ancientstudents.backend.repository.SignatoryRepository;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;




@CrossOrigin("http://localhost:5175/")
@RestController
public class AssignPositionController {
    
    @Autowired
    private  AssignPositionRepository assignPositionRepository;
    @Autowired
    private PositionRepository positionRepository;
    @Autowired
    private AssignDesignationRepository assignDesignationRepository;
    @Autowired
    private SignatoryRepository signatoryRepository;

    // ---------------------------------CRUD Functions--------------------------------

    // get
    @GetMapping("/assigned/position")
    private List<AssignPosition> getAllAssignedPosition(){
        return assignPositionRepository.findAll();
    }
    

    // set
    @PostMapping("/assigned/position")
    private AssignPosition newAssignPosition(@RequestBody AssignPosition newData){
        if(newData == null) return null;

        if(newData.getPosition().getPositionName().equals("Supervisor")){
            System.out.println("Creating a Position");    
            AssignPosition superior = assignPositionRepository.save(newData);

            System.out.println("Creating a Signatory for this position");
            Signatory newSignatory = new Signatory();
            newSignatory.setSuperior(superior);
            newSignatory.setStatus("Active");

            System.out.println("Saving Created Signatory");
            signatoryRepository.save(newSignatory);
        } else {
            System.out.println("Adding employee");
            System.out.println("Saving New Position Data ");
            assignPositionRepository.save(newData);
        }

        return newData;
    }
    // update
    @PutMapping("assigned/position/{id}")
    private AssignPosition updatePosition(@PathVariable Long id, @RequestBody AssignPosition newData) {
        if(newData == null  || id == null) throw new AssignPositionNotFoundException(id);
        
        return assignPositionRepository.findById(id)
                .map( assign -> {
                    assign.setEmployee(getEmployeeById(newData.getId()));
                    assign.setPosition(getPositionById(newData.getPosition().getId()));
                    return assignPositionRepository.save(assign);
                }).orElseThrow(() -> new AssignPositionNotFoundException(id));
    }
    
    // delete

    //--------------------------- Other Functions ----------------------------
    
    // Find 1 AssignPosition Data by using Employee Id
    // GET /assigned/position/employee?id = #
    @RequestMapping(value = "/assigned/position/employee", method=RequestMethod.GET)
    private AssignPosition getPositionbyEmployeeId(@RequestParam(value = "id" )Long id) {
        if(id == null) return null;
    
        List<AssignPosition> x = assignPositionRepository.findAll();
        AssignPosition found = new AssignPosition();

        if(!x.isEmpty()){
            for(AssignPosition y: x){
                Employee data = y.getEmployee().getEmployee();
                if(data.getId() == id){
                    found = y;
                    break;
                }
            }
        }

        return found;
    }
    
    // Check if Employee Exists in the table
    // GET /assigned/position/employee/find?id= #
    @RequestMapping(value = "/assigned/position/employee/find", method=RequestMethod.GET)
    private Boolean isEmployeePositionAssigned(@RequestParam(value = "id" )Long id) {
        if(id == null) return null;
    
        List<AssignPosition> x = assignPositionRepository.findAll();
        boolean isfound = false;

        if(!x.isEmpty()){
            for(AssignPosition y: x){
                System.out.println(y);
                Employee data = y.getEmployee().getEmployee();
                if(data.getId() == id){
                    isfound = true;
                    break;
                }
            }
        }

        return isfound;
    }

    // Gets all AssignPosition Data under its foriegn key superior
    // GET /assigned/position/employee/superior?id=#
    @RequestMapping(value = "/assigned/position/employee/superior", method=RequestMethod.GET)
    private List<AssignPosition> getAssignPositionsBySuperiorId(@RequestParam(value = "id" )Long id){
        
        
        List<AssignPosition> assignPositions = assignPositionRepository.findAll();
        List<AssignPosition> underThisSuperior = new ArrayList<>();
        
        // In summary this look looks for matching superior id to its foreign key
        for (AssignPosition assignPosition : assignPositions) {
            
            // Uses try catch because null error, can technically ignore since it's not the id we looking for
            try{
                if(assignPosition.getSuperior().getId() == id){
                    underThisSuperior.add(assignPosition);
                }
            } catch (NullPointerException error){
                continue;
            }
        }
        
        return underThisSuperior;
    }
    //-----------------------------Miscs Functions ---------------------------
    private AssignDesignation getEmployeeById(Long id){
        if(id == null) return null;
        return assignDesignationRepository.findById(id)
                .orElseThrow(()->new EmployeeNotFoundException(id));
    }
    private Position getPositionById(Long id){
        if(id == null) return null;
        return positionRepository.findById(id)
                .orElseThrow(()->new PositionNotFoundException(id));
    }
}
