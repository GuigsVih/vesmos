package br.com.vesmos.Services.CreditCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Models.CreditCard;
import br.com.vesmos.Services.Account.AccountService;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.Validators.CreateCreditCardValidator;
import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;

/**
 * Credit convert service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class CreditCardConvertService 
{
    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthenticationService authService;

    public CreditCard convert(CreateCreditCardValidator data) throws RegisterDoesNotExistsException
    {
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
