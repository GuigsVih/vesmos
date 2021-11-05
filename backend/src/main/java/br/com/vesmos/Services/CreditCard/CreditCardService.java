package br.com.vesmos.Services.CreditCard;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.CreditCard;
import br.com.vesmos.Models.User;
import br.com.vesmos.Repositories.CreditCardRepository;
import br.com.vesmos.Services.Auth.AuthenticationService;

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

    @Autowired
    private AuthenticationService authService;

    /**
     * Find by id and user_id
     * 
     * @param Optional<Long> id
     * 
     * @return CrediCard
     */
    public CreditCard findByIdAndUserId(Optional<Long> id) throws RegisterDoesNotExistsException
    {
        if (id.isPresent()) {
            User user = authService.getAuthenticatedUser();
            return creditCardRepository.findByIdAndUserId(id.get(), user.getId())
            .orElseThrow(() -> new RegisterDoesNotExistsException("Cartão de crédito inválido."));
        }
        return null;
    }
}
