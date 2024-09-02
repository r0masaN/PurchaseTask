package purchasetask.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import purchasetask.backend.model.CustomerDTO;
import purchasetask.backend.service.CustomerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {
    private final CustomerService service;

    @Autowired
    public CustomerController(final CustomerService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<CustomerDTO> findAll() {
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CustomerDTO> findById(@PathVariable final Integer id) {
        return this.service.findById(id);
    }

    @GetMapping("/filter-and-sort/{type}/{sortBy}/{ascending}")
    public List<CustomerDTO> filterAndSort(@PathVariable final String type, @PathVariable final String sortBy, @PathVariable final boolean ascending) {
        return this.service.filterAndSort(type, sortBy, ascending);
    }

    @PostMapping("/save")
    public void save(@RequestBody final CustomerDTO customerDTO) {
        this.service.save(customerDTO);
    }

    @PostMapping("/update")
    public void update(@RequestBody final CustomerDTO customerDTO) {
        this.service.update(customerDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable final Integer id) {
        this.service.deleteById(id);
    }
}