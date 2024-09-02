package purchasetask.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import purchasetask.backend.jooq.generated.tables.records.LotRecord;
import purchasetask.backend.model.LotDTO;
import purchasetask.backend.model.converter.LotConverter;
import purchasetask.backend.repository.LotRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LotService {
    private final LotRepository repository;

    @Autowired
    public LotService(final LotRepository repository) {
        this.repository = repository;
    }

    public List<LotDTO> findAll() {
        final List<LotRecord> lotRecords = this.repository.findAll();
        return lotRecords.stream().map(LotConverter::toLotDTO).toList();
    }

    public Optional<LotDTO> findById(final Integer id) {
        final Optional<LotRecord> optional = this.repository.findById(id);
        return optional.map(LotConverter::toLotDTO);
    }

    public List<LotDTO> filterAndSort(final String currencyCode, final String ndsRate, final String sortBy, final boolean ascending) {
        final List<LotRecord> lotDTOs = this.repository.filterAndSort(currencyCode, ndsRate, sortBy, ascending);
        return lotDTOs.stream().map(LotConverter::toLotDTO).toList();
    }

    public List<LotDTO> findByCustomerCode(final String customerCode) {
        final List<LotRecord> lotDTOs = this.repository.findByCustomerCode(customerCode);
        return lotDTOs.stream().map(LotConverter::toLotDTO).toList();
    }

    public List<LotDTO> findByCurrency(final String currencyCode) {
        final List<LotRecord> lotDTOs = this.repository.findByCurrency(currencyCode);
        return lotDTOs.stream().map(LotConverter::toLotDTO).toList();
    }

    public List<LotDTO> findByNdsRate(final String ndsRate) {
        final List<LotRecord> lotDTOs = this.repository.findByNdsRate(ndsRate);
        return lotDTOs.stream().map(LotConverter::toLotDTO).toList();
    }

    public List<LotDTO> findSorted(final String sortBy, final boolean ascending) {
        final List<LotRecord> lotDTOs = this.repository.findSorted(sortBy, ascending);
        return lotDTOs.stream().map(LotConverter::toLotDTO).toList();
    }

    public void save(final LotDTO lotDTO) {
        final LotRecord lotRecord = LotConverter.toLotRecord(lotDTO, false);
        this.repository.save(lotRecord);
    }

    public void update(final LotDTO lotDTO) {
        final LotRecord lotRecord = LotConverter.toLotRecord(lotDTO, true);
        this.repository.update(lotRecord);
    }

    public void deleteById(final Integer id) {
        this.repository.deleteById(id);
    }
}