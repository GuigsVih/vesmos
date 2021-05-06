package br.com.vesmos.Validators;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class AuthValidator {
    
    @NotNull @Email
    private String email;
    @NotNull
    private String password;

    public String getEmail()
    {
        return email;
    }

    public String getPassword()
    {
        return password;
    }
}
