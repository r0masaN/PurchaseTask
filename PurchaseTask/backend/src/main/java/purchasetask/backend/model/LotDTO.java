package purchasetask.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LotDTO {
    private Integer id;
    private String lotName;
    private String customerCode;
    private BigDecimal price;
    private String currencyCode;
    private String ndsRate;
    private String placeDelivery;
    private LocalDateTime dateDelivery;

    public LotDTO() {

    }

    public Integer getId() {
        return this.id;
    }

    public String getLotName() {
        return this.lotName;
    }

    public String getCustomerCode() {
        return this.customerCode;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public String getCurrencyCode() {
        return this.currencyCode;
    }

    public String getNdsRate() {
        return this.ndsRate;
    }

    public String getPlaceDelivery() {
        return this.placeDelivery;
    }

    public LocalDateTime getDateDelivery() {
        return this.dateDelivery;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public void setLotName(final String lotName) {
        this.lotName = lotName;
    }

    public void setCustomerCode(final String customerCode) {
        this.customerCode = customerCode;
    }

    public void setPrice(final BigDecimal price) {
        this.price = price;
    }

    public void setCurrencyCode(final String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public void setNdsRate(final String ndsRate) {
        this.ndsRate = ndsRate;
    }

    public void setPlaceDelivery(final String placeDelivery) {
        this.placeDelivery = placeDelivery;
    }

    public void setDateDelivery(final LocalDateTime dateDelivery) {
        this.dateDelivery = dateDelivery;
    }
}