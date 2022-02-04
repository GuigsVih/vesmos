package br.com.vesmos.Validators;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.com.vesmos.Enum.AccountTypeEnum;
import br.com.vesmos.Validators.Annotations.Enum.ValidateEnum;

/**
 * Create account validator
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class CreateAccountValidator 
{
    
    @NotNull
    @Length(max=255)
    private String nickname;
    
    @NotNull
    private double balance;

    @NotNull
    private Long companyId;

    @NotNull
    @ValidateEnum(enumClass = AccountTypeEnum.class)
    private String type;

    public String getNickname()
    {
        return nickname;
    }

    public double getBalance()
    {
        return balance;
    }

    public Long getCompanyId()
    {
        return companyId;
    }

    public AccountTypeEnum getType()
    {
        return AccountTypeEnum.valueOf(type);
    }
}
