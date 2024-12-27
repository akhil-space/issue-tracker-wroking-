'use client';

import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from "classnames"
import Skeleton from './components/Skeleton';



const NavBar = () => {
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container >
                <Flex justify={"between"}>
                    <Flex align={"center"} gap={"3"}>
                        <Link href="/"><AiFillBug />
                        </Link>
                        {/** Nav links */}
                        <NavLinks />
                    </Flex>
    {/* box  auth component */}
                    <AuthComponent />
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar

const AuthComponent = () => {
    const { status, data: session } = useSession();

if(status === "loading") return <Skeleton width={"3rem"}/>

if(status === "unauthenticated")
    return  <Box><Link  className = "nav-link" href={"/api/auth/signin"}>Log in</Link></Box>

    return (
        <Box>
            <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Avatar src={session!.user!.image!}
                                fallback="?"
                                size={"2"}
                                radius='full'
                                className='cursor-pointer'
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label><Text>{session!.user!.email}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Item>
                                <Button><Link href={"/api/auth/signout"}>Log out</Link></Button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>

                    </DropdownMenu.Root>
       </Box>
    )
}

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        {
            label: 'Dashboard', href: '/'
        },
        {
            label: 'Issue', href: '/issues/list'
        }
    ]
    return (
        <ul className='flex space-x-6'>

            {links.map(link =>
                <li key={link.href}>  <Link
                    href={link.href} 
                    className={
                        classnames({
                            
                                "nav-link " : true,
                                 "!text-zinc-900" :link.href === currentPath 
                                 
                        })
                    }>


                    {link.label}</Link> </li>)}
        </ul>
    )
}