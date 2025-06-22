package br.com.vesmos.services.card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.entity.CreditCard;
import br.com.vesmos.services.account.AccountService;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.validators.CreateCreditCardValidator;
import br.com.vesmos.exceptions.RegisterDoesNotExistsException;

/**
 * Credit convert service
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class CreditCardConvertService {
	@Autowired
	private AccountService accountService;

	@Autowired
	private AuthenticationService authService;

	public CreditCard convert(CreateCreditCardValidator data) throws RegisterDoesNotExistsException {
		CreditCard creditCard = new CreditCard();
		creditCard.setName(data.getName());
		creditCard.setCreditLimit(data.getCreditLimit());
		creditCard.setLimitUsed(0);
		creditCard.setClosure(data.getClosure());
		creditCard.setDueDate(data.getDueDate());
		creditCard.setAccount(accountService.findByIdAndUserId(data.getAccountId()));
		creditCard.setUser(authService.getAuthenticatedUser());

		return creditCard;
	}
}
