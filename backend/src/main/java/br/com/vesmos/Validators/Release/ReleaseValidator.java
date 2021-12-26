package br.com.vesmos.Validators.Release;

import java.util.Date;

import javax.validation.Valid;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Enum.TypeEnum;
import br.com.vesmos.Validators.Annotations.Enum.ValidateEnum;

/**
 * Create Release Validator
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class ReleaseValidator {
    @NotNull
    @Length(min = 1, max = 255)
    private String description;

    @NotNull
    @DecimalMin(value = "0.01")
    private Double value;

    @NotNull
    private Date paymentDate;

    @NotNull
    @ValidateEnum(enumClass = StatusEnum.class)
    private String status;

    @NotNull
    @ValidateEnum(enumClass = TypeEnum.class)
    private String type;

    @NotNull
    private Long categoryId;

    @NotNull
    @Valid
    private PaymentValidator payment;

    public String getDescription() {
        return description;
    }

    public Double getValue() {
        return value;
    }

    public TypeEnum getType() {
        return TypeEnum.valueOf(type);
    }

    public StatusEnum getStatus() {
        return StatusEnum.valueOf(status);
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public PaymentValidator getPayment() {
        return payment;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }
}
