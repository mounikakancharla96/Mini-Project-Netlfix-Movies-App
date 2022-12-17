import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Card from '../Card'
import Header from '../Header'
import './index.css'

const search = true
const searchStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  progress: 'PROGRESS',
}
class Search extends Component {
  state = {
    searchStatus: searchStatusConstants.initial,
    searchVideos: [],
    searchInput: '',
  }

  getSearchVideos = async searchInput => {
    this.setState({searchStatus: searchStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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
        searchStatus: searchStatusConstants.success,
        searchVideos: updatedData,
        searchInput,
      })
      console.log(updatedData)
    } else {
      this.setState({searchStatus: searchStatusConstants.failure})
    }
  }

  renderSearchSuccessView = () => {
    const {searchVideos} = this.state
    const searchLength = searchVideos.length

    return searchLength > 0 ? (
      <ul className="popular-list">
        {searchVideos.map(video => (
          <Card key={video.id} eachVideo={video} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  retrySearch = () => {
    this.getSearchVideos()
  }

  renderSearchLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSearchFailureView = () => (
    <div className="failure-popular-container">
      <img
        src="https://res.cloudinary.com/ddq78brtl/image/upload/v1671251170/Group_1_htazwq.png"
        alt="failure view"
        className="popular-failure"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button onClick={this.retrySearch} className="retry-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderSearchView = () => {
    const {searchStatus} = this.state
    switch (searchStatus) {
      case searchStatusConstants.success:
        return this.renderSearchSuccessView()
      case searchStatusConstants.progress:
        return this.renderSearchLoadingView()
      case searchStatusConstants.failure:
        return this.renderSearchFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-container">
        <Header search={search} getSearchVideos={this.getSearchVideos} />
        {this.renderSearchView()}
      </div>
    )
  }
}

export default Search
