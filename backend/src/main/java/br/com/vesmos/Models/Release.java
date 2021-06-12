package br.com.vesmos.Models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

/**
 * Release model
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity(name="releases")
@Table(name="releases", uniqueConstraints = {@UniqueConstraint(columnNames = {"bank_id", "credit_card_id"})})
public class Release 
{
    public enum StatusEnum {
        PAID_OUT,
        PAYING,
        UNPAID
    };

    public enum TypeEnum {
        EXPENSE,
        REVENUE,
        TRANSFER
    };
    
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

    @ManyToOne
    @JoinColumn(name="bank_id")
    private Bank bank;

    @ManyToOne
    @JoinColumn(name="credit_card_id")
    private CreditCard creaditCard;
    
    @Column(name="created_at")
    @Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
    private Date createdAt;

    @Column(name="updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
}