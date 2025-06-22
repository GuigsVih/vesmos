package br.com.vesmos.dto.Interfaces.balance.present;

/**
 * Define present balance of accounts and releases
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class PresentBalanceDTO {
    private double accountBalance;
    private double releaseBalance;

    public PresentBalanceDTO(double accountBalance, double releaseBalance)
    {
        this.accountBalance = accountBalance;
        this.releaseBalance = releaseBalance;
    }
    
    public double getPresentAccountBalance()
    {
        return accountBalance;
    }

    public double getPresentReleaseBalance()
    {
        return releaseBalance;
    }
}
