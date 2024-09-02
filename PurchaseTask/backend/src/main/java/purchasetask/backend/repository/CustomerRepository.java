package purchasetask.backend.repository;

import purchasetask.backend.jooq.generated.tables.records.CustomerRecord;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository {
    List<CustomerRecord> findAll();

    Optional<CustomerRecord> findById(final Integer id);

    List<CustomerRecord> filterAndSort(final String type, final String sortBy, final boolean ascending);

    List<CustomerRecord> findByOrganization(final boolean isOrganization);

    List<CustomerRecord> findByPerson(final boolean isPerson);

    List<CustomerRecord> findSorted(final String sortBy, final boolean ascending);

    void save(final CustomerRecord customerRecord);

    void update(final CustomerRecord customerRecord);

    void deleteById(final Integer id);
}