package purchasetask.backend.model.converter;

import purchasetask.backend.jooq.generated.tables.records.CustomerRecord;
import purchasetask.backend.model.CustomerDTO;

public class CustomerConverter {
    public static CustomerRecord toCustomerRecord(final CustomerDTO customerDTO, final boolean isSetId) {
        final CustomerRecord customerRecord = new CustomerRecord();
        if (isSetId) customerRecord.setId(customerDTO.getId());
        customerRecord.setCustomerCode(customerDTO.getCustomerCode());
        customerRecord.setCustomerName(customerDTO.getCustomerName());
        customerRecord.setCustomerInn(customerDTO.getCustomerInn());
        customerRecord.setCustomerKpp(customerDTO.getCustomerKpp());
        customerRecord.setCustomerLegalAddress(customerDTO.getCustomerLegalAddress());
        customerRecord.setCustomerPostalAddress(customerDTO.getCustomerPostalAddress());
        customerRecord.setCustomerEmail(customerDTO.getCustomerEmail());
        customerRecord.setCustomerCodeMain(customerDTO.getCustomerCodeMain());
        customerRecord.setIsOrganization(customerDTO.getIsOrganization());
        customerRecord.setIsPerson(customerDTO.getIsPerson());
        return customerRecord;
    }

    public static CustomerDTO toCustomerDTO(final CustomerRecord customerRecord) {
        final CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(customerRecord.getId());
        customerDTO.setCustomerCode(customerRecord.getCustomerCode());
        customerDTO.setCustomerName(customerRecord.getCustomerName());
        customerDTO.setCustomerInn(customerRecord.getCustomerInn());
        customerDTO.setCustomerKpp(customerRecord.getCustomerKpp());
        customerDTO.setCustomerLegalAddress(customerRecord.getCustomerLegalAddress());
        customerDTO.setCustomerPostalAddress(customerRecord.getCustomerPostalAddress());
        customerDTO.setCustomerEmail(customerRecord.getCustomerEmail());
        customerDTO.setCustomerCodeMain(customerRecord.getCustomerCodeMain());
        customerDTO.setIsOrganization(customerRecord.getIsOrganization());
        customerDTO.setIsPerson(customerRecord.getIsPerson());
        return customerDTO;
    }
}