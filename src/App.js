// @flow
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';

import logo from './logo.svg';
import './App.css';

const HERO_QUERY = gql`
  query GetCharacter($episode: String!, $offset: Int) {
    hero(episode: $episode, offset: $offset) {
      name
      id
      friends {
        name
        id
        appearsIn
      }
    }
  }
`;

type Hero = {
  name: string,
  id: string,
  appearsIn: string[],
  friends: Hero[],
  ...
};

type HeroQueryVariables = {
  episode: string,
  offset?: ?number,
  ...
};

type HeroQueryData = { hero: ?Hero, ... };

class HeroQueryComp extends Query<
  { hero: ?Hero, ... },
  { episode: string, offset?: ?number, ... }
> {}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* Running `yarn start` will show `TypeError: Class constructor HeroQueryComp cannot be invoked without 'new'` */}
        <HeroQueryComp query={HERO_QUERY} variables={{ episode: 'episode' }}>
          {({ data, loading, error }) => {
            if (loading) return 'Loading....';
            if (error) return 'Error!';
            if (!data || !data.hero) {
              return <div />;
            }
            const hero = data.hero;

            const nameAgain: string = hero.name;

            return <div>{nameAgain}</div>;
          }}
        </HeroQueryComp>;
      </header>
    </div>
  );
}

export default App;
