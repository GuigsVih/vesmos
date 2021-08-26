package br.com.vesmos.Exceptions;

public class RegisterDoesNotExistsException extends Exception
{
    public RegisterDoesNotExistsException(String message)
    {
        super(message);
    }
}
