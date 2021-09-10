package br.com.vesmos.Controllers.Release;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Services.Release.ReleaseConvertService;
import br.com.vesmos.Services.Release.ReleaseService;
import br.com.vesmos.TransferObjects.BaseMessageDTO;
import br.com.vesmos.TransferObjects.Interfaces.ListReleaseDTO;
import br.com.vesmos.Repositories.ReleaseRepository;
import br.com.vesmos.Validators.Release.ReleaseValidator;

/**
 * Release Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/release")
public class ReleaseController {
    @Autowired
    private ReleaseConvertService convertService;

    @Autowired
    private ReleaseRepository releaseRepository;

    @Autowired
    private ReleaseService releaseService;

    /**
     * Get releases by logged user
     * 
     * @return ResponseEntity
     */
    @GetMapping
    public @ResponseBody Map<String, List<ListReleaseDTO>> get(
        @RequestParam("initialDate") String initialDate,
        @RequestParam("finalDate") String finalDate
        ) {
        List<ListReleaseDTO> releases = releaseService.findAllByUser(initialDate, finalDate);
        LinkedHashMap<String, List<ListReleaseDTO>> groupedByDay = releases.stream()
                .collect(Collectors.groupingBy(item -> item.getPaymentDate(), LinkedHashMap::new, Collectors.toList()));

        return groupedByDay;
    }

    /**
     * Create release
     * 
     * @param ReleaseValidator data containing [name, value, category_id...]
     * 
     * @return ResponseEntity
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ReleaseValidator data) {
        try {
            releaseRepository.save(convertService.convert(data));

            return ResponseEntity.ok().body(new BaseMessageDTO("Lançamento criado com sucesso!"));
        } catch (RegisterDoesNotExistsException e) {
            return ResponseEntity.badRequest().body(new BaseMessageDTO(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseMessageDTO("Erro ao criar lançamento."));
        }
    }

    /**
     * Update a release, filtering by logged user
     * 
     * @param Long             id
     * @param ReleaseValidator data containing [name, value, category_id...]
     * 
     * @return ResponseEntity
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody @Valid ReleaseValidator data) {
        try {
            releaseService.update(id, convertService.convert(data));
            return ResponseEntity.ok().body(new BaseMessageDTO("Lançamento atualizado com sucesso!"));
        } catch (RegisterDoesNotExistsException e) {
            return ResponseEntity.badRequest().body(new BaseMessageDTO(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseMessageDTO("Erro ao atualizar lançamento."));
        }
    }

    /**
     * Delete a release, filtering by logged user
     * 
     * @param release id
     * 
     * @return ResponseEntity
     */
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            releaseService.delete(id);
            return ResponseEntity.ok().body(new BaseMessageDTO("Lançamento deletado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BaseMessageDTO("Erro ao deletar lançamento."));
        }
    }
}
