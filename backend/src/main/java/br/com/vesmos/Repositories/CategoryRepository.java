package br.com.vesmos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.vesmos.Models.Category;
import br.com.vesmos.TransferObjects.Interfaces.ListCategoryDTO;

/**
 * Category Repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CategoryRepository extends JpaRepository<Category, Long>
{
    final String FIND_BY_ID_AND_USER_ID = "SELECT * " +
    "FROM categories c " +
    "WHERE c.id = :id " +
    "AND (c.user_id = :userId " +
    "OR c.user_id IS NULL)";

    final String FIND_BY_USER_ID_OR_NULL = "SELECT " +
    "c.id AS id, " +
    "c.name AS name, " +
    "c.badge_color AS badgeColor, " +
    "c.icon AS icon " +
    "FROM categories c " +
    "WHERE " + 
    "c.user_id = :userId " +
    "OR c.user_id IS NULL";

    @Query(value=FIND_BY_ID_AND_USER_ID, nativeQuery=true)
    Optional<Category> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

    @Query(value=FIND_BY_USER_ID_OR_NULL, nativeQuery=true)
    List<ListCategoryDTO> findByUserIdOrNull(@Param("userId") Long userId);
}