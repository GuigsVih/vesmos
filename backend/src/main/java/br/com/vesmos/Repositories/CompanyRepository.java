package br.com.vesmos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.Company;

/**
 * Company Repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CompanyRepository extends JpaRepository<Company, Long>
{}