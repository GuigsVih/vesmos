package br.com.vesmos.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Models.User;
import br.com.vesmos.Repositories.AccountRepository;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.TransferObjects.Interfaces.Payment.AccountUsageDTO;

/**
 * Account controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/account")
public class AccountController 
{
    @Autowired
    private AuthenticationService authService;

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/usage")
    public ResponseEntity<?> getAccountsUsage()
    {
        User user = authService.getAuthenticatedUser();
        List<AccountUsageDTO> accounts = accountRepository.getAccountUsage(user.getId());

        return ResponseEntity.ok().body(accounts);
    }
}
