package br.com.vesmos.TransferObjects.Interfaces;

import java.util.Date;
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
    public Date getCreatedAt();
    public Long getUserId();
    public Long getCategoryId();
    public Optional<Long> getBankId();
    public Optional<Long> getCreditCardId();
}
