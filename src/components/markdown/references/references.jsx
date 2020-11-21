import React, { useContext } from 'react'
import PropTypes, { array } from 'prop-types'

import { BibReferencesContext } from '../../page-template'

const References = ({ children, citationStyle }) => {
  const { references, usedReferences } = useContext(
    BibReferencesContext
  )


  // looping array
  const referenceOptions = Array.from(usedReferences).map((referenceId, i) => {

    const fields = references[referenceId].fields     // fields handles all the data you need, e.g. author, title, year, etc
    const types = references[referenceId].type        // types handles the type of bibtex reference entry

    const authorName = fields.author.split(' ');    // splitting author name for future use

    // APA STYLING
    if(citationStyle == "APA")
    {
      // book
      if(types == "book")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0].charAt(0)}.  ({fields.year}). <i>{fields.title}</i>. {fields.publisher}.
            </p>
          </div>
        )
      }
      // article
      else if(types == "article")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0].charAt(0)}. ({fields.year}). <i>{fields.title}</i>{' '}
              <a target='_blank' href={fields.url}>
                {fields.url}
              </a>
            </p>
          </div>
        )
      } 
    }

    // MLA
    else if(citationStyle == "MLA")
    {
      // book
      if(types == "book")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0]}. <i>{fields.title}</i>. {fields.publisher}, {fields.year}.
            </p>
          </div>
        )
      }
      // article
      else if(types == "article")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0]}. "{fields.title}", {fields.year}, <a target='_blank' href={fields.url}>{fields.url}</a>
            </p>
          </div>
        )
      }
    }

    // Harvard
    else if(citationStyle == "Harvard")
    {
      if(types == "book")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0].charAt(0)}., {fields.year}. <i>{fields.title}</i>. {fields.address}: {fields.publisher}.
            </p>
          </div>
        )
      }
      else if(types == "article")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0].charAt(0)}., {fields.year}. <i>{fields.title}</i>. [online] Available at: {'<'}<a target='_blank' href={fields.url}>{fields.url}</a>{'>'}.
            </p>
          </div>
        )
      }
    }

    // Chicago
    else if(citationStyle == "Chicago")
    {
      if(types == "book")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0]}. {fields.year}. <i>{fields.title}</i>. {fields.address}: {fields.publisher}.
            </p>
          </div>
        )
      }
      else if(types == "article")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]}, {authorName[0]}. {fields.year}. "{fields.title}". <a target='_blank' href={fields.url}>{fields.url}</a>.
            </p>
          </div>
        )
      }
    }

    // IEEE
    else if(citationStyle == "IEEE")
    {
      if(types == "book")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              [{i + 1}]{authorName[0].charAt(0)}. {authorName[1]}, <i>{fields.title}</i>. {fields.address}: {fields.publisher}, {fields.year}.
            </p>
          </div>
        )
      }
      else if(types == "article")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              [{i + 1}]{authorName[0].charAt(0)}. {authorName[1]}, "{fields.title}", {fields.year}. [Online]. Available: <a target='_blank' href={fields.url}>{fields.url}</a>.
            </p>
          </div>
        )
      }
    }

    // AMA
    else if(citationStyle == "AMA")
    {
      if(types == "book")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]} {authorName[0].charAt(0)}, <i>{fields.title}</i>. {fields.address}: {fields.publisher}, {fields.year}.
            </p>
          </div>
        )
      }
      else if(types == "article")
      {
        return (
          <div id={`#reference-${referenceId}`}>
            <p>
              {' '}
              {i + 1}. {authorName[1]} {authorName[0].charAt(0)}. <a target='_blank' href={fields.url}>{fields.url}</a>. {fields.title}. Published {fields.year}.
            </p>
          </div>
        )
      }
    }

    // No citation style specified
    else
    {
      return (
        <div id={`#reference-${referenceId}`}>
          <p>
            {' '}
            {i + 1}. {fields.author} ({fields.year}) - <i>{fields.title}</i> -{' '}
            <a target='_blank' href={fields.url}>
              {fields.url}
            </a>
          </p>
        </div>
      )
    }
  })

  // return the map
  return <div>{referenceOptions}</div>
}

References.PropTypes = {
  children: PropTypes.isRequired,
}

export default References
