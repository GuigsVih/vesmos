package br.com.vesmos.entity;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import br.com.vesmos.enums.StatusEnum;

/**
 * Credit card bill model
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity
@Table(name = "credit_card_bills")
public class CreditCardBill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "value", nullable = false, precision = 10, scale = 2)
	private Double value;

	@Column(name = "month", nullable = false, length = 2)
	private int month;

	@Column(name = "year", nullable = false, length = 4)
	private int year;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusEnum status;

	@ManyToOne
	@JoinColumn(name = "credit_card_id")
	private CreditCard creditCard;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;

	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	public Long getId() {
		return id;
	}

	public Double getValue() {
		return value;
	}

	public CreditCardBill setValue(Double value) {
		this.value = value;
		return this;
	}

	public String getStatus() {
		return status.name();
	}

	public CreditCardBill setStatus(StatusEnum status) {
		this.status = status;
		return this;
	}

	public Integer getMonth() {
		return month;
	}

	public CreditCardBill setMonth(Integer month) {
		this.month = month;
		return this;
	}

	public Integer getYear() {
		return year;
	}

	public CreditCardBill setYear(Integer year) {
		this.year = year;
		return this;
	}

	public CreditCardBill setCreditCard(CreditCard creditCard) {
		this.creditCard = creditCard;
		return this;
	}

	public CreditCard getCreditCard() {
		return creditCard;
	}

	public CreditCardBill setUser(User user) {
		this.user = user;
		return this;
	}

	public User getUser() {
		return user;
	}
}
