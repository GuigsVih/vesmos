package br.com.vesmos.Services.Release;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

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
import br.com.vesmos.Validators.Release.ReleaseValidator;

@Service
public class ReleaseService {
    @Autowired
    private ReleaseRepository releaseRepository;

    @Autowired
    private ReleaseConvertService convertService;

    @Autowired
    private AuthenticationService authService;

    final String DEFAULT_VALUE = "normal";
    final String PARCELED = "parceled";
    final String FIXED = "fixed";

    public List<ListReleaseDTO> findAllByUser(String initalDate, String finalDate) 
    {
        User user = authService.getAuthenticatedUser();
        return releaseRepository.findAllByUserId(user.getId(), initalDate, finalDate);
    }

    public Release findByIdAndUserId(Long id) throws RegisterDoesNotExistsException 
    {
        User user = authService.getAuthenticatedUser();
        return releaseRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RegisterDoesNotExistsException("Lançamento não encontrado."));
    }

    public void create(ReleaseValidator data) throws RegisterDoesNotExistsException 
    {
        switch (Optional.ofNullable(data.getRepeatCharge().getOption()).orElse(DEFAULT_VALUE)) {
            case PARCELED:
                createParceled(data);
                break;
            case FIXED:
                createFixed(data);
                break;
            default:
                releaseRepository.save(convertService.convert(data));
                break;
        }
    }

    public void createParceled(ReleaseValidator data) throws RegisterDoesNotExistsException 
    {
        Calendar calendar = Calendar.getInstance();
        Integer time = data.getRepeatCharge().getTime();

        for (Integer i = 0; i < time; i++) {
            Release release = convertService.convert(data);
            calendar.setTime(data.getPaymentDate());
            calendar.add(Calendar.MONTH, i);
            release.setPaymentDate(calendar.getTime());
            release.setDescription(data.getDescription() + " " + (i + 1) + "/" + time);
            release.setValue(new BigDecimal(data.getValue() / time).setScale(2, RoundingMode.HALF_EVEN).doubleValue());
            releaseRepository.save(release);
        }
    }

    public void createFixed(ReleaseValidator data) 
    {
        //
    }

    public void update(Long id, Release data) throws RegisterDoesNotExistsException 
    {
        Release release = findByIdAndUserId(id);
        release.setDescription(data.getDescription())
                .setStatus(StatusEnum.valueOf(data.getStatus()))
                .setType(TypeEnum.valueOf(data.getType()))
                .setValue(data.getValue())
                .setCreditCard(data.getCreditCard())
                .setAccount(data.getAccount())
                .setCategory(data.getCategory());

        releaseRepository.save(release);
    }

    public void delete(Long id) 
    {
        User user = authService.getAuthenticatedUser();
        releaseRepository.deleteByIdAndUserId(id, user.getId());
    }
}
