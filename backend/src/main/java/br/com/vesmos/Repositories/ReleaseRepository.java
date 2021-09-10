package br.com.vesmos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.vesmos.Models.Release;
import br.com.vesmos.TransferObjects.Interfaces.ListReleaseDTO;

/**
 * Release repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface ReleaseRepository extends JpaRepository<Release, Long> 
{
    final String FIND_ALL_BY_USER_ID_SQL = "SELECT " +
    "r.id AS id, " +
    "r.description AS description, " +
    "r.value AS value, " + 
    "r.status AS status, " + 
    "r.type AS type, " + 
    "r.payment_date AS paymentDate, " + 
    "r.account_id AS accountId, " + 
    "r.credit_card_id AS creditCardId, " + 
    "c.id AS categoryId, " + 
    "c.name AS categoryName, " + 
    "c.icon AS categoryIcon, " + 
    "c.badge_color AS categoryBadgeColor " + 
    "FROM releases r " + 
    "INNER JOIN categories c " + 
    "ON c.id = r.category_id " + 
    "WHERE r.user_id = :userId " +
    "AND r.payment_date BETWEEN :initalDate AND :finalDate " +
    "ORDER BY r.payment_date DESC";

    @Query(value=FIND_ALL_BY_USER_ID_SQL, nativeQuery=true)
    List<ListReleaseDTO> findAllByUserId(Long userId, String initalDate, String finalDate);

    Optional<Release> findByIdAndUserId(Long id, Long userId);
    
    void deleteByIdAndUserId(Long id, Long userId);
}
