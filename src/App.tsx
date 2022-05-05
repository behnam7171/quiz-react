import React, {FormEventHandler, useState} from 'react';
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
}`, languages: gql`{
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

    const [showQuizQuestions, setShowQuizQuestions] = useState<boolean>(false);
    const [name, setName] = useState<string>('');


    const errors = allContinentsResult.error || allCountriesResult.error || allLanguagesResult.error;
    if (errors) {
        console.error(errors);
    }


    React.useEffect(() => {
        if (continentData && countryData && languageData) {
            setLanguages(allLanguagesResult.data.languages);
            setContinents(allContinentsResult.data.continents);
            setCountries(allCountriesResult.data.countries);
        }
    }, [continentData, countryData, languageData])

    const nameChanged = (event: any) => {
        setName(event.target.value);
    }

    const handleSubmit = (event: any) => {
        setName(name)
        setShowQuizQuestions(true);
        event.preventDefault();
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={nameChanged}/>
                </label>
                <input type="submit" value="Lets start"/>
            </form>
            {showQuizQuestions ? (<QuestionGenerator countries={countries} continents={continents} languages={languages}></QuestionGenerator>) : null}
        </div>
    );
}

export default App;
