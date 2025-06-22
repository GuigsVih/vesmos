package br.com.vesmos.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Company model
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity
@Table(name = "companies")
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String picture;

	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;

	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@OneToMany(mappedBy = "company")
	private List<Account> account;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getPicture() {
		return picture;
	}
}
