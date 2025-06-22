package br.com.vesmos.controllers.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.entity.User;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.services.auth.TokenService;
import br.com.vesmos.dto.BaseMessageDTO;
import br.com.vesmos.dto.auth.AuthDTO;
import br.com.vesmos.dto.auth.MeDTO;
import br.com.vesmos.validators.AuthValidator;

/**
 * Auth Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationService authService;

    /**
     * Authenticate user
     * 
     * @param AuthValidator data containing [email, password]
     * 
     * @return User
     */
    @PostMapping
    public ResponseEntity<?> auth(@RequestBody @Valid AuthValidator data) {
        UsernamePasswordAuthenticationToken toLogin = new UsernamePasswordAuthenticationToken(data.getEmail(),
                data.getPassword());

        try {
            Authentication authenticated = manager.authenticate(toLogin);
            String token = tokenService.generate(authenticated);

            return ResponseEntity.ok(new AuthDTO(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseMessageDTO("Usuário ou senha inválidos."));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me()
    {
        User user = (User) authService.getAuthenticatedUser();
        return ResponseEntity.ok().body(new MeDTO(user.getName(), user.getPicture()));
    }

}
