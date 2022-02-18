package br.com.vesmos.Services.CreditCard;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Models.User;
import br.com.vesmos.Models.CreditCard;
import br.com.vesmos.Models.CreditCardBill;
import br.com.vesmos.Repositories.CreditCardBillRepository;
import br.com.vesmos.Repositories.CreditCardRepository;
import br.com.vesmos.Validators.Release.ReleaseValidator;
import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;

/**
 * Credit card bill service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class CreditCardBillService 
{
    private Integer day;
    private Integer month;
    private Integer year;

    @Autowired
    CreditCardRepository creditCardRepository;

    @Autowired
    CreditCardBillRepository creditCardBillRepository;

    /**
     * Calculate a bill by paymentData, when create a release with creditCard
     * 
     * @param release
     * @param userId
     * 
     * @return void
     */
    public void calculateBill(ReleaseValidator data, User user) throws Exception
    {
        String type = data.getPayment().getType();
        Long creditCardId = data.getPayment().getId().get();

        if (type.equals("credit_cards")) {
            CreditCard creditCard = creditCardRepository.findByIdAndUserId(creditCardId, user.getId()).get();
            try {
                setCalendar(data.getPaymentDate(), creditCard.getClosure());
                CreditCardBill creditCardBill = verifyIfBillExists(creditCard.getId(), user.getId());
                creditCardBillRepository.updateBillValue(creditCardBill.getId(), data.getValue() + data.getValue(), user.getId());
            } catch (RegisterDoesNotExistsException e) {
                createBill(data, creditCard, user);
            }
        }
    }

    public void createBill(ReleaseValidator data, CreditCard creditCard, User user) 
    {
        CreditCardBill creditCardBill = new CreditCardBill();

        creditCardBill.setMonth(getMonth())
            .setYear(getYear())
            .setStatus(StatusEnum.UNPAID)
            .setValue(data.getValue())
            .setCreditCard(creditCard)
            .setUser(user);

        creditCardBillRepository.save(creditCardBill);
    }

    /**
     * Verify if a credit card bill exists by month, year, id and userId, if dont, throw a exception
     * 
     * @param Calendar calendar
     * @param Long creditCardId
     * @param Long userId
     * 
     * @throws RegisterDoesNotExistsException
     * 
     * @return CreditCardBill
     */
    public CreditCardBill verifyIfBillExists(Long creditCardId, Long userId) throws RegisterDoesNotExistsException 
    {
        return creditCardBillRepository.findBill(getMonth(), getYear(), creditCardId, userId)
            .orElseThrow(() -> new RegisterDoesNotExistsException("Fatura não encontrada"));
    }

    public Calendar setCalendar(Date paymentDate, Integer closure)
    {        
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(paymentDate);

        setDay(calendar.get(Calendar.DAY_OF_MONTH));
        setMonth(calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), closure);
        setYear(calendar.get(Calendar.YEAR));

        return calendar;
    }

    public Integer getDay()
    {
        return day;
    }

    public void setDay(Integer day)
    {
        this.day = day;
    }

    public Integer getMonth()
    {
        return month;
    }

    public void setMonth(Integer month, Integer day, Integer closure)
    {        
        month = day >= closure ? month + 1 : month;

        if (month > 12) {
            month = 1;
            setYear(getYear() + 1);
        }
    
        this.month = month;
    }

    public Integer getYear()
    {
        return this.year;
    }

    public void setYear(Integer year)
    {
        this.year = year;
    }
}
