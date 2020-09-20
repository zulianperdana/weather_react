interface UnitParameter {
    temperature: string;
    windSpeed: string;
    pressure: string;
    precip: string;
    totalSnow: string;
}

const metric: UnitParameter = {
    temperature: 'Celcius',
    windSpeed: 'Kilometers/Hour',
    pressure: 'Millibar',
    precip: 'Millimeters',
    totalSnow: 'Centimeters',
};

const scientific: UnitParameter = {
    temperature: 'Kelvin',
    windSpeed: 'Kilometers/Hour',
    pressure: 'Millibar',
    precip: 'Millimeters',
    totalSnow: 'Centimeters',
};

const fahrenheit: UnitParameter = {
    temperature: 'Fahrenheit',
    windSpeed: 'Miles/Hour',
    pressure: 'Millibar',
    precip: 'Inches',
    totalSnow: 'Inches',
};

export { metric, scientific, fahrenheit };
