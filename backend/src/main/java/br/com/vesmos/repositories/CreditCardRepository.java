package br.com.vesmos.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.vesmos.entity.CreditCard;
import br.com.vesmos.dto.Interfaces.payment.PaymentDTO;
import br.com.vesmos.dto.Interfaces.payment.CreditCardUsageDTO;

/**
 * Credit card repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Transactional
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    final String FIND_BY_USER_ID = "SELECT " +
    "c.id, " +
    "c.name AS name, " +
    "cp.picture AS imgUrl, " +
    "'credit_cards' AS type " +
    "FROM credit_cards c " +
    "INNER JOIN accounts a " +
    "ON a.id = c.account_id " +
    "INNER JOIN companies cp " +
    "ON cp.id = a.company_id " +
    "WHERE " +
    "c.user_id = :userId";

    final String CREDIT_CARD_USAGE = "SELECT " +
    "c.name AS name, " +
    "c.credit_limit AS creditLimit, " +
    "c.limit_used AS limitUsed, " +
    "a.nickname AS accountNickname, " +
    "cp.picture AS imgUrl " +
    "FROM credit_cards c " +
    "INNER JOIN accounts a " +
    "ON a.id = c.account_id " +
    "INNER JOIN companies cp " +
    "ON cp.id = a.company_id " +
    "WHERE " +
    "c.user_id = :userId";
    
    final String FIND_ONE_CREDIT_CARD = FIND_BY_USER_ID + 
    " AND c.id = :id";

    final String UPDATE_LIMIT_USED = "UPDATE " +
    "credit_cards c " +
    "SET " +
    "c.limit_used = c.limit_used + :value " +
    "WHERE " +
    "c.id = :creditCardId " +
    "AND c.user_id = :userId"; 

    Optional<CreditCard> findByIdAndUserId(Long id, Long userId);

    @Query(value=FIND_BY_USER_ID, nativeQuery=true)
    List<PaymentDTO> findByUserId(Long userId);

    @Query(value=CREDIT_CARD_USAGE, nativeQuery=true)
    List<CreditCardUsageDTO> creditCardUsage(Long userId);

    @Query(value=FIND_ONE_CREDIT_CARD, nativeQuery=true)
    PaymentDTO findOneCreditCard(Long userId, Long id);

    @Modifying
    @Query(value=UPDATE_LIMIT_USED, nativeQuery=true)
    void updateLimitUsed(Double value, Long creditCardId, Long userId);
}
