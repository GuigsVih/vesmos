package br.com.vesmos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.vesmos.Models.Account;
import br.com.vesmos.TransferObjects.Interfaces.Payment.PaymentDTO;
import br.com.vesmos.TransferObjects.Interfaces.Balance.BalanceFromAccountsDTO;
import br.com.vesmos.TransferObjects.Interfaces.Payment.AccountUsageDTO;

public interface AccountRepository extends JpaRepository<Account, Long>
{ 
    final String PRESENT_BALANCE_FROM_ACCOUNTS = "SELECT " +
    "IFNULL(SUM(a.balance), 0) AS accountBalance " +
    "FROM accounts a " +
    "WHERE a.user_id = :userId";

    final String FIND_BY_USER_ID = "SELECT " +
    "a.id, " +
    "a.nickname AS name, " +
    "cp.picture AS imgUrl, " +
    "'accounts' AS type " +
    "FROM accounts a " +
    "INNER JOIN companies cp " +
    "ON cp.id = a.company_id " +
    "WHERE a.user_id = :userId";

    final String ACCOUNT_USAGE = "SELECT " +
    "a.nickname AS nickname, " +
    "a.balance AS balance, " +
    "a.type AS accountType, " +
    "cp.picture AS imgUrl " +
    "FROM accounts a " +
    "INNER JOIN companies cp " +
    "ON cp.id = a.company_id " +
    "WHERE a.user_id = :userId";

    final String FIND_ONE_ACCOUNT = FIND_BY_USER_ID +
    " AND a.id = :id";

    Optional<Account> findByIdAndUserId(Long id, Long userId);

    @Query(value=FIND_BY_USER_ID, nativeQuery=true)
    List<PaymentDTO> findByUserId(Long userId);
    
    @Query(value=PRESENT_BALANCE_FROM_ACCOUNTS, nativeQuery=true)
    BalanceFromAccountsDTO getBalanceFromAccounts(Long userId);

    @Query(value=ACCOUNT_USAGE, nativeQuery=true)
    List<AccountUsageDTO> getAccountUsage(Long userId);

    @Query(value=FIND_ONE_ACCOUNT, nativeQuery=true)
    PaymentDTO findOneAccount(Long userId, Long id);
}
