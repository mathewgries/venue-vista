import React from 'react'

export const ContactInfo = ({ contactInfo }) => {
    return (
        <div className='bio-feed-details-item'>
            <h6>Contact Info:</h6>
            {
                contactInfo.map((contact, index) => (
                    <div className='bio-feed-contact-info' key={index}>
                        <p>{`${contact.type === 'emailAddress' ? 'Email: ' : 'Phone: '} ${contact.value}`}</p>
                    </div>
                ))}
        </div>
    )
}