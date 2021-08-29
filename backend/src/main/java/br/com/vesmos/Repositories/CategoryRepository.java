package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.Category;

/**
 * Category Repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CategoryRepository extends JpaRepository<Category, Long>
{
    Optional<Category> findByIdAndUserId(Long id, Long userId);
}
