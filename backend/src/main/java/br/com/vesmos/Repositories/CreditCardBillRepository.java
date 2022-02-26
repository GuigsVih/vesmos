package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.vesmos.Models.CreditCardBill;

/**
 * Credit card bill repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Transactional
public interface CreditCardBillRepository extends JpaRepository<CreditCardBill, Long> 
{
    final String FIND_BILL = "SELECT ccb.* " +
    "FROM credit_card_bills ccb " +
    "WHERE " +
    "ccb.month = :month " +
    "AND ccb.year = :year " +
    "AND ccb.credit_card_id = :creditCardId " +
    "AND ccb.user_id = :userId";

    final String UPDATE_BILL_VALUE = "UPDATE " +
    "credit_card_bills ccb " +
    "SET " +
    "ccb.value = :value - ccb.value * -1 " +
    "WHERE " +
    "ccb.id = :id " +
    "AND ccb.user_id = :userId";

    @Query(value=FIND_BILL, nativeQuery=true)
    Optional<CreditCardBill> findBill(Integer month, Integer year, Long creditCardId, Long userId);

    @Modifying
    @Query(value=UPDATE_BILL_VALUE, nativeQuery=true)
    void updateBillValue(Long id, Double value, Long userId);
}
