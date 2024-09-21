import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions (FAQ)</h1>

      <div className="faq-item">
        <h2>Can my friends join next year?</h2>
        <p>Definitely! Ask your tutor to add your friends to the list of students for the next semester.</p>
      </div>

      <div className="faq-item">
        <h2>Where is our investment money coming from?</h2>
        <p>Individuals who have benefitted from stock market gains, and want to give back, so they have donated money to the nonprofit organization.
          Additionally, companies or organizations that want to sponsor a chapter of students.</p>
      </div>

      <div className="faq-item">
        <h2>Do I own my fund?</h2>
        <p>While you are in the program, the investments are technically part of a pooled fund under the First Generation Investors name. The investment funds are distributed to you once you graduate high school (and are 18 years of age).</p>
      </div>

      <div className="faq-item">
        <h2>Can I lose money?</h2>
        <p>Not really, because the money is being given to you! You won't have to pay out of pocket for any investments. Theoretically, if all your funds dropped to zero, you would end up with no more or less than you started with (except you will gain an awesome free education). Risks of investing never disappear, however, and the lessons teach you how to mitigate those risks.</p>
      </div>

      <div className="faq-item">
        <h2>What are the objectives of the FGI program?</h2>
        <p>
          Dramatically increase the number of “First Generation Investors” - young people who begin to benefit from ownership of stocks. Teach high school students about: long-term saving, including the concepts of compounding, diversification and dollar-cost averaging,
          what stocks are and how they work, and how to participate in the investment economy.
          Ultimately, FGI helps large numbers of people to benefit from stock market returns.</p>
      </div>

      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>If you have any further questions, feel free to contact us:</p>
        <ul>
          <li><strong>Dylan Ingerman (CEO): </strong><a href="mailto:Dylan@firstgenerationinvestors.com">Dylan@firstgenerationinvestors.com</a></li>
          <li><strong>Cole Mattox (VP): </strong><a href="mailto:Cole@firstgenerationinvestors.com">Cole@firstgenerationinvestors.com</a></li>
        </ul>
      </div>

    </div>
  );
};

export default FAQ;