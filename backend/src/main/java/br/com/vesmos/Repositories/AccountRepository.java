package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.vesmos.Models.Account;
import br.com.vesmos.TransferObjects.Interfaces.Balance.BalanceFromAccountsDTO;
public interface AccountRepository extends JpaRepository<Account, Long>
{ 
    final String PRESENT_BALANCE_FROM_ACCOUNTS = "SELECT " +
    "IFNULL(SUM(a.balance), 0) AS accountBalance " +
    "FROM accounts a " +
    "WHERE a.user_id = :userId";

    Optional<Account> findByIdAndUserId(Long id, Long userId);
    
    @Query(value=PRESENT_BALANCE_FROM_ACCOUNTS, nativeQuery=true)
    BalanceFromAccountsDTO getBalanceFromAccounts(Long userId);
}
