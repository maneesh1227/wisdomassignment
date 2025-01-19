import { Link } from 'react-router-dom'
import './index.css'

const Items = props =>{
    const {data} = props 
    const {id,name,email,phone} = data
    return(
        <li>
            <Link to={`/items/${id}`}>
                <div className='user-item'>
                    <h1>{name}</h1>
                    <p>{email}</p>
                    <p>{phone}</p>
                </div>
            </Link>
        </li>
    )
}

export default Items