import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Card, Button, Form, Image } from "react-bootstrap";

const URL = "https://restcountries.com/v3.1/all";

const CountryApp = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      setCountries(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = (name) =>
    setCountries(countries.filter((country) => country.name.common !== name));

  const handleSearch = (searchValue) => {
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(searchValue.toLowerCase());
    });
    setCountries(newCountries);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  return (
    <>
      <h1 className="text-center">
        <u>
          <i>CountryApp</i>
        </u>
      </h1>

      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}

      <Form className="d-flex justify-content-center">
        <Form.Group className="m-2 w-25">
          <Form.Control
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Country..."
            required
          />
        </Form.Group>
      </Form>

      <Row xs={1} md={2} lg={3} className="g-4 m-2">
        {countries &&
          countries.map(({ name, capital, area, population, flags }) => (
            <Col key={uuidv4()}>
              <Card
                className="text-center m-2 text-white"
                style={{ backgroundColor: "#34495e" }}
              >
                <Card.Body className="cs">
                  <Image
                    src={flags.png}
                    alt={name.common}
                    fluid
                    style={{ width: "10rem", height: "7rem" }}
                  />
                  <p>Name: {name.common}</p>
                  <p>Capital: {capital}</p>
                  <p>Population: {population}</p>
                  <p>Area: {area}</p>
                  <Button
                    variant="warning"
                    onClick={() => handleRemove(name.common)}
                  >
                    Remove Country
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default CountryApp;
