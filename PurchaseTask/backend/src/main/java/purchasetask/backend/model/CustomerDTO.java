package purchasetask.backend.model;

public class CustomerDTO {
    private Integer id;
    private String customerCode;
    private String customerName;
    private String customerInn;
    private String customerKpp;
    private String customerLegalAddress;
    private String customerPostalAddress;
    private String customerEmail;
    private String customerCodeMain;
    private Boolean isOrganization;
    private Boolean isPerson;

    public CustomerDTO() {

    }

    public Integer getId() {
        return this.id;
    }

    public String getCustomerCode() {
        return this.customerCode;
    }

    public String getCustomerName() {
        return this.customerName;
    }

    public String getCustomerInn() {
        return this.customerInn;
    }

    public String getCustomerKpp() {
        return this.customerKpp;
    }

    public String getCustomerLegalAddress() {
        return this.customerLegalAddress;
    }

    public String getCustomerPostalAddress() {
        return this.customerPostalAddress;
    }

    public String getCustomerEmail() {
        return this.customerEmail;
    }

    public String getCustomerCodeMain() {
        return this.customerCodeMain;
    }

    public Boolean getIsOrganization() {
        return this.isOrganization;
    }

    public Boolean getIsPerson() {
        return this.isPerson;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public void setCustomerCode(final String customerCode) {
        this.customerCode = customerCode;
    }

    public void setCustomerName(final String customerName) {
        this.customerName = customerName;
    }

    public void setCustomerInn(final String customerInn) {
        this.customerInn = customerInn;
    }

    public void setCustomerKpp(final String customerKpp) {
        this.customerKpp = customerKpp;
    }

    public void setCustomerLegalAddress(final String customerLegalAddress) {
        this.customerLegalAddress = customerLegalAddress;
    }

    public void setCustomerPostalAddress(final String customerPostalAddress) {
        this.customerPostalAddress = customerPostalAddress;
    }

    public void setCustomerEmail(final String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public void setCustomerCodeMain(final String customerCodeMain) {
        this.customerCodeMain = customerCodeMain;
    }

    public void setIsOrganization(final Boolean isOrganization) {
        this.isOrganization = isOrganization;
    }

    public void setIsPerson(final Boolean isPerson) {
        this.isPerson = isPerson;
    }
}