package br.com.vesmos.Validators.Release;

import javax.validation.constraints.NotNull;

/**
 * Repeat charge validator
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class RepeatChargeValidator 
{
    @NotNull
    private String option;

    @NotNull
    private String unitOfMeasurement;

    @NotNull
    private Integer time;

    public String getOption()
    {
        return option;
    }

    public String getUnitOfMeasurement()
    {
        return unitOfMeasurement;
    }

    public Integer getTime()
    {
        return time;
    }
}
