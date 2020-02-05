import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      peliculas: [{
        title: "Test",
        rating: 123
      }, {
        title: "Test 2",
        rating: 123
      }]
    }
  }

  componentDidMount() {

    fetch({
      type: 'GET',
      url: '/api/moviedex'
    })
      .then((movieList) => {
        console.log(movieList);
        [...this.state.peliculas, ...movieList];
      })
      .catch((error) => {

      });

    // fetch
    // [...fetchData,...thisState]
  }

  render() {
    return (
      <div >

      </div>
    );
  }
}

export default App;