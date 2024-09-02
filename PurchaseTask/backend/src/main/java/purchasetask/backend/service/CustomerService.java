package purchasetask.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import purchasetask.backend.jooq.generated.tables.records.CustomerRecord;
import purchasetask.backend.model.CustomerDTO;
import purchasetask.backend.model.converter.CustomerConverter;
import purchasetask.backend.repository.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository repository;

    @Autowired
    public CustomerService(final CustomerRepository repository) {
        this.repository = repository;
    }

    public List<CustomerDTO> findAll() {
        final List<CustomerRecord> customerRecords = this.repository.findAll();
        return customerRecords.stream().map(CustomerConverter::toCustomerDTO).toList();
    }

    public Optional<CustomerDTO> findById(final Integer id) {
        final Optional<CustomerRecord> optional = this.repository.findById(id);
        return optional.map(CustomerConverter::toCustomerDTO);
    }

    public List<CustomerDTO> filterAndSort(final String type, final String sortBy, final boolean ascending) {
        final List<CustomerRecord> customerRecords = this.repository.filterAndSort(type, sortBy, ascending);
        return customerRecords.stream().map(CustomerConverter::toCustomerDTO).toList();
    }

    public List<CustomerDTO> findByOrganization(final boolean isOrganization) {
        final List<CustomerRecord> customerRecords = this.repository.findByOrganization(isOrganization);
        return customerRecords.stream().map(CustomerConverter::toCustomerDTO).toList();
    }

    public List<CustomerDTO> findByPerson(final boolean isPerson) {
        final List<CustomerRecord> customerRecords = this.repository.findByPerson(isPerson);
        return customerRecords.stream().map(CustomerConverter::toCustomerDTO).toList();
    }

    public List<CustomerDTO> findSorted(final String sortBy, final boolean ascending) {
        final List<CustomerRecord> customerRecords = this.repository.findSorted(sortBy, ascending);
        return customerRecords.stream().map(CustomerConverter::toCustomerDTO).toList();
    }

    public void save(final CustomerDTO customerDTO) {
        final CustomerRecord customerRecord = CustomerConverter.toCustomerRecord(customerDTO, false);
        this.repository.save(customerRecord);
    }

    public void update(final CustomerDTO customerDTO) {
        final CustomerRecord customerRecord = CustomerConverter.toCustomerRecord(customerDTO, true);
        this.repository.update(customerRecord);
    }

    public void deleteById(final Integer id) {
        this.repository.deleteById(id);
    }
}