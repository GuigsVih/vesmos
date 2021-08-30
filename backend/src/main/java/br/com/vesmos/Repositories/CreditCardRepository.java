package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.CreditCard;

/**
 * Credit card repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CreditCardRepository extends JpaRepository<CreditCard, Long>
{
    Optional<CreditCard> findByIdAndUserId(Long id, Long userId);
}
