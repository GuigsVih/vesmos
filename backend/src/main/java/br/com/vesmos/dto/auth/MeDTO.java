package br.com.vesmos.dto.auth;

/**
 * DTO for request user authenticated response
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class MeDTO {

    private String name;
    private String img;

    public MeDTO(String name, String img) 
    {
        this.name = name;
        this.img = img;
    }

    public String getName()
    {
        return name;
    }

    public String getImg()
    {
        return img;
    }
}
