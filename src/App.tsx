import React, {useState} from 'react';
import './App.css';
import QuestionGenerator from "./components/QuestionGenerator/QuestionGenerator";
import {gql, useQuery} from "@apollo/client";
import {Country} from "./interfaces/quiz/country";
import {Continent} from "./interfaces/quiz/continent";
import {Language} from "./interfaces/quiz/language";
import {Button, Col, Input, Modal, Row} from "antd";

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
        if (validate()) {
            setName(name)
            setShowQuizQuestions(true);
        } else {
            Modal.error({
                content: (<p>Please enter a name!</p>),
            });
        }
        event.preventDefault();
    }

    const validate = () => {
        return name !== '' && name != undefined;
    }

    return (
        <div className="App">
            <Row>
                <Col span={12} offset={6}>
                    {!showQuizQuestions ? <form onSubmit={handleSubmit}>
                        <div>
                            <div className="name">Please enter your name</div>
                            <Input className="name-input" placeholder="Name" value={name}
                                   onChange={nameChanged}/>
                        </div>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </form> : null}
                    {showQuizQuestions ? (<QuestionGenerator name={name} countries={countries} continents={continents}
                                                             languages={languages}></QuestionGenerator>) : null}
                </Col>
            </Row>

        </div>
    );
}

export default App;
