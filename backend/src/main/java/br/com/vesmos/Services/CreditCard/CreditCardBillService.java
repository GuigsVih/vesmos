package br.com.vesmos.Services.CreditCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Models.User;
import br.com.vesmos.Models.CreditCard;
import br.com.vesmos.Models.CreditCardBill;
import br.com.vesmos.Models.Release;
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
public class CreditCardBillService {
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
    public void calculateBill(ReleaseValidator data, User user) throws Exception {
        String type = data.getPayment().getType();
        Long creditCardId = data.getPayment().getId().get();

        if (type.equals("credit_cards")) {
            CreditCard creditCard = creditCardRepository.findByIdAndUserId(creditCardId, user.getId()).get();
            CalendarService calendarService = new CalendarService();
            calendarService.setCalendar(data.getPaymentDate(), creditCard.getClosure());
            try {
                CreditCardBill creditCardBill = verifyIfBillExists(calendarService, creditCard.getId(), user.getId());
                creditCardBillRepository.updateBillValue(creditCardBill.getId(), data.getValue(),
                        user.getId());
                creditCardRepository.updateLimitUsed(data.getValue() * -1, creditCard.getId(), user.getId());
            } catch (RegisterDoesNotExistsException e) {
                createBill(calendarService, data.getValue(), creditCard, user);
            }
        }
    }

    public void updateBill(Release release, Release oldRelease, User user) {
        if (release.getCreditCard() != null) {
            try {
                Boolean saved = updateBillIfChangedCreditCard(release, oldRelease, user);
                saved = !saved ? updateBillIfChangedPaymentDate(release, oldRelease, user) : saved;
                saved = !saved ? updateBillIfChangedValue(release, oldRelease, user) : saved;
                saved = !saved ? updateBillIfChangedPaymentMethod(release, oldRelease, user): saved;

            } catch (RegisterDoesNotExistsException e) {
                CalendarService calendarService = new CalendarService();
                calendarService.setCalendar(release.getPaymentDate(), release.getCreditCard().getClosure());

                createBill(calendarService, release.getValue(), release.getCreditCard(), user);
            }
        }

        if (release.getCreditCard() == null && oldRelease.getCreditCard() != null) {            
            CalendarService calendarService = new CalendarService();
            calendarService.setCalendar(oldRelease.getPaymentDate(), oldRelease.getCreditCard().getClosure());
            try {
                CreditCardBill creditCardBill = verifyIfBillExists(calendarService, oldRelease.getCreditCard().getId(), user.getId());
                creditCardBillRepository.updateBillValue(creditCardBill.getId(), oldRelease.getValue() * -1, user.getId());
                creditCardRepository.updateLimitUsed(oldRelease.getValue(), oldRelease.getCreditCard().getId(), user.getId());
            } catch (RegisterDoesNotExistsException e) {
                //do nothing
            }
        }
    }

    /**
     * Create a credit card bill
     * 
     * @param data
     * @param creditCard
     * @param user
     * 
     * @return void
     */
    public void createBill(CalendarService calendarService, Double value, CreditCard creditCard, User user) {
        CreditCardBill creditCardBill = new CreditCardBill();

        creditCardBill.setMonth(calendarService.getMonth())
                .setYear(calendarService.getYear())
                .setStatus(StatusEnum.UNPAID)
                .setValue(value)
                .setCreditCard(creditCard)
                .setUser(user);

        creditCardBillRepository.save(creditCardBill);
        creditCardRepository.updateLimitUsed(value * -1, creditCard.getId(), user.getId());
    }

    /**
     * Update credit card bill by payment data, if doesnt changed, return normal
     * bill, if changed
     * calculate new bill and remove charge from the old bill
     * 
     * @param release
     * @param oldRelease
     * @param userId
     * 
     * @return Boolean
     */
    public Boolean updateBillIfChangedPaymentDate(Release release, Release oldRelease, User user) throws RegisterDoesNotExistsException {
        if (!release.getPaymentDate().equals(oldRelease.getPaymentDate()) && oldRelease.getCreditCard() != null) {
            CalendarService calendarService = new CalendarService();
            calendarService.setCalendar(release.getPaymentDate(), release.getCreditCard().getClosure());

            CalendarService oldCalendarService = new CalendarService();
            oldCalendarService.setCalendar(oldRelease.getPaymentDate(), oldRelease.getCreditCard().getClosure());

            if ((calendarService.getMonth() != oldCalendarService.getMonth()) || (calendarService.getYear() != oldCalendarService.getMonth())) {
                CreditCardBill oldCreditCardBill = verifyIfBillExists(oldCalendarService, oldRelease.getCreditCard().getId(), user.getId());
                creditCardBillRepository.updateBillValue(oldCreditCardBill.getId(), oldRelease.getValue() * -1, user.getId());

                CreditCardBill creditCardBill = verifyIfBillExists(calendarService, release.getCreditCard().getId(), user.getId());
                creditCardBillRepository.updateBillValue(creditCardBill.getId(), release.getValue(), user.getId());

                if (release.getValue() != oldRelease.getValue()) {
                    creditCardRepository.updateLimitUsed((release.getValue() - oldRelease.getValue()) * -1, release.getCreditCard().getId(), user.getId());
                }

                return true;
            }
            return false;
        }
        return false;
    }

    public Boolean updateBillIfChangedValue(Release release, Release oldRelease, User user) throws RegisterDoesNotExistsException {
        if (release.getValue() != oldRelease.getValue()) {
            Double value = oldRelease.getCreditCard() != null ? release.getValue() - oldRelease.getValue()  : release.getValue();
            CalendarService calendarService = new CalendarService();
            calendarService.setCalendar(release.getPaymentDate(), release.getCreditCard().getClosure());

            CreditCardBill creditCardBill = verifyIfBillExists(calendarService, release.getCreditCard().getId(), user.getId());
            creditCardBillRepository.updateBillValue(creditCardBill.getId(), value, user.getId());
            creditCardRepository.updateLimitUsed(value * -1, release.getCreditCard().getId(), user.getId());

            return true;
        }

        return false;
    }

    public Boolean updateBillIfChangedCreditCard(Release release, Release oldRelease, User user) throws RegisterDoesNotExistsException {
        if (oldRelease.getCreditCard() != null && release.getCreditCard().getId() != oldRelease.getCreditCard().getId()) {
            CalendarService calendarService = new CalendarService();
            calendarService.setCalendar(release.getPaymentDate(), release.getCreditCard().getClosure());
            CalendarService oldCalendarService = new CalendarService();
            oldCalendarService.setCalendar(oldRelease.getPaymentDate(), oldRelease.getCreditCard().getClosure());

            CreditCardBill oldCreditCardBill = verifyIfBillExists(oldCalendarService, oldRelease.getCreditCard().getId(), user.getId());
            creditCardBillRepository.updateBillValue(oldCreditCardBill.getId(), oldRelease.getValue() * -1, user.getId());
            creditCardRepository.updateLimitUsed(oldRelease.getValue(), oldRelease.getCreditCard().getId(), user.getId());
            
            CreditCardBill creditCardBill = verifyIfBillExists(calendarService, release.getCreditCard().getId(), user.getId());
            creditCardBillRepository.updateBillValue(creditCardBill.getId(), release.getValue(), user.getId());            
            creditCardRepository.updateLimitUsed(release.getValue() * -1, release.getCreditCard().getId(), user.getId());

            return true;
        }
        return false;
    }

    public Boolean updateBillIfChangedPaymentMethod(Release release, Release oldRelease, User user) throws RegisterDoesNotExistsException {
        if (oldRelease.getCreditCard() == null) {
            CalendarService calendarService = new CalendarService();
            calendarService.setCalendar(release.getPaymentDate(), release.getCreditCard().getClosure());

            CreditCardBill creditCardBill = verifyIfBillExists(calendarService, release.getCreditCard().getId(), user.getId());
            creditCardBillRepository.updateBillValue(creditCardBill.getId(), release.getValue(), user.getId());
            creditCardRepository.updateLimitUsed(release.getValue() * -1, release.getCreditCard().getId(), user.getId());

            return true;
        }

        return false;
    }

    /**
     * Verify if a credit card bill exists by month, year, id and userId, if dont,
     * throw a exception
     * 
     * @param Calendar calendar
     * @param Long     creditCardId
     * @param Long     userId
     * 
     * @throws RegisterDoesNotExistsException
     * 
     * @return CreditCardBill
     */
    public CreditCardBill verifyIfBillExists(CalendarService calendarService, Long creditCardId, Long userId)
            throws RegisterDoesNotExistsException {
        return creditCardBillRepository
                .findBill(calendarService.getMonth(), calendarService.getYear(), creditCardId, userId)
                .orElseThrow(() -> new RegisterDoesNotExistsException("Fatura não encontrada"));
    }

}
