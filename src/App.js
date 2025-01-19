import {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import ItemDetails from './components/ItemDetails'
import ItemContext from './context/ItemContext'

class App extends Component{
  state = {isDark:false}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {isDark} = this.state 
  return (
    <ItemContext.Provider
      value={{
        isDark,
        changeTheme: this.changeTheme,
      }}
    >
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path ='/' component={Home} />
            <Route exact path ='/items/:id' component={ItemDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </ItemContext.Provider>
  )
}
}
export default App
