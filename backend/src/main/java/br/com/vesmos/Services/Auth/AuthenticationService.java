package br.com.vesmos.Services.Auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.vesmos.Models.User;
import br.com.vesmos.Repositories.UserRepository;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Optional<User> user = repository.findByEmail(email);

        if (user.isPresent()) {
            return user.get();
        }

        throw new UsernameNotFoundException("E-mail e/ou senha incorretos");
    }
}
