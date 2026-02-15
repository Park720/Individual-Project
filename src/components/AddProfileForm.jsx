import React from 'react';
import useState from 'react';

const stripTags = (input) => {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}
const trimCollapse = (input) => {
    return input.replace(/\s+/g, ' ').trim();
}

const AddProfileForm = ({ onSubmit }) => {

    const [values, setValues] = useState({name: '', major: '', email: '', bio: '', image: null})
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const [name, major, email, bio, image] = values

    const handleChange = (event) => {
        const { name, value} = event.target
        if (name === 'image') {
            const file = event.target.files[0]
            if (file && file.size < 1024 * 1024 ) {
                    setValues(pre => ({...pre, image:file}))
                    setError("")
            }else {
                setError("Image size should be less than 1MB")
                setValues(pre => ({...pre, image:null}))
            }
        }
        setValues(pre => ({...pre, [name]: value}) )
    }

    const handleSubmit = () => {
    setIsSubmitting(true)
    try{
    if(!stripTags(trimCollapse(name)) 
        || !stripTags(trimCollapse(major)) 
        || !stripTags(trimCollapse(email)) 
        || trimCollapse(bio)) {
            setError("All fields are required")
            return
            }
        const cleanedData = {
            id: Date.now(),
            name: stripTags(trimCollapse(name)),
            major: stripTags(trimCollapse(major)),
            email: stripTags(trimCollapse(email)),
            bio: trimCollapse(bio),
            image: URL.createObjectURL(image)
            }
        setValues({name: '', major: '', email: '', bio: '', image: null})
        setError("")
        setSuccess("Profile is submitted successfully")
        setTimeout(() => {
            setSuccess("")
        }, 1000)
        }catch (error) {
            setError(error.message)
        }finally {
        setIsSubmitting(false)
        }
    }

    const disabled = !stripTags(trimCollapse(name)) 
    || !stripTags(trimCollapse(major)) 
    || !stripTags(trimCollapse(email)) 
    || !stripTags(trimCollapse(bio))
    || isSubmitting
    || !error;

    return (

        <form onSubmit={handleSubmit} className="add-profile-form">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required value={name} onChange={handleChange} />

            <label htmlFor="major">Major</label>
            <input id="major" name="major" required value={major} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={email} onChange={handleChange} />
            
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" maxLength={200}required value={bio} onChange={handleChange} />

            <label htmlFor="image">Upload an image</label>
            <input id="image" name="image" type="image/*" onChange={handleChange} />

            <button disabled = {disabled}>Add Profile</button>
        </form>

    )

}


export default AddProfileForm;