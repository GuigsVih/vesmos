package br.com.vesmos.Controllers.Release;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.Release;
import br.com.vesmos.Services.Release.ReleaseConvertService;
import br.com.vesmos.Repositories.ReleaseRepository;
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
    @Autowired
    private ReleaseConvertService convertService;

    @Autowired
    private ReleaseRepository releaseRepository;

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
            Release release = convertService.convert(data);
            releaseRepository.save(release);

            return ResponseEntity.ok().body("Lançamento criado com sucesso!");
        } catch (RegisterDoesNotExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getClass());
        }

    }
    
    public void update() {}

    public void delete() {}
}
