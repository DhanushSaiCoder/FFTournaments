import React from 'react';
import "../styles/ContactUs.css";

const ContactUs = () => {
    return (
        <div className='ContactUsContainer'>
            <div className='ContactUs'>
                <h1>Contact Us</h1>
                <p>If you have any questions or feedback, please reach out to us!</p>
                <form>
                    <div className="form-group floating">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder=" "
                            required
                            className="form-input"
                        />
                        <label htmlFor="name">Name</label>

                    </div>
                    <div className="form-group floating">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder=" "
                            required
                            className="form-input"
                        />
                        <label htmlFor="email">Email</label>

                    </div>
                    <div className="form-group floating">
                        <textarea
                            type="text"
                            id="message"
                            name="message"
                            placeholder=" "
                            required
                            className="form-input textareaInp"
                            rows={4}
                        />
                        <label htmlFor="message">Write message here...</label>
                    </div>

                    <button className='contactUsSubmitBtn' type="submit">Send</button>
                </form>
            </div>
        </div>

    );
}

export default ContactUs;
