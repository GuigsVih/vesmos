package br.com.vesmos.exceptions;

public class RegisterDoesNotExistsException extends Exception {
    public RegisterDoesNotExistsException(String message) {
        super(message);
    }
}
