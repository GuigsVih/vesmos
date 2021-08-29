package br.com.vesmos.Services.Release;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vesmos.Enum.StatusEnum;
import br.com.vesmos.Enum.TypeEnum;
import br.com.vesmos.Exceptions.RegisterDoesNotExistsException;
import br.com.vesmos.Models.Release;
import br.com.vesmos.Models.User;
import br.com.vesmos.Repositories.ReleaseRepository;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.TransferObjects.Interfaces.ListReleaseDTO;

@Service
public class ReleaseService
{
    @Autowired
    private ReleaseRepository releaseRepository;

    @Autowired
    private AuthenticationService authService;

    public List<ListReleaseDTO> findAllByUser()
    {   
        User user = authService.getAuthenticatedUser();
        return releaseRepository.findAllByUserId(user.getId());
    }

    public Release findByIdAndUserId(Long id) throws RegisterDoesNotExistsException
    {
        User user = authService.getAuthenticatedUser();
        return releaseRepository.findByIdAndUserId(id, user.getId())
            .orElseThrow(() -> new RegisterDoesNotExistsException("Lançamento não encontrado."));
    }

    public void update(Long id, Release data) throws RegisterDoesNotExistsException
    {
        Release release = findByIdAndUserId(id);
        release.setDescription(data.getDescription())
            .setStatus(StatusEnum.valueOf(data.getStatus()))
            .setType(TypeEnum.valueOf(data.getType()))
            .setValue(data.getValue())
            .setCreditCard(data.getCreditCard())
            .setBank(data.getBank())
            .setCategory(data.getCategory());

        releaseRepository.save(release);
    }

    public void delete(Long id)
    {
        User user = authService.getAuthenticatedUser();
        releaseRepository.deleteByIdAndUserId(id, user.getId());    
    }
}
