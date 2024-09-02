package purchasetask.backend.model.converter;

import purchasetask.backend.jooq.generated.tables.records.LotRecord;
import purchasetask.backend.model.LotDTO;

public class LotConverter {
    public static LotRecord toLotRecord(final LotDTO lotDTO, final boolean isSetId) {
        final LotRecord lotRecord = new LotRecord();
        if (isSetId) lotRecord.setId(lotDTO.getId());
        lotRecord.setLotName(lotDTO.getLotName());
        lotRecord.setCustomerCode(lotDTO.getCustomerCode());
        lotRecord.setPrice(lotDTO.getPrice());
        lotRecord.setCurrecyCode(lotDTO.getCurrencyCode());
        lotRecord.setNdsRate(lotDTO.getNdsRate());
        lotRecord.setPlaceDelivery(lotDTO.getPlaceDelivery());
        lotRecord.setDateDelivery(lotDTO.getDateDelivery());
        return lotRecord;
    }

    public static LotDTO toLotDTO(final LotRecord lotRecord) {
        final LotDTO lotDTO = new LotDTO();
        lotDTO.setId(lotRecord.getId());
        lotDTO.setLotName(lotRecord.getLotName());
        lotDTO.setCustomerCode(lotRecord.getCustomerCode());
        lotDTO.setPrice(lotRecord.getPrice());
        lotDTO.setCurrencyCode(lotRecord.getCurrecyCode());
        lotDTO.setNdsRate(lotRecord.getNdsRate());
        lotDTO.setPlaceDelivery(lotRecord.getPlaceDelivery());
        lotDTO.setDateDelivery(lotRecord.getDateDelivery());
        return lotDTO;
    }
}