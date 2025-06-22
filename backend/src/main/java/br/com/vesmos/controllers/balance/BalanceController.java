package br.com.vesmos.controllers.balance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.entity.User;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.services.balance.BalanceService;
import br.com.vesmos.dto.Interfaces.balance.BalanceDTO;
import br.com.vesmos.dto.Interfaces.balance.future.FutureBalanceDTO;
import br.com.vesmos.dto.Interfaces.balance.present.PresentBalanceDTO;

/**
 * Balance controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/balance")
public class BalanceController {
    @Autowired
    private BalanceService balanceService;

    @Autowired
    private AuthenticationService authService;

    /**
     * Get current and future balance of accounts and releases
     * 
     * @return ResponseEntity
     */
    @GetMapping
    public ResponseEntity<?> getBalance(
        @RequestParam("initialDate") String initialDate,
        @RequestParam("finalDate") String finalDate
	) {
        try {
            User user = authService.getAuthenticatedUser();
            PresentBalanceDTO presentBalance = balanceService.getPresentBalance(user.getId(), initialDate, finalDate);
            FutureBalanceDTO futureBalance = balanceService.getFutureBalance(user.getId(), initialDate, finalDate, presentBalance.getPresentAccountBalance(), presentBalance.getPresentReleaseBalance());
            
            return ResponseEntity.ok().body(new BalanceDTO(
                presentBalance.getPresentAccountBalance(),
                presentBalance.getPresentReleaseBalance(),
                futureBalance.getFutureAccountBalance(),
                futureBalance.getFutureReleaseBalance()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
