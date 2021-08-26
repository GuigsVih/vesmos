package br.com.vesmos.Models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Enum.TypeEnum;

/**
 * Release model
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity(name="releases")
@Table(name="releases", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "category_id", "bank_id", "credit_card_id"})})
public class Release 
{    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    @Column(nullable=false)
    private String description;
    @Column(nullable=false, precision=10, scale=2)
    private double value;

    @Column(nullable=false)
    @Enumerated(EnumType.STRING)
    private StatusEnum status;
    
    @Column(nullable=false)
    @Enumerated(EnumType.STRING)
    private TypeEnum type;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="bank_id")
    private Bank bank;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="credit_card_id")
    private CreditCard creditCard;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;
    
    @Column(name="created_at")
    @Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
    private Date createdAt;

    @Column(name="updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    
    public Integer getId()
    {
        return id;
    }

    public String getDescription()
    {
        return description;
    }

    public Release setDescription(String description)
    {
        this.description = description;
        return this;
    }

    public String getStatus()
    {
        return status.name();
    }

    public Release setStatus(StatusEnum status)
    {
        this.status = status;
        return this;
    }

    public String getType()
    {
        return type.name();
    }

    public Release setType(TypeEnum type)
    {
        this.type = type;
        return this;
    }
    public Double getValue()
    {
        return value;
    }

    public Release setValue(Double value)
    {
        this.value = value;
        return this;
    }

    public Bank getBank()
    {
        return bank;
    }

    public Release setBank(Bank bank)
    {
        this.bank = bank;
        return this;
    }
    public CreditCard getCreditCard()
    {
        return creditCard;
    }

    public Release setCreditCard(CreditCard creditCard)
    {
        this.creditCard = creditCard;
        return this;
    }
    public Category getCategory()
    {
        return category;
    }

    public Release setCategory(Category category)
    {
        this.category = category;
        return this;
    }
    
    public Release setUser(User user)
    {
        this.user = user;
        return this;
    }

}