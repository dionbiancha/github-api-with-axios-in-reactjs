import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import ApiItem from './components/ApiItem';

const api = {
  baseUrl: 'https://api.github.com',
  client_id: 'Iv1.008f52fb21a424f7',
  client_secret: '09ebd79f86f2c5e8891828d6e399790e0248b951'
}

function App() {
  const [githubData, setGithubData] = useState([]);
  useEffect(()=>{
    axios
      .get(
      api.baseUrl +
        "/search/repositories?q=language:Java&sort=stars&page=1&client_id=" + 
        api.client_id +
        "&client_secret=" + 
        api.client_secret
      )
      .then((res)=>{
        console.log('infos api', res);
        setGithubData(res.data.items)
      })
  }, []);

  return (
    <div className="container App">
    <div className="row">
      {githubData.map((name) => (
        <div className="col-md-12" key={name.id}>
          <img src={name.owner.avatar_url} alt="avatar"/>
          <ApiItem title="Title: " item={name.name} />
          <ApiItem title="User: " item={name.owner.login} />
          <ApiItem title="Description: " item={name.description} />
          <ApiItem title="Stars: " item={name.stargazers_count} />
          <ApiItem title="Forks: " item={name.forks_count} />
        </div>
      )
      )}
    </div>
    </div>  
  );
}

export default App;
