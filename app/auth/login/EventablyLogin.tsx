"use client";
import { Box, Button, Container, Text, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";


const EventAblyLogin = () =>{ 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

const router = useRouter()
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        pass: password,
        ip: "192.168.168.5",
        redirect:false
      };
      console.log("triiger.");
      
    const res = await signIn("eventably", data );
 if (res?.error) {
        setError('Login failed');
        console.log("Login error:", res.error);
      }


    
      if(res?.ok){
        setError('Login Success');
        console.log("Login successful:", res);
        router.push('/')
      }
     
    } catch (err) {
      console.log("error :", err);
      setError(`something went wrong ${err}` );
     
    }
  };


  return (
  // {width="100%" p="2rem"}
    <Box >
    <Container maxWidth="400px"   >
    <Text> Login with Eventably</Text>
     

      {error &&  <Text > {error}</Text>}
      <form onSubmit={handleSubmit}>
        <TextField.Root 
          placeholder="Email..." 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
          style={{ marginBottom: '1rem' }}
        />
        <TextField.Root 
          placeholder="Password..." 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        
          type="password"
          style={{ marginBottom: '1rem' }}
        />
        
        <Button 
          type="submit"
        
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            fontSize: '1rem',
          }}
        >
          Login
        </Button>
      </form>

     

      <Toaster />
    </Container>
  </Box>
  
  );
};

export default EventAblyLogin;
