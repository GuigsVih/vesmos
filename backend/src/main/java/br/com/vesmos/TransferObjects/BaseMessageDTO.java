package br.com.vesmos.TransferObjects;

public class BaseMessageDTO {
    
    private String message;

    public BaseMessageDTO(String message)
    {
        this.message = message;
    }

    public String getMessage()
    {
        return message;
    }
}
