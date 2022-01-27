package br.com.vesmos.Models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Creadit card model
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity
@Table(name="credit_cards")
public class CreditCard 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;
    
    @Column(name="credit_limit", nullable=false, precision=10, scale=2)
    private double creditLimit;

    @Column(name="limit_used", nullable=false, precision=10, scale=2)
    private double limitUsed;

    @Column(name="closure", nullable=false)
    private int closure;

    @Column(name="due_date", nullable=false)
    private int dueDate;
    
    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name="created_at")
    @Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
    private Date createdAt;

    @Column(name="updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    public Long getId()
    {
        return id;
    }

    public CreditCard setName(String name)
    {
        this.name = name;
        return this;
    }

    public String getName()
    {
        return name;
    }

    public CreditCard setCreditLimit(double creditLimit)
    {
        this.creditLimit = creditLimit;
        return this;
    }

    public double getCreditLimit()
    {
        return creditLimit;
    }

    public CreditCard setLimitUsed(double limitUsed)
    {
        this.limitUsed = limitUsed;
        return this;
    }

    public double getLimitUsed()
    {
        return limitUsed;
    }

    public CreditCard setClosure(int closure)
    {
        this.closure = closure;
        return this;
    }

    public int getClosure()
    {
        return closure;
    }

    public CreditCard setDueDate(int dueDate)
    {
        this.dueDate = dueDate;
        return this;
    }

    public int getDueDate()
    {
        return dueDate;
    }

    public CreditCard setAccount(Account account)
    {
        this.account = account;
        return this;
    }

    public Account getAccount()
    {
        return account;
    }

    public CreditCard setUser(User user)
    {
        this.user = user;
        return this;
    }

    public User getUser()
    {
        return user;
    }
}
