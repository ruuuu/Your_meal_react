import { Container } from "./components/Container/Container"  // импор компанента Container
import { Header } from "./components/Header/Header"
import { Navigation } from "./components/Navigation/Navigation"

export const App = () => {


  return (
    <>
      <Header />
      <main>
        <Navigation />
        <section></section>
      </main>
      <footer></footer>
    </>

  )
}


