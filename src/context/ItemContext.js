import React from 'react'

const ItemContext = React.createContext({
  isDark: true,
  changeTheme: () => {},
})

export default ItemContext