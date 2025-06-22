package br.com.vesmos.controllers.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.entity.User;
import br.com.vesmos.repositories.UserRepository;
import br.com.vesmos.dto.BaseMessageDTO;
import br.com.vesmos.validators.user.CreateAccountValidator;

/**
 * User Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    /**
     * Authenticate user
     * 
     * @param CreateAccountValidator data containing [name, email, password]
     * 
     * @return User
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid CreateAccountValidator data) {
        try {
            User user = data.convert();
            userRepository.save(user);
            return ResponseEntity.ok().body(new BaseMessageDTO("Usuário criado com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BaseMessageDTO("Erro ao criar usuário."));
        }
    }
}
