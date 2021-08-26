package br.com.vesmos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.Category;

/**
 * Category Repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CategoryRepository extends JpaRepository<Category, Integer>
{
}
