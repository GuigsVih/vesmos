package br.com.vesmos.Controllers.User;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Services.Auth.TokenService;
import br.com.vesmos.TransferObjects.AuthDTO;
import br.com.vesmos.TransferObjects.BaseMessageDTO;
import br.com.vesmos.Validators.AuthValidator;

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

}
