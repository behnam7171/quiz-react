import React, {useState} from 'react';
import './App.css';
import QuestionGenerator from "./components/QuestionGenerator/QuestionGenerator";
import {gql, useQuery} from "@apollo/client";
import {QuestionBody} from "./interfaces/question/question-body";
import {Country} from "./interfaces/country";
import {Continent} from "./interfaces/continent";
import {Language} from "./interfaces/language";

function App() {

    const queries = {
        continents: gql`query MyQuery {
  continents {
    code
    name
  }
}`,
        countries: gql`{
  countries  {
    name,
    code,
    native,
    phone,
    continent {
      code,
      name
    }
    currency,
    languages {
      name,
      code,
      native,
      rtl
    },
    emoji,
    states {
      code,
      name
    },
    capital,
    
  }
}` , languages: gql`{
  languages {
    code,
    name,
    native,
    rtl
  }
}`

    }

    const allContinentsResult = useQuery(queries.continents);
    const allCountriesResult = useQuery(queries.countries);
    const allLanguagesResult = useQuery(queries.languages);

    const continentData = allContinentsResult.data;
    const countryData = allCountriesResult.data;
    const languageData = allLanguagesResult.data;

    const [countries, setCountries] = useState<Country[]>([]);
    const [continents, setContinents] = useState<Continent[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);


    const errors = allContinentsResult.error || allCountriesResult.error || allLanguagesResult.error;
    const loading = allContinentsResult.loading || allCountriesResult.loading || allLanguagesResult.loading;

    React.useEffect(() => {
        if(continentData && countryData && languageData) {
            setLanguages(allLanguagesResult.data.languages);
            setContinents(allContinentsResult.data.continents);
            setCountries(allCountriesResult.data.countries);
        }
    }, [continentData, countryData, languageData])

    return (
        <div className="App">
            <QuestionGenerator countries={countries} continents={continents} languages={languages}></QuestionGenerator>
        </div>
    );
}

export default App;
