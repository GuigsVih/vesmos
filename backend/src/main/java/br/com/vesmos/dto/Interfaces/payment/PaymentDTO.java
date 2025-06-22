package br.com.vesmos.dto.Interfaces.payment;

/**
 * Payment DTO
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public interface PaymentDTO {
    public Long getId();
    public String getType();
    public String getName();
    public String getImgUrl();
}
