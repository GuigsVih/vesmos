package br.com.vesmos.Validators.Release;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Enum.TypeEnum;
import br.com.vesmos.Models.Release;
import br.com.vesmos.Validators.Annotations.Enum.ValidateEnum;

/**
 * Create Release Validator
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class CreateReleaseValidator 
{
    
    @NotNull
    @Length(max=255)
    private String description;
    
    @NotNull
    @DecimalMin(value="0.01")
    private Double value;
    
    @NotNull
    @ValidateEnum(enumClass=StatusEnum.class)
    private StatusEnum status;

    @NotNull
    @ValidateEnum(enumClass=TypeEnum.class)
    private TypeEnum type;

    @JsonProperty("category_id")
    @Nullable
    private Integer categoryId;
    
    @JsonProperty("bank_id")
    @Nullable
    private Integer bankId;

    @JsonProperty("credit_card_id")
    @Nullable
    private Integer creditCardId;

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
        return type;
    }

    public StatusEnum getStatus()
    {
        return status;
    }
    
    public Integer getCategoryId()
    {
        return categoryId;
    }

    public Integer getCreditCardId()
    {
        return creditCardId;
    }
    
    public Integer getBankId()
    {
        return bankId;
    }

    /**
     * Convert post data to release model
     * 
     * @return Release
     */
    public Release convert()
    {
        Release release = new Release();
        release.setDescription(getDescription());
        release.setStatus(getStatus());
        release.setType(getType());
        release.setValue(getValue());
        release.setDescription(getDescription());
        release.setDescription(getDescription());

        return release;
    }
}
