package br.com.vesmos.validators.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.vesmos.entity.User;

/**
 * Create Account Validator
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
public class CreateAccountValidator {
	@NotNull
	@Length(max = 255)
	private String name;

	@NotNull
	@Email
	@Length(max = 255)
	private String email;

	@NotNull
	@Length(max = 255)
	private String password;

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return new BCryptPasswordEncoder().encode(password);
	}

	public User convert() {
		User user = new User();
		user.setName(getName());
		user.setEmail(getEmail());
		user.setPassword(getPassword());
		user.setActive(true);

		return user;
	}
}
