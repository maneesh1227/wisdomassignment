import { Component } from 'react' 

import Items from '../Items'
import Header from '../Header'
import ItemContext from '../../context/ItemContext'
import { Oval } from 'react-loader-spinner';

import './index.css'

const apiStatus = {
    initial: "INITIAL",
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
}

class Home extends Component {
    state = { usersList: [], searchInp: '', sortOrder: 'asc', status:apiStatus.initial }

    componentDidMount = () => {
        this.getData()
    }

    getData = async () => {
        this.setState({status:apiStatus.inProgress})
        const url = 'https://jsonplaceholder.typicode.com/users'
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            this.setState({ usersList: data, status:apiStatus.success })
        } else {
            this.setState({status:apiStatus.failure})
            console.log(data)
        }
    }

    onChangeSearchInput = (event) => {
        this.setState({ searchInp: event.target.value })
    }

    onSortChange = (event) => {
        this.setState({ sortOrder: event.target.value })
    }

    onClickRetry = () => {
        window.location.reload()
    }

    ////////////
    renderOrdersListFailureView = () =>{
        return (
            <ul>
                <div className="no-orders-view">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                        alt="failure view"
                        className='no-orders-view-img'
                    />
                    <h1>Oops! Something Went Wrong</h1>
                    <p>We cannot seem to find the page you are looking for</p>
                    <button className="retry-btn" onClick={this.onClickRetry} type="button">
                        Retry
                    </button>
                </div>
            </ul>
        )
    }

    renderOrdersListSuccessNoOrdersView = () =>{
        return (
            <ul>
                <div className="no-orders-view">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                        alt="failure view"
                        className='no-orders-view-img'
                    />
                    <h1>No Users Found</h1>
                    <p>We cannot seem to find the page you are looking for</p>
                    <button className="retry-btn" onClick={this.onClickRetry} type="button">
                        Retry
                    </button>
                </div>
            </ul>
        )
    }

    renderLoadingView = () => (
        <ul>
            <div className='loader-spinner'>
                <Oval height={80} width={80} color="blue" ariaLabel="loading" />
            </div>
        </ul>
    )

    render() {
        const { usersList, searchInp, sortOrder, status } = this.state

        const searchedUserList = usersList.filter(eachItem =>
            eachItem.name.toLowerCase().includes(searchInp.toLowerCase())
        )

        const sortedUserList = [...searchedUserList].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        })

        let code;
        switch (status) {
            case apiStatus.inProgress:
                code = this.renderLoadingView()
                break
            case apiStatus.success:
                if (sortedUserList.length === 0) {
                    code = this.renderOrdersListSuccessNoOrdersView()
                } else {
                    code = (<ul>
                        {sortedUserList.map(eachItem => (
                            <Items data={eachItem} key={eachItem.id} />
                        ))}
                    </ul>)
                }
                break
            case apiStatus.failure:
                code = this.renderOrdersListFailureView()
                break
            default:
                code = null
        }

        return (
            <ItemContext.Consumer>
                {value => {
                    const { isDark } = value
                    return (
                        <div className={`home-page ${isDark ? 'dark-mode' : 'light-mode'}`}>
                            <Header />
                            <div className="search-sort-container">
                                <input
                                    type="search"
                                    className="search-bar"
                                    placeholder="Search Users"
                                    onChange={this.onChangeSearchInput}
                                />
                                <select value={sortOrder} onChange={this.onSortChange}>
                                    <option value="asc">Sort A-Z</option>
                                    <option value="desc">Sort Z-A</option>
                                </select>
                            </div>
                            <h1>List of Users :</h1>
                            {code}
                        </div>
                    )
                }}
            </ItemContext.Consumer>
        )
    }
}

export default Home
