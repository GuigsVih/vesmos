package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.Account;
public interface AccountRepository extends JpaRepository<Account, Long>
{ 
    Optional<Account> findByIdAndUserId(Long id, Long userId);
}
