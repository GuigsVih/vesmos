package br.com.vesmos.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Models.User;
import br.com.vesmos.Repositories.CreditCardRepository;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.TransferObjects.Interfaces.Payment.CreditCardUsageDTO;

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

    @GetMapping("/usage")
    public ResponseEntity<?> getCreditCardUsage() {

        User user = authService.getAuthenticatedUser();
        List<CreditCardUsageDTO> creditCards = repository.creditCardUsage(user.getId());

        return ResponseEntity.ok().body(creditCards);
    }
}
