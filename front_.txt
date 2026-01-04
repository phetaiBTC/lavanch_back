import { useApi } from "./useApi";
import { ref } from "vue";

export interface IProvinceEntity {
  id: number;
  name_en: string;
  name_kh: string;
}

export interface IDistrictEntity {
  id: number;
  province_id: number;
  name_en: string;
  name_kh: string;
}

export interface IVillageEntity {
  id: number;
  name: string;
  name_en: string;
  district?: {
    id: number;
    name: string;
    name_en: string;
    province?: {
      id: number;
      name: string;
      name_en: string;
    };
  };
}

export interface IAddressOption {
  village_id: number;
  village_name: string;
  district_name: string;
  province_name: string;
  full_address: string;
}

// Cache for addresses
let addressCache: IAddressOption[] | null = null;
let addressCachePromise: Promise<IAddressOption[]> | null = null;

export const useAddress = () => {
  const getProvinces = async (): Promise<IProvinceEntity[]> => {
    try {
      const res = await useApi().get<IProvinceEntity[]>("/address/province");
      return res || [];
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
      return [];
    }
  };

  const getDistricts = async (provinceId: number): Promise<IDistrictEntity[]> => {
    try {
      const res = await useApi().get<IDistrictEntity[]>(`/address/district/${provinceId}`);
      return res || [];
    } catch (error) {
      console.error("Failed to fetch districts:", error);
      return [];
    }
  };

  const getVillages = async (districtId: number): Promise<IVillageEntity[]> => {
    try {
      const res = await useApi().get<IVillageEntity[]>(`/address/village/${districtId}`);
      return res || [];
    } catch (error) {
      console.error("Failed to fetch villages:", error);
      return [];
    }
  };

  /**
   * Get all villages with their district and province names for searchable dropdown
   * Uses single API call and caching for performance
   */
  const getAllAddresses = async (): Promise<IAddressOption[]> => {
    // Return cached data if available
    if (addressCache) {
      return addressCache;
    }

    // Return existing promise if request is in progress
    if (addressCachePromise) {
      return addressCachePromise;
    }

    // Create new request
    addressCachePromise = (async () => {
      try {
        // Attempt single endpoint first (may not exist per backend constraints)
        let villages: IVillageEntity[] = [];
        try {
          villages = await useApi().get<IVillageEntity[]>("/address/all");
        } catch (e: any) {
          // Fallback: aggregate via provinces -> districts -> villages
          const provinces = await getProvinces();
          const districtLists = await Promise.all(
            provinces.map(p => getDistricts(p.id))
          );
          const districts = districtLists.flat();
          const villageLists = await Promise.all(
            districts.map(d => getVillages(d.id))
          );
          villages = villageLists.flat();
        }

        const addresses: IAddressOption[] = (villages || []).map(village => {
          const district = village.district;
          const province = district?.province;
          const villageName = village.name_en || village.name || "";
            return {
              village_id: village.id,
              village_name: villageName,
              district_name: district?.name_en || district?.name || "",
              province_name: province?.name_en || province?.name || "",
              full_address: [
                villageName,
                district?.name_en || district?.name,
                province?.name_en || province?.name,
              ].filter(Boolean).join(', '),
            };
        });

        addressCache = addresses;
        return addresses;
      } catch (error) {
        console.error("Failed to fetch all addresses:", error);
        addressCachePromise = null; // Clear promise on error to allow retry
        return [];
      } finally {
        addressCachePromise = null;
      }
    })();

    return addressCachePromise;
  };

  /**
   * Clear the address cache (useful when addresses are updated)
   */
  const clearAddressCache = () => {
    addressCache = null;
    addressCachePromise = null;
  };

  return { 
    getProvinces, 
    getDistricts, 
    getVillages, 
    getAllAddresses,
    clearAddressCache,
  };
};
