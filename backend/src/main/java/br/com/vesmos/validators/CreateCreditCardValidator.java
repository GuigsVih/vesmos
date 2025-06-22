package br.com.vesmos.validators;

import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

/**
 * Create credit card validator
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class CreateCreditCardValidator {

	@NotNull
	@Length(max = 255)
	private String name;

	@NotNull
	private double creditLimit;

	@NotNull
	private int closure;

	@NotNull
	private int dueDate;

	@NotNull
	private Optional<Long> accountId;

	public String getName() {
		return name;
	}

	public double getCreditLimit() {
		return creditLimit;
	}

	public int getClosure() {
		return closure;
	}

	public int getDueDate() {
		return dueDate;
	}

	public Optional<Long> getAccountId() {
		return accountId;
	}
}
