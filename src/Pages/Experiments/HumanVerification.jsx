import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios'

const HumanVerification = () => {

  // const handleCaptchaVerification = (response) => {
  //   // Handle the CAPTCHA response (send it to your server for validation, etc.)
  //   console.log('CAPTCHA response:', response);
  // };

  // const verifyCaptcha = async (userResponse) => {
  //   const secretKey = '6LdD9rknAAAAAAFfQgCrMP0cYKMkr7HpHRcZG0fk';
  //   const url = `https://www.google.com/recaptcha/api/siteverify`;

  //   const response = await axios.post(url, null, {
  //     params: {
  //       secret: secretKey,
  //       response: userResponse,
  //     },
  //   });

  //   return response.data.success;
  // };

  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };

  useEffect(() => {

    if (token)
      console.log(`hCaptcha Token: ${token}`);
  }, [token]);


  return (
    <div>
      {/* Other form fields */}
      {/* <ReCAPTCHA
        sitekey='6Le2-icoAAAAAO6SWFL_y_BvwL2-Rafo3KGBmH6M'
        onChange={handleCaptchaVerification}
      /> */}

      <HCaptcha
        sitekey="cbf8c168-af51-486a-ad4d-333c3947ab6b"
        onLoad={onLoad}
        onVerify={setToken}
        ref={captchaRef}
      />

      {/* Submit button */}
    </div>
  );
};

export default HumanVerification;
