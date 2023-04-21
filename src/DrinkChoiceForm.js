import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://api.up2tom.com/v3/models/drink_choice';
const AUTH_TOKEN = '9307bfd5fa011428ff198bb37547f979';

function DrinkChoiceForm() {
  const [modelData, setModelData] = useState(null);
  const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [budget, setBudget] = useState('');
    const [result, setResult] = useState('');

  useEffect(() => {
    axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      })
      .then(response => {
        setModelData(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
          age: parseInt(age),
          gender,
          budget: parseInt(budget),
        };
        axios.post(API_URL, data, {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          })
          .then(response => {
            setResult(response.data.prediction);
          })
          .catch(error => console.error(error));
      };

    return (
      <div>
      <form onSubmit={handleSubmit}>
      <label>
                Age:
      <input type="number" value={age} onChange={event => setAge(event.target.value)} />
      </label>
      <br />
      <label>
                Gender:
      <select value={gender} onChange={event => setGender(event.target.value)}>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      </select>
      </label>
      <br />
      <label>
                Budget:
      <input type="number" value={budget} onChange={event => setBudget(event.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
      </form>
            {result && (
      <p>The recommended drink is {result}.</p>
            )}
            {modelData && (
      <p> {modelData}.</p>
            )}
      </div>
    );
}

export default DrinkChoiceForm;