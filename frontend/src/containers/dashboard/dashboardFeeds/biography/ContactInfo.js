import React from 'react'

export const ContactInfo = ({ contact_info }) => {
    return (
        <div className='bio-feed-details-item'>
            <h6>Contact Info:</h6>
            {
                contact_info.map((contact, index) => (
                    <div className='bio-feed-contact-info' key={index}>
                        <p>{`${contact.Type === 'EmailAddress' ? 'Email: ' : 'Phone: '} ${contact.Value}`}</p>
                    </div>
                ))}
        </div>
    )
}