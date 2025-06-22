package br.com.vesmos.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.vesmos.entity.User;
import br.com.vesmos.services.auth.AuthenticationService;
import br.com.vesmos.services.payment.PaymentService;
import br.com.vesmos.dto.Interfaces.payment.PaymentDTO;

/**
 * Payment Controller
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@RestController
@RequestMapping("/payment")
public class PaymentController {
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
    public @ResponseBody Map<String, List<PaymentDTO>> get() {
        User user = authService.getAuthenticatedUser();
        List<PaymentDTO> payments = paymentService.findByUserId(user.getId());
        LinkedHashMap<String, List<PaymentDTO>> groupedByType = payments.stream()
                .collect(Collectors.groupingBy(item -> item.getType(), LinkedHashMap::new, Collectors.toList()));

        return groupedByType;
    }

    /**
     * Get payment by id
     * 
     * @return ResponseEntity
     */
    @GetMapping("/{type}/{id}")
    public @ResponseBody PaymentDTO getById(@PathVariable("type") String type, @PathVariable("id") Long id) {
        User user = authService.getAuthenticatedUser();
        PaymentDTO payment = paymentService.findByTypeAndId(id, type, user.getId());

        return payment;
    }
}
