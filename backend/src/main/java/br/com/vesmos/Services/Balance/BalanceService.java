package br.com.vesmos.Services.Balance;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Models.Release;
import br.com.vesmos.Repositories.AccountRepository;
import br.com.vesmos.Repositories.ReleaseRepository;
import br.com.vesmos.Validators.Release.ReleaseValidator;
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
public class BalanceService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ReleaseRepository releaseRepository;

    public PresentBalanceDTO getPresentBalance(Long userId, String initialDate, String finalDate) {
        List<String> status = new ArrayList<>();
        status.add("PAID");

        BalanceFromAccountsDTO accountBalance = accountRepository.getBalanceFromAccounts(userId);
        BalanceFromReleasesDTO releaseBalance = releaseRepository.getBalanceFromReleases(userId, initialDate, finalDate,
                status);

        return new PresentBalanceDTO(
                accountBalance.getAccountBalance(),
                releaseBalance.getReleaseBalance());
    }

    public FutureBalanceDTO getFutureBalance(Long userId, String initialDate, String finalDate, double accountBalance) {
        List<String> status = new ArrayList<>();
        status.add("PAID");
        status.add("UNPAID");

        BalanceFromReleasesDTO releaseBalance = releaseRepository.getBalanceFromReleases(userId, initialDate, finalDate,
                status);

        return new FutureBalanceDTO(
                accountBalance + releaseBalance.getReleaseBalance(),
                releaseBalance.getReleaseBalance());
    }

    public void calculateBalance(ReleaseValidator data, Long userId) {
        String type = data.getPayment().getType();
        Long id = data.getPayment().getId().get();
        if (data.getStatus().equals(StatusEnum.PAID)) {
            if (type.equals("accounts") && id != null) {
                accountRepository.updateBalance(id, data.getValue() * -1, userId);
            }
        }
    }

    public void updateReleaseBalanceCalculation(Release release, Release oldRelease, Long userId) {
        if (release.getAccount() != null) {
            updateBalanceFromAccount(release, oldRelease, userId);
        }

        if (release.getCreditCard() != null) {
            // do nothing yet
        }

    }

    public void updateBalanceFromAccount(Release release, Release oldRelease, Long userId) {
        if (release.getAccount().getId() != oldRelease.getAccount().getId()) {
            turnBackBalance(oldRelease, userId);
            if (StatusEnum.valueOf(release.getStatus()).equals(StatusEnum.PAID)) {
                accountRepository.updateBalance(release.getAccount().getId(), release.getValue() * -1, userId);
            }
            return;
        }
        
        if (release.getValue() != oldRelease.getValue() 
            && StatusEnum.valueOf(release.getStatus()).equals(StatusEnum.PAID)
            && StatusEnum.valueOf(oldRelease.getStatus()).equals(StatusEnum.PAID)
        ) {
            accountRepository.updateBalance(release.getAccount().getId(), (release.getValue() - oldRelease.getValue()) * -1, userId);
        }

        if (!release.getStatus().equals(oldRelease.getStatus())) {
            Double value = StatusEnum.valueOf(oldRelease.getStatus()).equals(StatusEnum.UNPAID) ? release.getValue() * -1 : release.getValue();
            accountRepository.updateBalance(release.getAccount().getId(), value, userId);
        }
    }

    public void turnBackBalance(Release oldRelease, Long userId) {
        if (StatusEnum.valueOf(oldRelease.getStatus()).equals(StatusEnum.PAID)) {
            accountRepository.updateBalance(oldRelease.getAccount().getId(), oldRelease.getValue(), userId);
        }
    }
}
