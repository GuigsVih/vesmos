package br.com.vesmos.Services.CreditCard;

import java.util.Calendar;
import java.util.Date;

/**
 * Calendar service to get current credit card bill
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class CalendarService {

    private Integer day;
    private Integer month;
    private Integer year;

    public Calendar setCalendar(Date paymentDate, Integer closure) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(paymentDate);

        setDay(calendar.get(Calendar.DAY_OF_MONTH));
        setMonth(calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), closure);
        setYear(calendar.get(Calendar.YEAR));

        return calendar;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month, Integer day, Integer closure) {
        month = day >= closure ? month + 2 : month + 1;

        if (month > 12) {
            month = 1;
            setYear(getYear() + 1);
        }

        this.month = month;
    }

    public Integer getYear() {
        return this.year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
