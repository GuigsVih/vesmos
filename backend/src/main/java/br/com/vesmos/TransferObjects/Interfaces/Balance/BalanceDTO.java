package br.com.vesmos.TransferObjects.Interfaces.Balance;

/**
 * Balance DTO with present and future values
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class BalanceDTO 
{
    private double presentAccountBalance;
    private double presentReleaseBalance;
    private double futureAccountBalance;
    private double futureReleaseBalance;

    public BalanceDTO(
        double presentAccountBalance, 
        double presentReleaseBalance, 
        double futureAccountBalance, 
        double futureReleaseBalance
    ) {
        this.presentAccountBalance = presentAccountBalance;
        this.presentReleaseBalance = presentReleaseBalance;
        this.futureAccountBalance = futureAccountBalance;
        this.futureReleaseBalance = futureReleaseBalance;
    }

    public double getPresentAccountBalance()
    {
        return presentAccountBalance;
    }

    public double getPresentReleaseBalance()
    {
        return presentReleaseBalance;
    }

    public double getFutureAccountBalance()
    {
        return futureAccountBalance;
    }

    public double getFutureReleaseBalance()
    {
        return futureReleaseBalance;
    }
}
