import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

function App() {

  const [resourceType, setResourceType] = useState('posts')
  const [resource, setResource] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)


  // CSS in JS styled component

  const Content = styled.div`
    max-width: 800px;
    margin: auto;
  `

  const Button = styled.button`
    padding: 0.5em;
    margin-right: 0.5em;
    background-color: beige;
    display: inline;
    font-weight: bold;

    &:hover {
      color: blue;
    }
  `

  const Span = styled.span`
    color: blue;
    font-weight: bold;
  `


  console.log('app renders')

  // useEffect only fetches data when resourceType changes
  useEffect(() => {
    console.log(`Fetching: ${resourceType}`)
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(response => response.json())
    .then(json => setResource(json))
  },[resourceType])

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  // set up event listener to track window width change
  // use empty array as parameter to set it up only once when the application mounts
  useEffect(() => {
    console.log('setting up event listener')
    window.addEventListener('resize', handleResize)

    // return is our clean up
    // it is run when the component unmounts and 
    // every time the component rerenders before the main code is run
    // we remove the eventlistener on return to avoid registering a new event listener
    // every time the app rerenders
    return () => {
      console.log('removing event listener')
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  


  const onButtonClick = (resourceRequested:string) => {
    // only change the state if needed to avoid needles rerendering
    if (resourceRequested !== resourceType) setResourceType(resourceRequested) 
  }

  return (
    <Content>
    <h1>React useEffect() Example Page</h1>
    <h2>Displaying window width</h2>
    <p>Your current window width is <Span>{windowWidth}</Span> pixel.</p>
    <h2>Fetching requested data from remote server</h2>
    <Button onClick={() => onButtonClick('users')}>users</Button>
    <Button onClick={() => onButtonClick('posts')}>posts</Button>
    <Button onClick={() => onButtonClick('albums')}>albums</Button>
    <h2>{resourceType}</h2>
    {resource.slice(0, 3).map((record, index) => (<p key={index}>{JSON.stringify(record)}</p>))}
    </Content>
  )
}

export default App
