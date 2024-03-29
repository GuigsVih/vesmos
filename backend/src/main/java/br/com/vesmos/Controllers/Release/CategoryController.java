package br.com.vesmos.Controllers.Release;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Models.User;
import br.com.vesmos.TransferObjects.BaseMessageDTO;
import br.com.vesmos.Services.Category.CategoryService;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.TransferObjects.Interfaces.CategoryDTO;

/**
 * Balance controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/category")
public class CategoryController 
{
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthenticationService authService;

    /**
     * Get categories, filtering by logged userId and without userId
     * 
     * @return ResponseEntity
     */
    @GetMapping
    public ResponseEntity<?> getCategories()
    {
        try {
            User user = authService.getAuthenticatedUser();
            List<CategoryDTO> categories = categoryService.findByUserIdOrNull(user.getId());

            return ResponseEntity.ok().body(categories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BaseMessageDTO(e.getMessage()));
        }
    }

    /**
     * Get category by id
     * 
     * @return ResponseEntity
     */
    @GetMapping("/{id}")
    public @ResponseBody CategoryDTO findSelectedCategory(@PathVariable("id") Long id)
    {
        return categoryService.findSelectedCategory(id);
    }
}
