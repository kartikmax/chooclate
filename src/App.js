import React, { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import ShowDetails from "./components/ShowDetails";

const CONTINENT = gql`
  query continent {
    continents {
      code
      name
    }
  }
`;

const ALL_COUNTRIES = gql`
  query findmyCountry($code: ID!) {
    continent(code: $code) {
      name
      countries {
        name
        code
      }
    }
  }
`;

const COUNTRY_DETAILS = gql`
  query countryDetails($code: ID!) {
    country(code: $code) {
      name
      capital
      phone
      currency
      languages {
        name
        native
      }
    }
  }
`;

const App = () => {
  const { data, loading } = useQuery(CONTINENT);

  const [continents2, setContinents2] = useState();
  const [code, setCode] = useState();
  const [countryCode, setCountryCode] = useState("");
  const [countriesData, setCountriesData] = useState();
  const [countryDetails, setCountryDetails] = useState();

  const { data: theirCountry, loading: loadingCountries } = useQuery(
    ALL_COUNTRIES,
    {
      variables: {
        code: code,
      },
    }
  );

  const { data: data2 } = useQuery(COUNTRY_DETAILS, {
    variables: {
      code: countryCode,
    },
  });

  useEffect(() => {
    if (data) {
      setContinents2(data);
    }
  }, [data]);

  useEffect(() => {
    if (theirCountry) {
      setCountriesData(theirCountry);
    }
  }, [theirCountry]);

  useEffect(() => {
    if (data2) {
      setCountryDetails(data2.country);
      // console.log(countryDetails);
    }
  }, [data2]);

  const handleChange = (event) => {
    setCode(event.target.value);
    // console.log(code, "state");
  };

  const handleChangeCountryCode = (event) => {
    setCountryCode(event.target.value);
    // console.log(countryCode, "country code");
  };

  return (
    <>
      hello world
      <br />
      {loading ? (
        <h1 style={{ color: "red" }}>loading...</h1>
      ) : (
        <>
          {continents2 &&
            continents2.continents.map((x) => (
              <span>
                <button key={x.code} onClick={handleChange} value={x.code}>
                  {x.name}
                </button>
                <br />
              </span>
            ))}
        </>
      )}
      <h1>countries</h1>
      {loadingCountries ? (
        <>loading</>
      ) : (
        <ol>
          {countriesData &&
            countriesData.continent.countries.map((x) => (
              <button
                key={x.code}
                value={x.code}
                onClick={handleChangeCountryCode}
              >
                {x.name}
              </button>
            ))}
        </ol>
      )}
      {countryDetails && <ShowDetails theData={countryDetails} />}
    </>
  );
};

export default App;
