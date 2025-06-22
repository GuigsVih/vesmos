package br.com.vesmos.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.entity.User;

/**
 * User repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
}
