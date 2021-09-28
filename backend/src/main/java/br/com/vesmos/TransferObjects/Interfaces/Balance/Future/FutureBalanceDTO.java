package br.com.vesmos.TransferObjects.Interfaces.Balance.Future;

/**
 * Future balance DTO
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class FutureBalanceDTO
{
    private double accountBalance;
    private double releaseBalance;

    public FutureBalanceDTO(double accountBalance, double releaseBalance)
    {
        this.accountBalance = accountBalance;
        this.releaseBalance = releaseBalance;
    }
    
    public double getFutureAccountBalance()
    {
        return accountBalance;
    }

    public double getFutureReleaseBalance()
    {
        return releaseBalance;
    }
}
