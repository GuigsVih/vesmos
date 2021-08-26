package br.com.vesmos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.Release;

/**
 * Release repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface ReleaseRepository extends JpaRepository<Release, Integer>
{
}
