import React from 'react'
import { TextInput } from '../../../../../components/inputFields/TextInput'

export const EditSiteLinks = ({ siteLinks, handleNestedArrayChange, handleRemoveSiteLink }) => {
    return (
        <div className='bio-edit-form-section'>
            <div>
                <h5>Site Links</h5>
            </div>
            {
                siteLinks.map((link, index) => (
                    <div key={index}>
                        <TextInput
                            fieldValue={link}
                            handleOnChange={(e) => handleNestedArrayChange(e, index)}
                        />
                        <button variant='danger' onClick={() => handleRemoveSiteLink(index)}>
                            Remove
                        </button>
                    </div>
                ))
            }
        </div>
    )
}