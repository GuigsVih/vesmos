package br.com.vesmos.Services.Bank;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.Bank;
import br.com.vesmos.Repositories.BankRepository;

/**
 * Bank service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class BankService 
{
    @Autowired
    private BankRepository bankRepository;

    /**
     * Get by bank_id and user_id value
     * 
     * @param Optional<Integer> id
     * @param Integer userId
     * 
     * @return Bank
     */
    public Bank findByIdAndUserId(Optional<Integer> id) throws RegisterDoesNotExistsException
    {
        if (id.isPresent()) {
            return bankRepository.findById(id.get())
                .orElseThrow(() -> new RegisterDoesNotExistsException("Banco inválido."));
        }
        return null;
    }
}
