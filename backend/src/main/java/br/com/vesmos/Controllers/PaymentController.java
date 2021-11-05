package br.com.vesmos.Controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.Models.User;
import br.com.vesmos.Services.Auth.AuthenticationService;
import br.com.vesmos.Services.Payment.PaymentService;
import br.com.vesmos.TransferObjects.Interfaces.ListPaymentMethodDTO;

/**
 * Payment Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/payment")
public class PaymentController 
{
    @Autowired
    AuthenticationService authService;

    @Autowired
    PaymentService paymentService;

    /**
     * Get payment methods by logged user
     * 
     * @return ResponseEntity
     */
    @GetMapping
    public @ResponseBody Map<String, List<ListPaymentMethodDTO>> get()
    {
        User user = authService.getAuthenticatedUser();
        List<ListPaymentMethodDTO> payments = paymentService.findByUserId(user.getId());
        LinkedHashMap<String, List<ListPaymentMethodDTO>> groupedByType = payments.stream()
                .collect(Collectors.groupingBy(item -> item.getType(), LinkedHashMap::new, Collectors.toList()));

        return groupedByType;
    }
}
