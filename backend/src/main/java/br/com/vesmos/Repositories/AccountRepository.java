package br.com.vesmos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.vesmos.Models.Account;
import br.com.vesmos.TransferObjects.Interfaces.ListPaymentMethodDTO;
import br.com.vesmos.TransferObjects.Interfaces.Balance.BalanceFromAccountsDTO;
public interface AccountRepository extends JpaRepository<Account, Long>
{ 
    final String PRESENT_BALANCE_FROM_ACCOUNTS = "SELECT " +
    "IFNULL(SUM(a.balance), 0) AS accountBalance " +
    "FROM accounts a " +
    "WHERE a.user_id = :userId";

    final String FIND_BY_USER_ID = "SELECT " +
    "a.id, " +
    "a.nickname AS name, " +
    "b.picture AS imgUrl, " +
    "'accounts' AS type " +
    "FROM accounts a " +
    "INNER JOIN banks b " +
    "ON b.id = a.bank_id " +
    "WHERE a.user_id = :userId";

    Optional<Account> findByIdAndUserId(Long id, Long userId);

    @Query(value=FIND_BY_USER_ID, nativeQuery=true)
    List<ListPaymentMethodDTO> findByUserId(Long userId);
    
    @Query(value=PRESENT_BALANCE_FROM_ACCOUNTS, nativeQuery=true)
    BalanceFromAccountsDTO getBalanceFromAccounts(Long userId);
}
