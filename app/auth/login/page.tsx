'use client';
import { Box, Button, Container, Text } from '@radix-ui/themes'
import React from 'react'
import CredentialLogin from './CredentialLogin'
import EventAblyLogin from './EventablyLogin'
import { signIn } from 'next-auth/react'

const page = () => {


    const handleOAuthLogin = (provider: string) => {
        // Trigger OAuth login for Google, GitHub, etc.
        signIn(provider, { callbackUrl: "/" });
      };
  return (
    <Box width="100%" p="2rem">
    
      <CredentialLogin />
   
      <EventAblyLogin /> 

      
      <Box >
        {/* OAuth Login Options */}
        <Container maxWidth="400px"   >
        
        <Button 
          onClick={() => handleOAuthLogin("google")}
          style={{
            backgroundColor: '#db4437',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: '5px',
           
          }}
        >
          Login with Google
        </Button>
        <Button 
          onClick={() => handleOAuthLogin("github")}
          style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: '5px',
           
          }}
        >
          Login with GitHub
        </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default page
