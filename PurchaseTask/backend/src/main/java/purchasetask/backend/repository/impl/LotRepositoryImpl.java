package purchasetask.backend.repository.impl;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import purchasetask.backend.jooq.generated.tables.Lot;
import purchasetask.backend.jooq.generated.tables.records.LotRecord;
import purchasetask.backend.repository.LotRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class LotRepositoryImpl implements LotRepository {
    private final DSLContext dsl;

    @Autowired
    public LotRepositoryImpl(final DSLContext dsl) {
        this.dsl = dsl;
    }

    @Override
    public List<LotRecord> findAll() {
        return dsl.selectFrom(Lot.LOT)
                .fetch();
    }

    @Override
    public Optional<LotRecord> findById(final Integer id) {
        final LotRecord record = dsl.selectFrom(Lot.LOT)
                .where(Lot.LOT.ID.eq(id))
                .fetchOne();

        return Optional.ofNullable(record);
    }

    @Override
    public List<LotRecord> filterAndSort(final String currencyFilter, final String ndsFilter, final String sortBy, final boolean ascending) {
        final Field<?> field = switch (sortBy) {
            case "lotName" -> Lot.LOT.LOT_NAME;
            case "customerCode" -> Lot.LOT.CUSTOMER_CODE;
            case "price" -> Lot.LOT.PRICE;
            case "placeDelivery" -> Lot.LOT.PLACE_DELIVERY;
            case "dateDelivery" -> Lot.LOT.DATE_DELIVERY;
            default -> Lot.LOT.ID;
        };

        final List<String> currencyCodes = List.of("RUB", "USD", "EUR");
        final Map<String, String> ndsRates = Map.of("without", "Without NDS", "18", "18%", "20", "20%");

        if (currencyCodes.contains(currencyFilter) && ndsRates.containsKey(ndsFilter)) {
            return dsl.selectFrom(Lot.LOT)
                    .where(Lot.LOT.CURRECY_CODE.eq(currencyFilter))
                    .and(Lot.LOT.NDS_RATE.eq(ndsRates.get(ndsFilter)))
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
        } else if (!currencyCodes.contains(currencyFilter) && ndsRates.containsKey(ndsFilter)) {
            return dsl.selectFrom(Lot.LOT)
                    .where(Lot.LOT.NDS_RATE.eq(ndsRates.get(ndsFilter)))
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
        } else if (currencyCodes.contains(currencyFilter) && !ndsRates.containsKey(ndsFilter)) {
            return dsl.selectFrom(Lot.LOT)
                    .where(Lot.LOT.CURRECY_CODE.eq(currencyFilter))
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
        } else {
            return dsl.selectFrom(Lot.LOT)
                    .orderBy(ascending ? field.asc() : field.desc())
                    .fetch();
        }
    }

    @Override
    public List<LotRecord> findByCustomerCode(final String customerCode) {
        return dsl.selectFrom(Lot.LOT)
                .where(Lot.LOT.CUSTOMER_CODE.eq(customerCode))
                .fetch();
    }

    @Override
    public List<LotRecord> findByCurrency(final String currencyCode) {
        return dsl.selectFrom(Lot.LOT)
                .where(Lot.LOT.CURRECY_CODE.eq(currencyCode))
                .fetch();
    }

    @Override
    public List<LotRecord> findByNdsRate(final String ndsRate) {
        return dsl.selectFrom(Lot.LOT)
                .where(Lot.LOT.NDS_RATE.eq(ndsRate))
                .fetch();
    }

    @Override
    public List<LotRecord> findSorted(final String sortBy, final boolean ascending) {
        final Field<?> field = switch (sortBy) {
            case "lotName" -> Lot.LOT.LOT_NAME;
            case "customerCode" -> Lot.LOT.CUSTOMER_CODE;
            case "price" -> Lot.LOT.PRICE;
            case "placeDelivery" -> Lot.LOT.PLACE_DELIVERY;
            case "dateDelivery" -> Lot.LOT.DATE_DELIVERY;
            default -> Lot.LOT.ID;
        };

        return dsl.selectFrom(Lot.LOT)
                .orderBy(ascending ? field.asc() : field.desc())
                .fetch();
    }

    @Override
    public void save(final LotRecord lotRecord) {
        dsl.insertInto(Lot.LOT)
                .set(lotRecord)
                .execute();
    }

    @Override
    public void update(final LotRecord lotRecord) {
        dsl.update(Lot.LOT)
                .set(lotRecord)
                .where(Lot.LOT.ID.eq(lotRecord.getId()))
                .execute();
    }

    @Override
    public void deleteById(final Integer id) {
        dsl.deleteFrom(Lot.LOT)
                .where(Lot.LOT.ID.eq(id))
                .execute();
    }
}