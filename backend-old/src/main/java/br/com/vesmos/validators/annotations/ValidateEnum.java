package br.com.vesmos.validators.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = EnumValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER, ElementType.CONSTRUCTOR })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidateEnum {

  String message() default "O valor é inválido.";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};

  Class<? extends Enum<?>> enumClass();

}