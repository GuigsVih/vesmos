package br.com.vesmos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.entity.Company;

/**
 * Company Repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CompanyRepository extends JpaRepository<Company, Long> {}