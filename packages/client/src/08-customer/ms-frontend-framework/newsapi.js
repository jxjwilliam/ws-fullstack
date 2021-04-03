/* eslint-disable max-classes-per-file */
import React, { Component } from 'react'
import dayjs from 'dayjs'

const today = dayjs().format('YYYY-MM-DD')
const APIkey = '385ab8a7f7d94d8ab652bba886b440e3'
const URL = `http://newsapi.org/v2/everything?q=tesla&from=${today}&sortBy=publishedAt&apiKey=${APIkey}`
// .../everything?q=tesla&from=2020-12-26&sortBy=publishedAt&apiKey=385ab8a7f7d94d8ab652bba886b440e3

// https://codedaily.io/tutorials/6/Using-Functions-as-Children-and-Render-Props-in-React-Components
class LoadContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      data: [],
    }
  }

  componentDidMount() {
    const { url } = this.props
    fetch(url)
      // we should check status code here and throw for errors so our catch will work.
      .then(res => res.json())
      .then(({ totalResults, articles }) => this.setState({ total: totalResults, list: articles, loading: false }))
      .catch(() => this.setState({ loading: false, error: true }))
  }

  render() {
    const { children } = this.props
    return (
      <div>
        {children({
          ...this.props,
          ...this.state,
        })}
      </div>
    )
  }
}

class ComplexList extends Component {
  render() {
    const { renderHeader, renderListItem, data, children } = this.props
    return (
      <div>
        <div className="header">{renderHeader(this.props)}</div>
        <div className="main">{data.map(item => renderListItem(item))}</div>
        <div className="footer">{children}</div>
      </div>
    )
  }
}

const renderListItem = ({ author, publishedAt, title, url }) => (
  <div key={url}>
    <h4 className="App-link" href={url}>
      {title} - {publishedAt.replace(/T.*$/, '')}
    </h4>
    <p>{author}</p>
  </div>
)

export default function NewsApi() {
  return (
    <div className="wrapper">
      <LoadContent url={`${URL}`}>
        {({ loading, error, total, list }) => {
          if (loading) return <span>Loading...</span>
          if (error) return <span>Error loading</span>

          return (
            <ComplexList
              data={list}
              renderHeader={() => <span>{loading ? 'Loading...' : 'Header Content'}</span>}
              renderListItem={renderListItem}
            >
              We have {total} items
            </ComplexList>
          )
        }}
      </LoadContent>
    </div>
  )
}
