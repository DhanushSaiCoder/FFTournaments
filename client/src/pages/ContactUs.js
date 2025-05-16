import React from 'react';
import "../styles/ContactUs.css";

const ContactUs = () => {
    return (
        <div className='ContactUsContainer'>
            <div className='ContactUs'>
                <h1>Contact Us</h1>
                <p>If you have any questions or feedback, please reach out to us!</p>
                <form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>

    );
}

export default ContactUs;
