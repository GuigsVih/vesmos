package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.vesmos.Models.Bank;

public interface BankRepository extends JpaRepository<Bank, Long>
{ 
    Optional<Bank> findByIdAndUserId(Long id, Long userId);
}
