import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
