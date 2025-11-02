import { ref, readonly } from 'vue';

export interface CountryOption {
    label: string;
    value: string;
}

interface RestCountryResponse {
    name: {
        common: string;
    };
    cca2: string;
}

const countries = ref<CountryOption[]>([]);
const loading = ref<boolean>(false);
const error = ref<Error | null>(null);

let hasFetched = false;

const fetchCountries = async () => {

    if (loading.value || hasFetched) {
        return;
    }

    loading.value = true;
    error.value = null;

    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');

        if (!response.ok) {
            throw new Error('Error al cargar la lista de países');
        }

        const data = (await response.json() as RestCountryResponse[]);

        const mappedCountries: CountryOption[] = data.map(country => ({
            label: country.name.common,
            value: country.cca2,
        }));

        mappedCountries.sort((a, b) => a.label.localeCompare(b.label));

        countries.value = mappedCountries;
        hasFetched = true;

    } catch (e) {
        error.value = e as Error;
    } finally {
        loading.value = false;
    }
};

export function useCountries() {
    fetchCountries();

    return {
        countries: readonly(countries),
        loading: readonly(loading),
        error: readonly(error),
    };
}