package purchasetask.backend.repository;

import purchasetask.backend.jooq.generated.tables.records.LotRecord;

import java.util.List;
import java.util.Optional;

public interface LotRepository {
    List<LotRecord> findAll();

    Optional<LotRecord> findById(final Integer id);

    List<LotRecord> filterAndSort(final String currencyCode, final String ndsRate, final String sortBy, final boolean ascending);

    List<LotRecord> findByCustomerCode(final String customerCode);

    List<LotRecord> findByCurrency(final String currencyCode);

    List<LotRecord> findByNdsRate(final String ndsRate);

    List<LotRecord> findSorted(final String sortBy, final boolean ascending);

    void save(final LotRecord lotRecord);

    void update(final LotRecord lotRecord);

    void deleteById(final Integer id);
}