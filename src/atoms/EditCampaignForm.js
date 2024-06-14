import React, { useState } from 'react'
const EditCampaignForm = ({ campaign, onSave }) => {
    const [name, setName] = useState(campaign.name);
    const [description, setDescription] = useState(campaign.description);
  
    const handleSave = () => {
      onSave({ name, description });
    };
  
    return (
      <div>
        <h2>Edit Campaign</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Campaign Name"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Campaign Description"
        />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  };
  
  export default EditCampaignForm;
  