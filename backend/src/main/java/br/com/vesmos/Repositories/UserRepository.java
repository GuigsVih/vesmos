package br.com.vesmos.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vesmos.Models.User;

/**
 * User repository
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    
    Optional<User> findByEmail(String email);
}
