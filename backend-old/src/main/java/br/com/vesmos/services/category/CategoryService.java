package br.com.vesmos.services.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.entity.Category;
import br.com.vesmos.entity.User;
import br.com.vesmos.repositories.CategoryRepository;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.dto.Interfaces.CategoryDTO;

/**
 * Category service
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private AuthenticationService authService;

	/**
	 * Get category by id and user id
	 *
	 * @param Long id
	 * @param Long userId
	 * @return Category
	 */
	public Category findByIdAndUserId(Long id) throws RegisterDoesNotExistsException {
		User user = authService.getAuthenticatedUser();
		return categoryRepository.findByIdAndUserId(id, user.getId())
			.orElseThrow(() -> new RegisterDoesNotExistsException("Categoria não encontrada."));
	}

	public List<CategoryDTO> findByUserIdOrNull(Long userId) {
		return categoryRepository.findByUserIdOrNull(userId);
	}

	public CategoryDTO findSelectedCategory(Long id) {
		User user = authService.getAuthenticatedUser();
		return categoryRepository.findSelectedCategory(id, user.getId());
	}
}
