package br.com.vesmos.entity;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import br.com.vesmos.enums.AccountTypeEnum;

/**
 * User accounts
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity
@Table(name = "accounts")
public class Account implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nickname;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private AccountTypeEnum type;

	@Column(nullable = false, precision = 10, scale = 2)
	private double balance;

	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id")
	private Company company;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;

	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	public Account setNickname(String nickname) {
		this.nickname = nickname;
		return this;
	}

	public Account setType(AccountTypeEnum type) {
		this.type = type;
		return this;
	}

	public Account setBalance(double balance) {
		this.balance = balance;
		return this;
	}

	public Account setCompany(Company company) {
		this.company = company;
		return this;
	}

	public Account setUser(User user) {
		this.user = user;
		return this;
	}

	public Long getId() {
		return id;
	}

	public String getNickname() {
		return nickname;
	}
}
