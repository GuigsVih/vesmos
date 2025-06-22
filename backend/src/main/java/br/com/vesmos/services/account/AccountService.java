package br.com.vesmos.services.account;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.entity.Account;
import br.com.vesmos.entity.User;
import br.com.vesmos.repositories.AccountRepository;
import br.com.vesmos.services.auth.AuthenticationService;

/**
 * Company service
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AuthenticationService authService;

	/**
	 * Get by account id and user_id value
	 *
	 * @param Optional<Long> id
	 * @param Long           userId
	 * @return Account
	 */
	public Account findByIdAndUserId(Optional<Long> id) throws RegisterDoesNotExistsException {
		if (id.isPresent()) {
			User user = authService.getAuthenticatedUser();
			return accountRepository.findByIdAndUserId(id.get(), user.getId())
				.orElseThrow(() -> new RegisterDoesNotExistsException("Conta inválida."));
		}
		return null;
	}
}
