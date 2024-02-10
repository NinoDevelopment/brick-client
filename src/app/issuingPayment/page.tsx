'use client';
import React from 'react';
import {Container} from "react-bootstrap";
import PaymentForm from "@/components/issuingPayment-page/PaymentForm/PaymentForm";

const page = () => {
   return (
      <Container>
         <PaymentForm />
      </Container>
   );
};

export default page;