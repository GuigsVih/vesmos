package br.com.vesmos.services.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.vesmos.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

	@Value("${jwt.expiration}")
	private String expiration;

	@Value("${jwt.secret}")
	private String signature;

	public String generate(Authentication auth) {
		User user = (User) auth.getPrincipal();
		return Jwts.builder()
			.setIssuer("Vesmos")
			.setSubject(user.getId().toString())
			.setIssuedAt(new Date())
			.setExpiration(new Date(new Date().getTime() + Long.parseLong(expiration)))
			.signWith(SignatureAlgorithm.HS256, signature)
			.compact();
	}

	/**
	 * Returns if auth token bearer is valid
	 *
	 * @return boolean
	 */
	public boolean isValid(String token) {
		try {
			Jwts.parser()
				.setSigningKey(this.signature)
				.parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public Long getUserId(String token) {
		Claims claims = Jwts.parser()
			.setSigningKey(this.signature)
			.parseClaimsJws(token)
			.getBody();

		return Long.parseLong(claims.getSubject());
	}
}