package br.com.vesmos.services.payment;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.repositories.AccountRepository;
import br.com.vesmos.repositories.CreditCardRepository;
import br.com.vesmos.dto.Interfaces.payment.PaymentDTO;

/**
 * Payment Service
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class PaymentService {
	@Autowired
	CreditCardRepository creditCardRepository;

	@Autowired
	AccountRepository accountRepository;

	/**
	 * Find accounts and credit cards per userId
	 *
	 * @param Long userId
	 * @return List
	 */
	public List<PaymentDTO> findByUserId(Long userId) {
		List<PaymentDTO> creditCards = creditCardRepository.findByUserId(userId);
		List<PaymentDTO> accounts = accountRepository.findByUserId(userId);

		return Stream.of(creditCards, accounts)
			.flatMap(x -> x.stream())
			.collect(Collectors.toList());
	}

	public PaymentDTO findByTypeAndId(Long id, String type, Long userId) {
		PaymentDTO payment;
		if (type.equals("credit_cards")) {
			payment = creditCardRepository.findOneCreditCard(userId, id);
		} else {
			payment = accountRepository.findOneAccount(userId, id);
		}

		return payment;
	}
}
