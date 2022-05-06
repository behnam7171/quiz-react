import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Baselayout from "./components/Layout/Layout";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache(),
});

root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                <Route element={<Baselayout />}>
                    <Route path="/" element={<App/>}/>
                    <Route path="/results" element={<Navigate to="/results/leaderboard"/>}></Route>
                    <Route path="/results/leaderboard" element={<Leaderboard/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </ApolloProvider>



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
