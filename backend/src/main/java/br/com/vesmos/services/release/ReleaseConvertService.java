package br.com.vesmos.services.release;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.entity.Release;
import br.com.vesmos.services.account.AccountService;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.services.category.CategoryService;
import br.com.vesmos.services.card.CreditCardService;
import br.com.vesmos.validators.release.PaymentValidator;
import br.com.vesmos.validators.release.ReleaseValidator;

/**
 * Resbonsable for convertion to model
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class ReleaseConvertService {
	@Autowired
	private CreditCardService creditCardService;

	@Autowired
	private AccountService accountService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private AuthenticationService authenticationService;

	/**
	 * Convert data to release model type
	 *
	 * @return Release
	 */
	public Release convert(ReleaseValidator data) throws RegisterDoesNotExistsException {
		Release release = new Release();
		release.setDescription(data.getDescription())
			.setStatus(data.getStatus())
			.setType(data.getType())
			.setValue(data.getValue())
			.setPaymentDate(data.getPaymentDate())
			.setCategory(categoryService.findByIdAndUserId(data.getCategoryId()))
			.setUser(authenticationService.getAuthenticatedUser());

		release = convertPayment(release, data.getPayment());

		return release;
	}

	public Release convertPayment(Release release, PaymentValidator payment) throws RegisterDoesNotExistsException {
		if (payment.getType().equals("accounts")) {
			release.setAccount(accountService.findByIdAndUserId(payment.getId()));
		} else {
			release.setCreditCard(creditCardService.findByIdAndUserId(payment.getId()));
		}

		return release;
	}
}
