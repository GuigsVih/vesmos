package br.com.vesmos.Services.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Models.Account;
import br.com.vesmos.Repositories.CompanyRepository;
import br.com.vesmos.Validators.CreateAccountValidator;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;

/**
 *  Account convert service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class AccountConvertService 
{
    @Autowired
    private AuthenticationService authService;

    @Autowired
    private CompanyRepository companyRepository;

    public Account convert(CreateAccountValidator data) throws RegisterDoesNotExistsException
    {
        Account account = new Account();
        account.setNickname(data.getNickname());
        account.setType(data.getType());
        account.setBalance(data.getBalance());
        account.setCompany(companyRepository.findById(data.getCompanyId()).get());
        account.setUser(authService.getAuthenticatedUser());

        return account;
    }
}
