package br.com.vesmos.TransferObjects.Interfaces.Payment;

/**
 * Credit card usage DTO
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface CreditCardUsageDTO 
{
    public String getName();
    public Double getCreditLimit();
    public Double getLimitUsed();
    public String getAccountNickname();
    public String getImgUrl();
}
