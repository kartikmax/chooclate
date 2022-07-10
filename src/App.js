import React, { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";

const continent = gql`
  query continent {
    continents {
      code
      name
    }
  }
`;

const allCountries = gql`
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
const App = () => {
  const { data, loading } = useQuery(continent);

  const [continents2, setContinents2] = useState();
  const [code, setCode] = useState("AS");
  const [countriesData, setCountriesData] = useState();

  const { data: theirCountry, loading: loadingCountries } = useQuery(
    allCountries,
    {
      variables: {
        code: code,
      },
    }
  );

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

  // console.log(countriesData);

  const handleChange = (event) => {
    setCode(event.target.value);
    console.log(code, "state");
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
              <button key={x.code}>{x.name}</button>
            ))}
        </ol>
      )}
    </>
  );
};

export default App;
