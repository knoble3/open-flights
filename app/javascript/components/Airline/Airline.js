import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [reviews, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
    .then( resp => {
      setAirline(resp.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  return (
    <div className="wrapper">
      <div className="column">
        {
          loaded &&
          <Header
            attributes={airline.data.attributes}
            reviews={airline.included}
          />
        }
        <div className="reviews"></div>
      </div>
      <div className="column">
        <div className="review-form">[Reviews go here.]</div>
      </div>
    </div>
  )
}

export default Airline
