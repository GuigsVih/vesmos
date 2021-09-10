package br.com.vesmos.TransferObjects.Interfaces;

import java.util.Optional;

/**
 * DTO for base release return
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com> 
 */
public interface ListReleaseDTO 
{
    public Long getId();
    public String getDescription();
    public Double getValue();
    public String getStatus();
    public String getType();
    public String getPaymentDate();
    public String getCategoryName();
    public String getCategoryIcon();
    public String getCategoryBadgeColor();
    public Long getCategoryId();
    public Optional<Long> getAccountId();
    public Optional<Long> getCreditCardId();
}
