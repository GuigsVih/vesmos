package br.com.vesmos.Validators.Release;

import java.util.Optional;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Enum.TypeEnum;
import br.com.vesmos.Validators.Annotations.Enum.ValidateEnum;

/**
 * Create Release Validator
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class ReleaseValidator 
{    
    @NotNull
    @Length(max=255)
    private String description;
    
    @NotNull
    @DecimalMin(value="0.01")
    private Double value;
    
    @NotNull
    @ValidateEnum(enumClass=StatusEnum.class)
    private String status;

    @NotNull
    @ValidateEnum(enumClass=TypeEnum.class)
    private String type;

    @JsonProperty("category_id")
    @NotNull
    private Long categoryId;
    
    @JsonProperty("account_id")
    @Nullable
    private Optional<Long> accountId;

    @JsonProperty("credit_card_id")
    @Nullable
    private Optional<Long> creditCardId;

    public String getDescription()
    {
        return description;
    }

    public Double getValue()
    {
        return value;
    }

    public TypeEnum getType()
    {
        return TypeEnum.valueOf(type);
    }

    public StatusEnum getStatus()
    {
        return StatusEnum.valueOf(status);
    }
    
    public Long getCategoryId()
    {
        return categoryId;      
    }

    public Optional<Long> getCreditCardId()
    {
        return creditCardId;
    }
    
    public Optional<Long> getAccountId()
    {
        return accountId;
    }
}
