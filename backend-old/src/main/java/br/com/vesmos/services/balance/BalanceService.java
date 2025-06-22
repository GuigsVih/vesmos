package br.com.vesmos.services.balance;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.enums.StatusEnum;
import br.com.vesmos.entity.Release;
import br.com.vesmos.repositories.AccountRepository;
import br.com.vesmos.repositories.ReleaseRepository;
import br.com.vesmos.validators.release.ReleaseValidator;
import br.com.vesmos.dto.Interfaces.balance.BalanceFromAccountsDTO;
import br.com.vesmos.dto.Interfaces.balance.BalanceFromReleasesDTO;
import br.com.vesmos.dto.Interfaces.balance.future.FutureBalanceDTO;
import br.com.vesmos.dto.Interfaces.balance.present.PresentBalanceDTO;

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

	/**
	 * Get present balance by paid releases
	 *
	 * @param userId
	 * @param initialDate
	 * @param finalDate
	 * @return PresentBalanceDTO
	 */
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

	/**
	 * Get future balance from paid and unpaid releases
	 *
	 * @param userId
	 * @param initialDate
	 * @param finalDate
	 * @param accountBalance
	 * @return FutureBalanceDTO
	 */
	public FutureBalanceDTO getFutureBalance(Long userId, String initialDate, String finalDate, double accountBalance, double presentReleaseBalance) {
		List<String> status = new ArrayList<>();
		status.add("UNPAID");

		BalanceFromReleasesDTO releaseBalance = releaseRepository.getBalanceFromReleases(userId, initialDate, finalDate,
			status);

		return new FutureBalanceDTO(
			accountBalance + releaseBalance.getReleaseBalance(),
			releaseBalance.getReleaseBalance() + presentReleaseBalance);
	}

	/**
	 * Calculate balance from new created paid releases
	 *
	 * @param data
	 * @param userId
	 * @return void
	 */
	public void calculateBalance(ReleaseValidator data, Long userId) {
		String type = data.getPayment().getType();
		Long id = data.getPayment().getId().get();
		if (data.getStatus().equals(StatusEnum.PAID)) {
			if (type.equals("accounts") && id != null) {
				accountRepository.updateBalance(id, data.getValue() * -1, userId);
			}
		}
	}

	/**
	 * Update balance account from a updated release
	 *
	 * @param release
	 * @param oldRelease
	 * @param userId
	 * @return void
	 */
	public void updateReleaseBalanceCalculation(Release release, Release oldRelease, Long userId) {
		if (release.getAccount() != null) {
			updateBalanceFromAccount(release, oldRelease, userId);
		}

		if (release.getCreditCard() != null && oldRelease.getAccount() != null) {
			turnBackBalance(oldRelease, userId);
		}
	}

	/**
	 * Call the basic functions to update a balance
	 *
	 * @param release
	 * @param oldRelease
	 * @param userId
	 * @return void
	 */
	public void updateBalanceFromAccount(Release release, Release oldRelease, Long userId) {
		if (oldRelease.getAccount() != null && release.getAccount().getId() != oldRelease.getAccount().getId()) {
			turnBackBalance(oldRelease, userId);
			if (StatusEnum.valueOf(release.getStatus()).equals(StatusEnum.PAID)) {
				accountRepository.updateBalance(release.getAccount().getId(), release.getValue() * -1, userId);
			}
			return;
		}

		updateBalanceByChangedReleaseValue(release, oldRelease, userId);
		updateBalanceByChangedReleaseStatus(release, oldRelease, userId);
		updateBalanceByPaymentMethodCardToAccount(release, oldRelease, userId);
	}

	/**
	 * Update balance if the release value has changed
	 *
	 * @param release
	 * @param oldRelease
	 * @param userId
	 * @return void
	 */
	public void updateBalanceByChangedReleaseValue(Release release, Release oldRelease, Long userId) {
		if (release.getValue() != oldRelease.getValue()
			&& StatusEnum.valueOf(release.getStatus()).equals(StatusEnum.PAID)
			&& StatusEnum.valueOf(oldRelease.getStatus()).equals(StatusEnum.PAID)) {
			accountRepository.updateBalance(release.getAccount().getId(),
				(release.getValue() - oldRelease.getValue()) * -1, userId);
		}
	}

	/**
	 * Update balance if the release status has changed
	 *
	 * @param release
	 * @param oldRelease
	 * @param userId
	 * @return void
	 */
	public void updateBalanceByChangedReleaseStatus(Release release, Release oldRelease, Long userId) {
		if (release.getAccount() != null && oldRelease.getAccount() != null && !release.getStatus().equals(oldRelease.getStatus())) {
			Double value = StatusEnum.valueOf(oldRelease.getStatus()).equals(StatusEnum.UNPAID)
				? release.getValue() * -1
				: release.getValue();
			accountRepository.updateBalance(release.getAccount().getId(), value, userId);
		}
	}

	/**
	 * Update balance if the payment method is changed from credit_card to debit account
	 *
	 * @param release
	 * @param oldRelease
	 * @param userId
	 * @return void
	 */
	public void updateBalanceByPaymentMethodCardToAccount(Release release, Release oldRelease, Long userId) {
		if (release.getAccount() != null && oldRelease.getCreditCard() != null
			&& StatusEnum.valueOf(release.getStatus()).equals(StatusEnum.PAID)) {
			accountRepository.updateBalance(release.getAccount().getId(), release.getValue() * -1, userId);
		}
	}

	/**
	 * Turn back the balance value, if has been discounted from a paid release
	 *
	 * @param oldRelease
	 * @param userId
	 * @return void
	 */
	public void turnBackBalance(Release oldRelease, Long userId) {
		if (StatusEnum.valueOf(oldRelease.getStatus()).equals(StatusEnum.PAID)) {
			accountRepository.updateBalance(oldRelease.getAccount().getId(), oldRelease.getValue(), userId);
		}
	}
}
