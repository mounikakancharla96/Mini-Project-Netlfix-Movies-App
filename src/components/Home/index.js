import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Card from '../Card'
import Footer from '../Footer'
import Failure from '../Failure'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const home = true

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const originalStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  progress: 'PROGRESS',
}

const trendingStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {
    originalStatus: originalStatusConstants.initial,
    trendingStatus: trendingStatusConstants.initial,
    trendingVideos: [],
    originalVideos: [],
    randomPoster: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
    this.getOriginalVideos()
  }

  getTrendingVideos = async () => {
    this.setState({trendingStatus: trendingStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingStatus: trendingStatusConstants.success,
        trendingVideos: updatedData,
      })
      console.log(updatedData)
    } else {
      this.setState({trendingStatus: trendingStatusConstants.failure})
    }
  }

  getOriginalVideos = async () => {
    this.setState({originalStatus: originalStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
      const randomNumber = Math.floor(Math.random() * updatedData.length)
      const randomPoster = updatedData[randomNumber]
      this.setState({
        originalStatus: originalStatusConstants.success,
        originalVideos: updatedData,
        randomPoster,
      })
      console.log(updatedData)
    } else {
      this.setState({originalStatus: originalStatusConstants.failure})
    }
  }

  renderPosterSuccessView = () => {
    const {randomPoster} = this.state
    const {backdropPath, title, overview} = randomPoster

    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="poster-container"
      >
        <Header home={home} />
        <div className="title-overview">
          <h1 className="title">{title}</h1>
          <p className="overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPosterFailureView = () => (
    <>
      <Header home={home} />
      <div className="failure-poster-container">
        <Failure retry={this.getTrendingVideos} />
      </div>
    </>
  )

  renderOriginalFailureView = () => (
    <div className="failure-container">
      <Failure retry={this.getOriginalVideos} />
    </div>
  )

  renderTrendingFailureView = () => (
    <div className="failure-container">
      <Failure retry={this.getTrendingVideos} />
    </div>
  )

  renderPosterLoadingView = () => (
    <>
      <Header home={home} />
      <div className="failure-poster-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="failure-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingSuccessView = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="trending-list">
        <Slider {...settings} className="slick">
          {trendingVideos.map(video => (
            <Card key={video.id} eachVideo={video} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderOriginalSuccessView = () => {
    const {originalVideos} = this.state
    return (
      <ul className="trending-list">
        <Slider {...settings} className="slick">
          {originalVideos.map(video => (
            <Card key={video.id} eachVideo={video} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderPosterStatus = () => {
    const {trendingStatus} = this.state
    switch (trendingStatus) {
      case trendingStatusConstants.progress:
        return this.renderPosterLoadingView()
      case trendingStatusConstants.failure:
        return this.renderPosterFailureView()
      case trendingStatusConstants.success:
        return this.renderPosterSuccessView()
      default:
        return null
    }
  }

  renderTrendingStatus = () => {
    const {trendingStatus} = this.state
    switch (trendingStatus) {
      case trendingStatusConstants.progress:
        return this.renderLoadingView()
      case trendingStatusConstants.failure:
        return this.renderTrendingFailureView()
      case trendingStatusConstants.success:
        return this.renderTrendingSuccessView()
      default:
        return null
    }
  }

  renderOriginalStatus = () => {
    const {originalStatus} = this.state
    switch (originalStatus) {
      case originalStatusConstants.progress:
        return this.renderLoadingView()
      case originalStatusConstants.failure:
        return this.renderOriginalFailureView()
      case originalStatusConstants.success:
        return this.renderOriginalSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.renderPosterStatus()}
        <h1 className="movie-name">Trending Now</h1>
        {this.renderTrendingStatus()}
        <h1 className="movie-name">Originals</h1>
        {this.renderOriginalStatus()}
        <Footer />
      </div>
    )
  }
}

export default Home
