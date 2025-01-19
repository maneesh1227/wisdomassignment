import { useState, useEffect } from 'react'
import Header from '../Header'
import './index.css'

import ItemContext from '../../context/ItemContext'

const ItemDetails = (props) => {
    const [itemDetails, setItemDetails] = useState({})

    useEffect(() => {
        const getUserDetails = async () => {
            const { match } = props
            const { params } = match
            const { id } = params

            const url = `https://jsonplaceholder.typicode.com/users/${id}`
            const options = {
                method: 'GET',
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                setItemDetails(data)
            } else {
                console.log('Failed to fetch data:', data)
            }
        }

        getUserDetails()
    })

    return (
        <ItemContext.Consumer>
            {value => {
                const { isDark } = value
                console.log(isDark)
                return (
                    <div className={`user-details-page ${isDark ? 'dark-mode' : 'light-mode'}`}>
                        <Header />
                        <div className="user-details-header">
                            <h2>{itemDetails.name}</h2>
                            <p>{itemDetails.username}</p>
                        </div>

                        <div className="user-details-info">
                            <section>
                                <h3>Contact Information</h3>
                                <p><strong>Email:</strong> {itemDetails.email}</p>
                                <p><strong>Phone:</strong> {itemDetails.phone}</p>
                                <p>
                                    <strong>Website:</strong>
                                    <a 
                                        href={`https://${itemDetails.website}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {itemDetails.website}
                                    </a>
                                </p>
                            </section>

                            <section>
                                <h3>Address</h3>
                                <p>{itemDetails.address?.street}, {itemDetails.address?.suite}</p>
                                <p>{itemDetails.address?.city}, {itemDetails.address?.zipcode}</p>
                            </section>

                            <section>
                                <h3>Company</h3>
                                <p><strong>Name:</strong> {itemDetails.company?.name}</p>
                                <p><strong>Catchphrase:</strong> {itemDetails.company?.catchPhrase}</p>
                                <p><strong>BS:</strong> {itemDetails.company?.bs}</p>
                            </section>
                        </div>

                        <div className="user-details-footer">
                            <button onClick={() => window.history.back()}>Go Back</button>
                        </div>
                    </div>
                )
            }}
        </ItemContext.Consumer>
    )
}

export default ItemDetails
