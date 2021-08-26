package br.com.vesmos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.vesmos.Models.Bank;

public interface BankRepository extends JpaRepository<Bank, Integer>
{   
}
