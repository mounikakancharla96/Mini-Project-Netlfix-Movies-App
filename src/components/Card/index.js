import {Link} from 'react-router-dom'
import './index.css'

const Card = props => {
  const {eachVideo} = props
  const {id, title, posterPath} = eachVideo

  return (
    <Link to={`/movies/${id}`} className="link">
      <li className="list-item">
        <img src={posterPath} alt={title} className="movie-img" />
      </li>
    </Link>
  )
}

export default Card
