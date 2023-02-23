import { Container } from "./components/Container/Container"  // импор компанента Container
import { Header } from "./components/Header/Header.jsx"
import { Navigation } from "./components/Navigation/Navigation.jsx"
import { Catalog } from "./components/Catalog/Catalog.jsx"
import { Provider } from "react-redux"
import { store } from './store/index.js';




export const App = () => {

  // store={store} надо чобы приложение знало о store
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      <footer></footer>
    </Provider>

  )
}


