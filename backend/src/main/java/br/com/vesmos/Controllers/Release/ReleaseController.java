package br.com.vesmos.Controllers.Release;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Models.Release;
import br.com.vesmos.Validators.Release.CreateReleaseValidator;

/**
 * Release Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/release")
public class ReleaseController 
{
    public void get() {}

    /**
     * Create release
     * 
     * @param CreateReleaseValidator data containing [name, value, category_id...]
     * 
     * @return ResponseEntity
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid CreateReleaseValidator data) 
    {
        try {
            Release release = data.convert();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }
    
    public void update() {}

    public void delete() {}
}
