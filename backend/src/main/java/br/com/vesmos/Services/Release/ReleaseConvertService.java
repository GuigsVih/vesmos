package br.com.vesmos.Services.Release;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.Release;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.Services.Bank.BankService;
import br.com.vesmos.Services.Category.CategoryService;
import br.com.vesmos.Services.CreditCard.CreditCardService;
import br.com.vesmos.Validators.Release.ReleaseValidator;

/**
 * Resbonsable for convertion to model
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class ReleaseConvertService 
{
    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    private BankService bankService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthenticationService authenticationService;

    /**
     * Convert data to release model type
     * 
     * @return Release
     */
    public Release convert(ReleaseValidator data) throws RegisterDoesNotExistsException
    {
        Release release = new Release();
        
        release.setDescription(data.getDescription())
            .setStatus(data.getStatus())
            .setType(data.getType())
            .setValue(data.getValue())
            .setCreditCard(creditCardService.findByIdAndUserId(data.getCreditCardId()))
            .setBank(bankService.findByIdAndUserId(data.getBankId()))
            .setCategory(categoryService.findByIdAndUserId(data.getCategoryId()))
            .setUser(authenticationService.getAuthenticatedUser());

        return release;
    }
}
