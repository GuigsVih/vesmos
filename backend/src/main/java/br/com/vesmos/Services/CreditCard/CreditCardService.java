package br.com.vesmos.Services.CreditCard;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.CreditCard;
import br.com.vesmos.Repositories.CreditCardRepository;

/**
 * Credit card service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class CreditCardService 
{
    @Autowired
    private CreditCardRepository creditCardRepository;

    /**
     * Find by id and user_id
     * 
     * @param Optional<Integer> id
     * @param Integer userId
     * 
     * @return CrediCard
     */
    public CreditCard findByIdAndUserId(Optional<Integer> id) throws RegisterDoesNotExistsException
    {
        if (id.isPresent()) {
            return creditCardRepository.findById(id.get())
            .orElseThrow(() -> new RegisterDoesNotExistsException("Cartão de crédito inválido."));
        }        
        return null;
    }
}
