package br.com.vesmos.services.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.entity.Account;
import br.com.vesmos.repositories.CompanyRepository;
import br.com.vesmos.validators.CreateAccountValidator;
import br.com.vesmos.services.auth.AuthenticationService;

/**
 * Account convert service
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class AccountConvertService {
	@Autowired
	private AuthenticationService authService;

	@Autowired
	private CompanyRepository companyRepository;

	public Account convert(CreateAccountValidator data) {
		Account account = new Account();
		account.setNickname(data.getNickname());
		account.setType(data.getType());
		account.setBalance(data.getBalance());
		account.setCompany(companyRepository.findById(data.getCompanyId()).get());
		account.setUser(authService.getAuthenticatedUser());

		return account;
	}
}
