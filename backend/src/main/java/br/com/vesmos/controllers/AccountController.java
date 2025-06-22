package br.com.vesmos.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.entity.User;
import br.com.vesmos.repositories.AccountRepository;
import br.com.vesmos.dto.BaseMessageDTO;
import br.com.vesmos.validators.CreateAccountValidator;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.services.account.AccountConvertService;
import br.com.vesmos.dto.Interfaces.payment.PaymentDTO;
import br.com.vesmos.dto.Interfaces.payment.AccountUsageDTO;

/**
 * Account controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AuthenticationService authService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountConvertService convertService;

    @GetMapping
    public ResponseEntity<?> getAccounts() {
        User user = authService.getAuthenticatedUser();
        List<PaymentDTO> accounts = accountRepository.findByUserId(user.getId());

        return ResponseEntity.ok().body(accounts);

    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid CreateAccountValidator data) {
        try {
            accountRepository.save(convertService.convert(data));
            return ResponseEntity.ok().body(new BaseMessageDTO("Conta criada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseMessageDTO("Erro ao criar conta"));
        }
    }

    @GetMapping("/usage")
    public ResponseEntity<?> getAccountsUsage() {
        User user = authService.getAuthenticatedUser();
        List<AccountUsageDTO> accounts = accountRepository.getAccountUsage(user.getId());

        return ResponseEntity.ok().body(accounts);
    }
}
