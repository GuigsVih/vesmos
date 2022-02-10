package br.com.vesmos.TransferObjects.Auth;

/**
 * DTO for authentication response
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class AuthDTO {

    private String token;

    public AuthDTO(String token) 
    {
        this.token = token;
    }

    public String getToken()
    {
        return token;
    }
}
