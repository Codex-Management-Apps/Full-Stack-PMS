package com.ancientstudents.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ancientstudents.backend.exception.PositionNotFoundException;
import com.ancientstudents.backend.model.Position;
import com.ancientstudents.backend.repository.PositionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@CrossOrigin("http://localhost:5175/")
@RestController
public class PositionController {
    
    @Autowired
    private PositionRepository positionRepository;

    // ---------------------------------CRUD Methods--------------------------------

    // Get
    @GetMapping("/positions")
    List<Position> getMethodName() {
        return positionRepository.findAll();
    }
    
    // Set
    @PostMapping("/position")
    Position newPosition(@RequestBody Position newPosition) {

        if( newPosition == null) return null;

        return positionRepository.save(newPosition);
    }
    
    // Update
    @PutMapping("position/{id}")
    Position updatePosition(@PathVariable Long id, @RequestBody Position newPosition) {
        if(id == null) throw new PositionNotFoundException(id);

        return positionRepository.findById(id)
                .map( position -> {
                    position.setPositionName(newPosition.getPositionName());
                    return positionRepository.save(position);
                }).orElseThrow(()->new PositionNotFoundException(id));
    }
    
    // Delete
    @DeleteMapping("position/{id}")
    String deletePosition(@PathVariable Long id){
        if(id == null ) throw new PositionNotFoundException(id);

        if(!positionRepository.existsById(id)){
            throw new PositionNotFoundException(id);
        }
        positionRepository.deleteById(id);
        return "Position with id " + id + " has been deleted";
    }
}
