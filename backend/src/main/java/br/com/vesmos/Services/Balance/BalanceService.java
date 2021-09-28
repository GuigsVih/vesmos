package br.com.vesmos.Services.Balance;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Repositories.AccountRepository;
import br.com.vesmos.Repositories.ReleaseRepository;
import br.com.vesmos.TransferObjects.Interfaces.Balance.BalanceFromAccountsDTO;
import br.com.vesmos.TransferObjects.Interfaces.Balance.BalanceFromReleasesDTO;
import br.com.vesmos.TransferObjects.Interfaces.Balance.Future.FutureBalanceDTO;
import br.com.vesmos.TransferObjects.Interfaces.Balance.Present.PresentBalanceDTO;

/**
 * Balance Service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class BalanceService
{
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ReleaseRepository releaseRepository;

    public PresentBalanceDTO getPresentBalance(Long userId, String initialDate, String finalDate)
    {
        List<String> status = new ArrayList<>();
        status.add("PAID");

        BalanceFromAccountsDTO accountBalance = accountRepository.getBalanceFromAccounts(userId);
        BalanceFromReleasesDTO releaseBalance = releaseRepository.getBalanceFromReleases(userId, initialDate, finalDate, status);
        
        return new PresentBalanceDTO(
            accountBalance.getAccountBalance(), 
            releaseBalance.getReleaseBalance()
            );
    }

    public FutureBalanceDTO getFutureBalance(Long userId, String initialDate, String finalDate, double accountBalance)
    {
        List<String> status = new ArrayList<>();
        status.add("PAID");
        status.add("UNPAID");

        BalanceFromReleasesDTO releaseBalance = releaseRepository.getBalanceFromReleases(userId, initialDate, finalDate, status);

        return new FutureBalanceDTO(
            accountBalance + releaseBalance.getReleaseBalance(),
            releaseBalance.getReleaseBalance()
        );
    }
}
