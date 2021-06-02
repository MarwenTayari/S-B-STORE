import React from 'react'
import { useSelector} from 'react-redux'

const Feed = () => {
const auth = useSelector((state) => state.auth)

    return (
        <div>
            <h1>
                This is the feed Page
                {auth.user && <p> Hello {auth.user.firstname} </p>}
            </h1>  
        </div>
    )
}

export default Feed