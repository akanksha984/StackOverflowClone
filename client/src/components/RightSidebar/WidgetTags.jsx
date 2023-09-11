import React from 'react'
const tags= ['C++','C','HTML','CSS','TailwindCSS','NodeJS','express','firebase','Java','JavaScript','mongoDB','MySQL','next.js','PHP','Python','ReactJS']
const WidgetTags = () => {
  return (
    <div className='widget-tags'>
      <h3> Watched Tags </h3>
      <div className='widget-tags-div'>
      {
        tags.map((tag)=>(
            <p key={tag}>
                {tag}
            </p>
          ))
      }
      </div>
    </div>
  )
}

export default WidgetTags