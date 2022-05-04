import React, {useState} from 'react';
import './App.css';
import {gql, useQuery} from "@apollo/client";
import QuestionGenerator from "./components/QuestionGenerator/QuestionGenerator";

function App() {

    const countries_query = gql`
    {
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
    }`;

    const {data, loading, error} = useQuery(countries_query);

    const [countries, setCountries] = useState([]);

    React.useEffect(() => {
        if (data) {
            setCountries(data.countries)
        }
    }, [data])

    return (
        <div className="App">
            <QuestionGenerator ></QuestionGenerator>
        </div>
    );
}

export default App;
