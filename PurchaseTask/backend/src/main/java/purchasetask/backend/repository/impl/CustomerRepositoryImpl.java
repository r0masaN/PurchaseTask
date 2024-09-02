package purchasetask.backend.repository.impl;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import purchasetask.backend.jooq.generated.tables.Customer;
import purchasetask.backend.jooq.generated.tables.records.CustomerRecord;
import purchasetask.backend.repository.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class CustomerRepositoryImpl implements CustomerRepository {
    private final DSLContext dsl;

    @Autowired
    public CustomerRepositoryImpl(final DSLContext dsl) {
        this.dsl = dsl;
    }

    @Override
    public List<CustomerRecord> findAll() {
        return dsl.selectFrom(Customer.CUSTOMER)
                .fetch();
    }

    @Override
    public Optional<CustomerRecord> findById(final Integer id) {
        final CustomerRecord record = dsl.selectFrom(Customer.CUSTOMER)
                .where(Customer.CUSTOMER.ID.eq(id))
                .fetchOne();

        return Optional.ofNullable(record);
    }

    @Override
    public List<CustomerRecord> filterAndSort(final String type, final String sortBy, final boolean ascending) {
        final Field<?> field = switch (sortBy) {
            case "customerCode" -> Customer.CUSTOMER.CUSTOMER_CODE;
            case "customerName" -> Customer.CUSTOMER.CUSTOMER_NAME;
            case "customerInn" -> Customer.CUSTOMER.CUSTOMER_INN;
            case "customerKpp" -> Customer.CUSTOMER.CUSTOMER_KPP;
            case "customerLegalAddress" -> Customer.CUSTOMER.CUSTOMER_LEGAL_ADDRESS;
            case "customerPostalAddress" -> Customer.CUSTOMER.CUSTOMER_POSTAL_ADDRESS;
            case "customerEmail" -> Customer.CUSTOMER.CUSTOMER_EMAIL;
            default -> Customer.CUSTOMER.ID;
        };

        return switch (type) {
            case "orgs" -> dsl.selectFrom(Customer.CUSTOMER)
                    .where(Customer.CUSTOMER.IS_ORGANIZATION.eq(true))
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
            case "persons" -> dsl.selectFrom(Customer.CUSTOMER)
                    .where(Customer.CUSTOMER.IS_PERSON.eq(true))
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
            default -> dsl.selectFrom(Customer.CUSTOMER)
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
        };
    }

    @Override
    public List<CustomerRecord> findByOrganization(final boolean isOrganization) {
        return dsl.selectFrom(Customer.CUSTOMER)
                .where(Customer.CUSTOMER.IS_ORGANIZATION.eq(isOrganization))
                .fetch();
    }

    @Override
    public List<CustomerRecord> findByPerson(final boolean isPerson) {
        return dsl.selectFrom(Customer.CUSTOMER)
                .where(Customer.CUSTOMER.IS_PERSON.eq(isPerson))
                .fetch();
    }

    @Override
    public List<CustomerRecord> findSorted(final String sortBy, final boolean ascending) {
        final Field<?> field = switch (sortBy) {
            case "customerCode" -> Customer.CUSTOMER.CUSTOMER_CODE;
            case "customerName" -> Customer.CUSTOMER.CUSTOMER_NAME;
            case "customerInn" -> Customer.CUSTOMER.CUSTOMER_INN;
            case "customerKpp" -> Customer.CUSTOMER.CUSTOMER_KPP;
            case "customerLegalAddress" -> Customer.CUSTOMER.CUSTOMER_LEGAL_ADDRESS;
            case "customerPostalAddress" -> Customer.CUSTOMER.CUSTOMER_POSTAL_ADDRESS;
            case "customerEmail" -> Customer.CUSTOMER.CUSTOMER_EMAIL;
            default -> Customer.CUSTOMER.ID;
        };

        return dsl.selectFrom(Customer.CUSTOMER)
                .orderBy(ascending ? field.asc() : field.desc())
                .fetch();
    }

    @Transactional
    @Override
    public void save(final CustomerRecord customerRecord) {
        dsl.insertInto(Customer.CUSTOMER)
                .set(customerRecord)
                .execute();
    }

    @Transactional
    @Override
    public void update(final CustomerRecord customerRecord) {
        dsl.update(Customer.CUSTOMER)
                .set(customerRecord)
                .where(Customer.CUSTOMER.ID.eq(customerRecord.getId()))
                .execute();
    }

    @Transactional
    @Override
    public void deleteById(final Integer id) {
        dsl.deleteFrom(Customer.CUSTOMER)
                .where(Customer.CUSTOMER.ID.eq(id))
                .execute();
    }
}