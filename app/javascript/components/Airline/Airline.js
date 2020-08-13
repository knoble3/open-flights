import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`


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

  const handleChange = (e) => {
    e.preventdefault()

    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventdefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.data.id
    axios.post('/api/v1/reviews', {review, airline_id})
    .then(resp => {

    })
    .catch(resp => {})
  }

  return (
    <Wrapper>
      {
        loaded &&
        <Fragment>
          <Column>
            <Main>
                <Header
                  attributes={airline.data.attributes}
                  reviews={airline.included}
                />
              }
              <div className="reviews"></div>
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              attributes={airline.data.attributes}
              review={review}
            />
          </Column>
        </Fragment>
    }
    </Wrapper>
  )

export default Airline
