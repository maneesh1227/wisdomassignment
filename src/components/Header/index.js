import { Link } from 'react-router-dom'
import { FaMoon } from 'react-icons/fa'
import { IoSunnyOutline } from 'react-icons/io5'

import ItemContext from '../../context/ItemContext'
import './index.css'

const Header = () => {
    return (
        <ItemContext.Consumer>
            {value => {
                const { isDark, changeTheme } = value
                const onClickTheme = () => {
                    changeTheme()
                }

                return (
                    <div className={`header ${isDark ? 'dark-mode' : 'light-mode'}`}>
                        <Link to="/">
                            <img
                                src={
                                    isDark
                                        ? 'https://media.licdn.com/dms/image/v2/D560BAQEnt5mreEDDFQ/company-logo_200_200/company-logo_200_200/0/1721036420826/wisdom_peak_analytics_logo?e=1745452800&v=beta&t=wOqkkcYHfFpyzVGsIUQNnVhl_3sKXBRnUwNy9ZpbF2Y'
                                        : 'https://media.licdn.com/dms/image/v2/D560BAQEnt5mreEDDFQ/company-logo_200_200/company-logo_200_200/0/1721036420826/wisdom_peak_analytics_logo?e=1745452800&v=beta&t=wOqkkcYHfFpyzVGsIUQNnVhl_3sKXBRnUwNy9ZpbF2Y'
                                }
                                alt="website logo"
                            />
                        </Link>

                        <Link to="/">
                            <h1 className='header-home'>Home</h1>    
                        </Link>

                        <button
                            data-testid="theme"
                            onClick={onClickTheme}
                        >
                            {isDark ? <IoSunnyOutline /> : <FaMoon />}
                        </button>
                    </div>
                )
            }}
        </ItemContext.Consumer>
    )
}

export default Header
