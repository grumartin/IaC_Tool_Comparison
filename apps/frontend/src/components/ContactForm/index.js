import React, { useEffect } from 'react'
import { Heading, FormContainer, Input, Par, InfoField, InfoData, Textarea, Button, Message, ErrorMsg} from './ContactFormElements';
import axios from "axios";
import { BtnWrap } from '../InfoSection/InfoElements';
import { useState } from 'react';


const ContactForm = () => {
  const formId = "DQuiOVN4";
  const formSparkUrl = `https://submit-form.com/${formId}`;

  const initFormState = {
      email: "",
      name: "",
      message: ""
  };

  const [formState, setFormState] = useState(initFormState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [emailError, setEmailError] = useState("false");
  const [nameError, setNameError] = useState("false");
  const [CmessageError, setCMessageError] = useState("false");

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(emailError);
    console.log(nameError);
    console.log(CmessageError);
    if(emailError !== "" || nameError !== "" || CmessageError !== "" || checkIfEmpty() === true){
        return;
    }

    setSubmitting(true);
    await postSubmission();
    setSubmitting(false);
  }

  const postSubmission = async () => {
      const payload = {
          ...formState
      };

      try{
          const result = await axios.post(formSparkUrl, payload);
          console.log(result);
          setMessage({
              color: true,
              text: "Thanks, someone will be in touch shortly"
          });
          setFormState(initFormState);
      }catch(error){
          console.log(error);
          setMessage({
            color: false,
            text: "Sorry, there was a problem. Please try again."
        });
      }
  }

  const updateFormControl = (event) => {
      const {id, value} = event.target;
      const formKey = id;
      const updateFormState = { ...formState};
      updateFormState[formKey] = value;
      setFormState(updateFormState);
  }

  const checkIfEmpty = () => {
      return formState.name.length <= 0 && formState.email.length <= 0 && formState.message.length <= 0;
  }

  const validateEmail = (email) => {
      return email && !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) 
      ? setEmailError("No valid Email") : setEmailError("");
  }

  const validateName = (name) => {
    return name && name.length <= 2 ? setNameError("Please enter your name") : setNameError("");
  }

  const validateMessage = (Cmessage) => {
    return Cmessage && Cmessage.length <= 10 ? setCMessageError("Please enter a message") : setCMessageError("");
  }

  useEffect(() => {
        validateName(formState.name);
        validateEmail(formState.email);
        validateMessage(formState.message);
  }, [formState.email, formState.name, formState.message]);

  return (
    <>
        <FormContainer onSubmit={submitForm}>
            <Heading>Contact Us</Heading>
            <Par type="Name:"><Input 
                type="text" 
                id="name"
                value={formState.name} 
                onChange={updateFormControl}
                placeholder="Write your name here.."></Input></Par>
            <ErrorMsg>{nameError === "false" ? "" : nameError}</ErrorMsg>
            <Par type="Email:"><Input 
                type="text" 
                id="email"
                value={formState.email} 
                onChange={updateFormControl}
                placeholder="Let us know how to contact you back.."></Input></Par>
            <ErrorMsg>{emailError === "false" ? "" : emailError}</ErrorMsg>
            <Par type="Message:"><Textarea 
                rows="4" 
                id="message"
                value={formState.message} 
                onChange={updateFormControl}
                placeholder="What would you like to tell us.."></Textarea></Par>
            <ErrorMsg>{CmessageError === "false" ? "" : CmessageError}</ErrorMsg>
            {message && <Message color={message.color}>{message.text}</Message>}
            <BtnWrap>
                <Button 
                    type="submit"
                    disabled={submitting}
                    smooth={true}
                    duration={500}
                    spy={true}
                    marg= "false"
                    marg2="true"
                    marg3="true"
                    exact="true"
                    primary={ 0 }
                    dark={ 0 }
                    dark2={ 1 }>{submitting ? "Submitting..." : "Send Message"}</Button>
            </BtnWrap>
            <InfoField>
                <InfoData className="fa fa-phone"></InfoData>+43 664 324324324
                <InfoData className="fa fa-envelope-o"></InfoData> kajakcenter@gmail.com
            </InfoField>
        </FormContainer>
    </>
  )
}

export default ContactForm