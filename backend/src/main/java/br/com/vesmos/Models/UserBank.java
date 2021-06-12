package br.com.vesmos.Models;

import java.io.Serializable;
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
 * User banks model
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity(name="user_banks")
@Table(name="user_banks", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "bank_id"})})
public class UserBank implements Serializable
{
    public enum TypeEnum {
        CURRENT,
        SAVINGS
    };

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    @Column(nullable=false)
    private String nickname;
    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private TypeEnum type;
    
    @ManyToOne
    @JoinColumn(name="bank_id", referencedColumnName = "id")
    private Bank bank;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @Column(name="created_at")
    @Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
    private Date createdAt;

    @Column(name="updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
}
