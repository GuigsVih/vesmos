package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.vesmos.Models.Category;

/**
 * Category Repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CategoryRepository extends JpaRepository<Category, Long>
{
    @Query(value="SELECT * FROM categories c WHERE c.id = :id AND c.user_id = :userId OR c.user_id IS NULL", nativeQuery=true)
    Optional<Category> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
}
