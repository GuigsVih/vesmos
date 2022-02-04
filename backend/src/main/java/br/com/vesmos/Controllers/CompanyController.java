package br.com.vesmos.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Models.Company;
import br.com.vesmos.Repositories.CompanyRepository;

/**
 * Company Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/company")
public class CompanyController 
{
    @Autowired
    private CompanyRepository companyRepository;
    /**
     * Get companies
     * 
     * @return ResponseEntity
     */
    @GetMapping
    public ResponseEntity<?> get()
    {
        List<Company> companies = companyRepository.findAll();

        return ResponseEntity.ok().body(companies);
    }
}
