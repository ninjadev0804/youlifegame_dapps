import React from "react"
import Modal from "react-responsive-modal"
import {
  Input,
  NavBtn,
  StyledForm,
  StyledFormText,
} from "./styles/NavbarElements"

export const ModalSubscribe = ({
  open,
  onCloseModal,
  newsletterEmail,
  setNewsletterEmail,
  handleSubscribe,
}) => {
  return (
    <Modal
      styles={{
        modal: {
          background: "#191919",
          borderRadius: "20px",
          margin: "20px",
        },
      }}
      open={open}
      showCloseIcon={false}
      center
      onClose={onCloseModal}
    >
      <StyledForm onSubmit={(e) => setNewsletterEmail(e.target.value)}>
        <StyledFormText>Subscribe to our newsletters</StyledFormText>
        <Input
          placeholder="Enter your email address"
          type="text"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
        />
        <NavBtn onClick={handleSubscribe}>Subscribe</NavBtn>
      </StyledForm>
    </Modal>
  )
}
