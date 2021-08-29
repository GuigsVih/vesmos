package br.com.vesmos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.CreditCard;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long>
{    
}
