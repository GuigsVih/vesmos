package br.com.vesmos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.vesmos.Models.CreditCard;
import br.com.vesmos.TransferObjects.Interfaces.ListPaymentMethodDTO;

/**
 * Credit card repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CreditCardRepository extends JpaRepository<CreditCard, Long>
{
    final String FIND_BY_USER_ID = "SELECT " +
    "c.id, " +
    "c.name AS name, " +
    "b.picture AS imgUrl, " +
    "'credit_cards' AS type " +
    "FROM credit_cards c " +
    "INNER JOIN accounts a " +
    "ON a.id = c.account_id " +
    "INNER JOIN banks b " +
    "ON b.id = a.bank_id " +
    "WHERE " +
    "c.user_id = :userId";

    Optional<CreditCard> findByIdAndUserId(Long id, Long userId);

    @Query(value=FIND_BY_USER_ID, nativeQuery=true)
    List<ListPaymentMethodDTO> findByUserId(Long userId);
}
