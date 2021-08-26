package br.com.vesmos.Services.Category;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.Category;
import br.com.vesmos.Repositories.CategoryRepository;

/**
 * Category service
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class CategoryService 
{
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Get category by id and user id
     * 
     * @param Optional<Integer> id
     * @param Integer           userId
     * 
     * @return Category
     */
    public Category findByIdAndUserId(Optional<Integer> id) throws RegisterDoesNotExistsException
    {
        if (id.isPresent()) {
            return categoryRepository.findById(id.get())
                .orElseThrow(() -> new RegisterDoesNotExistsException("Categoria inválida."));
        }
        return null;
    }
}
