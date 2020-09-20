import { Record, List, Map, fromJS } from 'immutable';

export interface City extends Map<string, any> {
    name: string;
}

export interface FavoriteStateProps {
    bigCities: List<City>;
    favorites: List<City>;
}

const defaultProps: FavoriteStateProps = {
    //source http://www.citymayors.com/statistics/urban_2020_1.html
    bigCities: fromJS([
        { name: 'Tokyo' },
        { name: 'Mumbai' },
        { name: 'Delhi' },
        { name: 'Dhaka' },
        { name: 'Mexico City' },
        { name: 'São Paulo' },
        { name: 'Lagos' },
        { name: 'Jakarta' },
        { name: 'New York' },
        { name: 'Karachi' },
        { name: 'Calcutta' },
        { name: 'Buenos Aires' },
        { name: 'Cairo' },
        { name: 'Manila' },
        { name: 'Los Angeles' },
    ]),
    favorites: List<City>([]),
};

export default class FavoriteState extends Record(defaultProps) implements FavoriteStateProps {
    public readonly bigCities!: List<City>;
    public readonly favorites!: List<City>;

    public constructor(values?: Partial<FavoriteStateProps>) {
        values ? super(fromJS(values)) : super();
    }

    public addFavorite(name: string, key: string): FavoriteState {
        //check duplicate
        const exists = this.get('favorites').find((v) => v.get('key') == key);
        if (exists === undefined) {
            return this.update('favorites', (v) => v.push(fromJS({ key, name })));
        } else {
            return this.removeFavorite(key);
        }
    }

    public removeFavorite(key: string): FavoriteState {
        return this.update('favorites', (v) => v.filter((f) => f.get('key') != key));
    }

    public removeBigCity(key: string): FavoriteState {
        return this.update('bigCities', (v) => v.filter((f) => f.get('name') != key));
    }
}
