package br.com.vesmos.Services.Payment;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Repositories.AccountRepository;
import br.com.vesmos.Repositories.CreditCardRepository;
import br.com.vesmos.TransferObjects.Interfaces.ListPaymentMethodDTO;

/**
 * Payment Service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class PaymentService 
{
    @Autowired
    CreditCardRepository creditCardRepository;

    @Autowired
    AccountRepository accountRepository;

    /**
     * Find accounts and credit cards per userId
     * 
     * @param Long userId
     * 
     * @return List
     */
    public List<ListPaymentMethodDTO> findByUserId(Long userId)
    {
        List<ListPaymentMethodDTO> creditCards = creditCardRepository.findByUserId(userId);
        List<ListPaymentMethodDTO> accounts = accountRepository.findByUserId(userId);

        return Stream.of(creditCards, accounts)
        .flatMap(x -> x.stream())
        .collect(Collectors.toList());
    }
}
