import React from 'react'
import './UserProfile.css'

const ProfileBio = ({currentProfile}) => {
  return (
    <div>
        <div>
        <h4>Tags Watched</h4>
        {
            currentProfile?.tags.length>0 ? (
                <>
                {
                    currentProfile?.tags.map((tag)=>(
                        <p key={tag}>
                            {tag}
                        </p>
                    ))
                }
                </>
            ):(
                <p> No tags watched...</p>
            )
        }
        </div>
        <div>
            <h4>About</h4>
            {
                currentProfile?.about ? (
                    <>
                    <p>{currentProfile?.about}</p>
                    </>
                ):(
                    <p> No bio found...</p>
                )
            }
        </div>
    </div>
  )
}

export default ProfileBio