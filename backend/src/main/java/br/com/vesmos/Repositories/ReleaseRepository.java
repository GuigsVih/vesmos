package br.com.vesmos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.Release;
import br.com.vesmos.TransferObjects.Interfaces.ListReleaseDTO;

/**
 * Release repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface ReleaseRepository extends JpaRepository<Release, Long> 
{
    List<ListReleaseDTO> findAllByUserId(Long userId);

    Optional<Release> findByIdAndUserId(Long id, Long userId);
    
    void deleteByIdAndUserId(Long id, Long userId);
}
