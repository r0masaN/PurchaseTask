package purchasetask.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import purchasetask.backend.model.LotDTO;
import purchasetask.backend.service.LotService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lot")
@CrossOrigin(origins = "http://localhost:5173")
public class LotController {
    private final LotService service;

    @Autowired
    public LotController(final LotService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<LotDTO> findAll() {
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<LotDTO> findById(@PathVariable final Integer id) {
        return this.service.findById(id);
    }

    @GetMapping("/filter-and-sort/{currencyFilter}/{ndsFilter}/{sortBy}/{ascending}")
    public List<LotDTO> filterAndSort(@PathVariable final String currencyFilter, @PathVariable final String ndsFilter,
                                      @PathVariable final String sortBy, @PathVariable final boolean ascending) {
        return this.service.filterAndSort(currencyFilter, ndsFilter, sortBy, ascending);
    }

    @PostMapping("/save")
    public void save(@RequestBody final LotDTO lotDTO) {
        this.service.save(lotDTO);
    }

    @PostMapping("/update")
    public void update(@RequestBody final LotDTO lotDTO) {
        this.service.update(lotDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable final Integer id) {
        this.service.deleteById(id);
    }
}