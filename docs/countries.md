# African Countries Data

This document describes the African countries data system implemented in the Trovva SME application.

## Overview

The application includes a comprehensive dataset of African countries with unique color assignments for each country. This data is used for visualization, mapping, and UI components throughout the application.

## Data Structure

Each country is represented by the `CountryData` interface:

```typescript
interface CountryData {
  id: string;        // ISO 3166-1 alpha-2 country code
  name: string;      // Full country name
  color: string;     // Hex color code
}
```

## Countries Included

The system includes **54 African countries** organized by region:

### North Africa (6 countries)
- Algeria (DZ) - #FF6B6B
- Egypt (EG) - #F7DC6F
- Libya (LY) - #F7DC6F
- Morocco (MA) - #F7DC6F
- Tunisia (TN) - #85C1E9
- Western Sahara (EH) - #D7BDE2

### West Africa (16 countries)
- Benin (BJ) - #45B7D1
- Burkina Faso (BF) - #FFEAA7
- Cape Verde (CV) - #F7DC6F
- Côte d'Ivoire (CI) - #F1948A
- Gambia (GM) - #85C1E9
- Ghana (GH) - #F7DC6F
- Guinea (GN) - #D7BDE2
- Guinea-Bissau (GW) - #F8C471
- Liberia (LR) - #85C1E9
- Mali (ML) - #82E0AA
- Mauritania (MR) - #F1948A
- Niger (NE) - #82E0AA
- Nigeria (NG) - #F1948A
- Senegal (SN) - #D7BDE2
- Sierra Leone (SL) - #82E0AA
- Togo (TG) - #F1948A

### Central Africa (7 countries)
- Cameroon (CM) - #98D8C8
- Central African Republic (CF) - #BB8FCE
- Chad (TD) - #85C1E9
- Republic of Congo (CG) - #F8C471
- Democratic Republic of Congo (CD) - #82E0AA
- Equatorial Guinea (GQ) - #D7BDE2
- Gabon (GA) - #F1948A

### East Africa (14 countries)
- Burundi (BI) - #DDA0DD
- Djibouti (DJ) - #85C1E9
- Eritrea (ER) - #F8C471
- Ethiopia (ET) - #82E0AA
- Kenya (KE) - #82E0AA
- Madagascar (MG) - #D7BDE2
- Mauritius (MU) - #85C1E9
- Rwanda (RW) - #85C1E9
- Seychelles (SC) - #F8C471
- Somalia (SO) - #F1948A
- South Sudan (SS) - #F7DC6F
- Sudan (SD) - #D7BDE2
- Tanzania (TZ) - #82E0AA
- Uganda (UG) - #F7DC6F

### Southern Africa (11 countries)
- Botswana (BW) - #96CEB4
- Lesotho (LS) - #F1948A
- Malawi (MW) - #F8C471
- Mozambique (MZ) - #D7BDE2
- Namibia (NA) - #F8C471
- South Africa (ZA) - #85C1E9
- Swaziland (SZ) - #F8C471
- Zambia (ZM) - #F8C471
- Zimbabwe (ZW) - #82E0AA

## Usage

### Import the data

```typescript
import { 
  getAllCountries, 
  getCountryById, 
  getCountryByName,
  getCountriesByRegion 
} from '@/lib/country-data';
```

### Get all countries

```typescript
const countries = getAllCountries();
```

### Find a specific country

```typescript
// By ID
const nigeria = getCountryById('NG');

// By name
const kenya = getCountryByName('Kenya');
```

### Get countries by region

```typescript
const westAfricanCountries = getCountriesByRegion('west');
const eastAfricanCountries = getCountriesByRegion('east');
```

### Get a random country

```typescript
import { getRandomCountry } from '@/lib/country-data';
const randomCountry = getRandomCountry();
```

## Components

### CountryList

Displays countries in a responsive grid with color indicators:

```tsx
import { CountryList } from '@/components/ui/country-list';

<CountryList countries={getAllCountries()} />
```

### CountryGrid

Compact grid view for displaying many countries:

```tsx
import { CountryGrid } from '@/components/ui/country-list';

<CountryGrid />
```

### CountryListByRegion

Organizes countries by geographical regions:

```tsx
import { CountryListByRegion } from '@/components/ui/country-list';

<CountryListByRegion />
```

## API Endpoints

### Get all countries
```
GET /api/countries
```

### Get countries by region
```
GET /api/countries?region=west
```

### Get specific country by ID
```
GET /api/countries?id=NG
```

### Get specific country by name
```
GET /api/countries?name=Nigeria
```

## Color Palette

The colors are carefully selected to provide good contrast and visual appeal:

- **Reds**: #FF6B6B, #F1948A
- **Blues**: #45B7D1, #85C1E9
- **Greens**: #4ECDC4, #96CEB4, #82E0AA, #98D8C8
- **Yellows**: #F7DC6F, #FFEAA7, #F8C471
- **Purples**: #DDA0DD, #BB8FCE, #D7BDE2

## Integration with SVG Map

The country IDs correspond to the IDs used in the Africa SVG map (`public/africa.svg` and `public/africa-colored.svg`), allowing for easy integration with map visualizations.

## Future Enhancements

- Add country flags
- Include population data
- Add GDP information
- Include official languages
- Add timezone information
- Include currency data 