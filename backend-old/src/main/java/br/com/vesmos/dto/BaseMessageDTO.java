package br.com.vesmos.dto;

public class BaseMessageDTO {
    
    private String message;

    public BaseMessageDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
