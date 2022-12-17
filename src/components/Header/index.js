import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    fullMenu: false,
    searchInput: '',
  }

  menuShow = () => {
    this.setState({fullMenu: true})
  }

  menuHide = () => {
    this.setState({fullMenu: false})
  }

  clickSearch = () => {
    const {searchInput} = this.state
    const {getSearchVideos} = this.props
    if (searchInput !== '') {
      getSearchVideos(searchInput)
    }
  }

  changeSearchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, fullMenu} = this.state
    const {home, popular, search, account} = this.props
    const homeClassName = home ? 'true-item' : 'item'
    const popularClassName = popular ? 'true-item' : 'item'
    const searchClassName = search ? 'search-route-container' : ''
    const searchBtn = search ? 'search-route-icon' : 'search-icon'
    const accountClassName = account ? 'true-item' : 'item'
    return (
      <>
        <nav className="header-container">
          <div className="movies-home">
            <Link to="/" className="link">
              <img
                src="https://res.cloudinary.com/ddq78brtl/image/upload/v1671019212/Group_7399_qv46nw.png"
                alt="website logo"
                className="movies-logo"
              />
            </Link>
            <ul className="lists">
              <Link to="/" className="link">
                <li className={homeClassName}>Home</li>
              </Link>
              <Link to="/popular" className="link">
                <li className={popularClassName}>Popular</li>
              </Link>
            </ul>
          </div>
          <div className="search-account">
            <div className={searchClassName}>
              {search && (
                <input
                  value={searchInput}
                  onChange={this.changeSearchValue}
                  placeholder="Search"
                  type="search"
                  className="search-input"
                />
              )}
              <Link to="/search">
                <button
                  onClick={this.clickSearch}
                  type="button"
                  className={searchBtn}
                  testid="searchButton"
                >
                  <HiOutlineSearch className="search" />
                </button>
              </Link>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/ddq78brtl/image/upload/v1671166587/Group_gdcksd.png"
                alt="profile"
                className="avatar-image"
              />
            </Link>
            <div className="small-menu">
              <button
                type="button"
                className="menu-button"
                onClick={this.menuShow}
              >
                <MdMenuOpen color="#ffffff" size={23} />
              </button>
            </div>
          </div>
        </nav>
        <nav className="show">
          {fullMenu && (
            <ul className="show-menu">
              <Link to="/" className="link">
                <li className={homeClassName}>Home</li>
              </Link>
              <Link to="/popular" className="link">
                <li className={popularClassName}>Popular</li>
              </Link>
              <Link to="/account" className="link">
                <li className={accountClassName}>Account</li>
              </Link>
              <li>
                <button
                  onClick={this.menuHide}
                  className="close-btn"
                  type="button"
                >
                  <AiFillCloseCircle className="close" />
                </button>
              </li>
            </ul>
          )}
        </nav>
      </>
    )
  }
}

export default Header
