import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Card from '../Card'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const popular = true
const popularStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  progress: 'PROGRESS',
}
class Popular extends Component {
  state = {popularStatus: popularStatusConstants.initial, popularVideos: []}

  componentDidMount() {
    this.getPopularVideos()
  }

  getPopularVideos = async () => {
    this.setState({popularStatus: popularStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      const updatedData = fetchedData.results.map(eachPoster => ({
        id: eachPoster.id,
        backdropPath: eachPoster.backdrop_path,
        overview: eachPoster.overview,
        title: eachPoster.title,
        posterPath: eachPoster.poster_path,
      }))
      this.setState({
        popularStatus: popularStatusConstants.success,
        popularVideos: updatedData,
      })
      console.log(updatedData)
    } else {
      this.setState({popularStatus: popularStatusConstants.failure})
    }
  }

  renderPopularSuccessView = () => {
    const {popularVideos} = this.state
    return (
      <>
        <ul className="popular-list">
          {popularVideos.map(video => (
            <Card key={video.id} eachVideo={video} />
          ))}
        </ul>
      </>
    )
  }

  onTryAgain = () => {
    this.getPopularVideos()
  }

  renderPopularLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularFailureView = () => (
    <div className="failure-popular-container">
      <img
        src="https://res.cloudinary.com/ddq78brtl/image/upload/v1671251170/Group_1_htazwq.png"
        alt="failure view"
        className="popular-failure"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button onClick={this.onTryAgain} className="retry-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderPopularView = () => {
    const {popularStatus} = this.state
    switch (popularStatus) {
      case popularStatusConstants.success:
        return this.renderPopularSuccessView()
      case popularStatusConstants.progress:
        return this.renderPopularLoadingView()
      case popularStatusConstants.failure:
        return this.renderPopularFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header popular={popular} />
        {this.renderPopularView()}
        <Footer />
      </div>
    )
  }
}

export default Popular
