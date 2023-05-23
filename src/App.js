import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { createClient } from 'microcms-js-sdk';
import './App.css';

function App() {
  const client = createClient({
    serviceDomain: process.env.REACT_APP_CMS_DOMAIN,
    apiKey: process.env.REACT_APP_CMS_APIKEY
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    client.get({
      endpoint: 'items',
      queries: {}
    }).then( (res) => {
      setItems( res.contents );
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <table className='mytable'>
          <thead>
            <tr><th>#</th><th>name</th><th>brand</th><th>maker</th><th>price</th></tr>
          </thead>
          <tbody>
        { items && items.length > 0 && items.map( ( item, index ) => (
          <tr key={item.id}>
            <td>#{item.jancode}<br/><img src={item.image_url} alt={item.name} width="200"/></td>
            <td><a target="_blank" href={"https://www.amazon.co.jp/dp/"+item.asin+"?tag=&linkCode=osi&th=1&psc=1"}>{item.name}</a></td>
            <td>{item.brand}</td>
            <td>{item.maker}</td>
            <td>{item.price}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
