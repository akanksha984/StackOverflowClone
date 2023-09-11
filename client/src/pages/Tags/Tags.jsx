import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import TagsList from './TagsList'
import { TagData } from './TagData'
import './Tags.css'

const Tags = () => {
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
            <h1 className='tags-h1'> Tags</h1>
            <p className='tags-p'>A Tag is a keyword or label that categorizes your questions with other, similar quesstions.</p>
            <p className='tags-p'> Using right tags makes it easier for others to find and answer your question</p>
            <div className='tags-list-container'>
                {
                    TagData.map((tag)=>(
                        <TagsList tag={tag} key={tag.id} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Tags