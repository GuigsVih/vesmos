package br.com.vesmos.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.entity.User;
import br.com.vesmos.dto.BaseMessageDTO;
import br.com.vesmos.repositories.CreditCardRepository;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.validators.CreateCreditCardValidator;
import br.com.vesmos.exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.services.card.CreditCardConvertService;
import br.com.vesmos.dto.Interfaces.payment.CreditCardUsageDTO;

/**
 * Credit card controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/credit-card")
public class CreditCardController {

    @Autowired
    private AuthenticationService authService;

    @Autowired
    private CreditCardRepository repository;

    @Autowired
    private CreditCardConvertService convertService;

    /**
     * Get credit card usage
     * 
     * @return Reponse entity
     */
    @GetMapping("/usage")
    public ResponseEntity<?> getCreditCardUsage() {

        User user = authService.getAuthenticatedUser();
        List<CreditCardUsageDTO> creditCards = repository.creditCardUsage(user.getId());

        return ResponseEntity.ok().body(creditCards);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid CreateCreditCardValidator data) throws RegisterDoesNotExistsException {
        try {
            repository.save(convertService.convert(data));

            return ResponseEntity.ok().body(new BaseMessageDTO("Cartão de crédito criado com sucesso"));
        } catch (RegisterDoesNotExistsException e) {
            return ResponseEntity.badRequest().body(new BaseMessageDTO(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar cartão de crédito");
        }
    }
}
