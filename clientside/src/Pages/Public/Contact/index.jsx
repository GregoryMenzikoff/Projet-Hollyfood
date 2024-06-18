import {useState} from 'react';

const Contact = () => {

    const [editContact, setEditContact] = useState({
        name: '',
        email: '',
        title: '',
       content: ''
    });

    const handleChange = (e) => {
        setEditContact({
            ...editContact, // ancien état du state
            [e.target.name]: e.target.value // la valeur name de l'input (name, email, title, content) contient désormais le target value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        {
            alert(`Merci pour votre message ${editContact.email}`);
            const templateId = 'template_xsvtu9c';
            const serviceID = 'hollyfood';
            sendFeedback(serviceID, templateId, { from_name: editContact.name, message: editContact.content, title: editContact.title, reply_to: editContact.email })
            e.target.reset();
        }
    }
            
    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }

    return (
        <main className='flex flex-col text-center mb-2'>
            <h2 className="text-lg font-medium my-2 underline underline-offset-4">Nous contacter :</h2>
            <form action="/" method="post" onSubmit={handleSubmit}>
            
                <div className='flex flex-col items-center mb-2'>
                    <label htmlFor="/">Nom</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="text" name="name" id="name" required placeholder="Rentrez votre nom" onChange={handleChange} />
                </div>
                <div className='flex flex-col items-center mb-2'>
                    <label htmlFor="/">Adresse mail</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="email" name="email" id="email" required placeholder="Rentrez votre adresse e-mail" onChange={handleChange} />
                </div>
                <div className='flex flex-col items-center mb-2'>
                    <label htmlFor="/">Titre</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="text" name="title" id="title" required placeholder="Sujet de votre message" maxLength={100} onChange={handleChange} />
                </div>
                <div className="flex flex-col items-center" >
                    <label className="mr-2" htmlFor="/">Message</label>
                    <textarea className='w-3/5  bg-yellow-50 rounded-lg border-2 border-yellow-400' name="content" id="content" required placeholder="Expliquez votre message" onChange={handleChange}></textarea>
                </div>
                <button className='my-4 bg-yellow-400 px-6 py-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400' type="submit">Envoyer</button>
            </form>
        </main>
    )
};

export default Contact;