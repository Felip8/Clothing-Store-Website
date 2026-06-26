package com.fhcs.clothing_store.application.port.out.persistence.address;

import com.fhcs.clothing_store.core.domain.bo.address.StateBO;

public interface StateRepositoryPort {
    StateBO findByUf(String uf);
}
