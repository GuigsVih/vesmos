package br.com.vesmos.validators.release;

import java.util.Optional;

import javax.validation.constraints.NotNull;

/**
 * Payment validator
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class PaymentValidator {
	@NotNull
	private Optional<Long> id;

	@NotNull
	private String type;

	public Optional<Long> getId() {
		return id;
	}

	public String getType() {
		return type;
	}
}
