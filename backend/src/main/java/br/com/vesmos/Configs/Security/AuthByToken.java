package br.com.vesmos.Configs.Security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.vesmos.Models.User;
import br.com.vesmos.Repositories.UserRepository;
import br.com.vesmos.Services.Auth.TokenService;

public class AuthByToken extends OncePerRequestFilter {

    private TokenService service;
    private UserRepository repository;

    public AuthByToken(TokenService service, UserRepository repository)
    {
        this.service = service;
        this.repository = repository;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request, 
        HttpServletResponse response, 
        FilterChain filterChain
    ) throws ServletException, IOException 
    {
        String token = getTokenFromHeader(request);
        boolean isTokenValid = service.isValid(token);
        
        if (isTokenValid) {
            authenticateUser(token);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Get token from header authorization
     * 
     * @return String
     */
    private String getTokenFromHeader(HttpServletRequest request)
    {
        String token = request.getHeader("Authorization");

        if (token == null || token.isEmpty() || !token.startsWith("Bearer")) {
            return null;
        }

        return token.substring(7, token.length());
    }

    /**
     * Authenticate user if bearer token is valid
     * 
     * @return void
     */
    private void authenticateUser(String token)
    {
        int userId = service.getUserId(token);
        User user = repository.findById(userId).get();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    
}
