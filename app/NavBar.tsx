'use client';

import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'



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

    return (
        <Box>
            {
                status === 'authenticated' && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Avatar src={session.user!.image!}
                                fallback="?"
                                size={"2"}
                                radius='full'
                                className='cursor-pointer'
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label><Text>{session.user!.email}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Item>
                                <Button><Link href={"/api/auth/signout"}>Log out</Link></Button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>

                    </DropdownMenu.Root>



                )

            }
            {
                status === "unauthenticated" && <Link href={"/api/auth/signin"}>Log in</Link>
            }

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
            label: 'Issue', href: '/issues'
        }
    ]
    return (
        <ul className='flex space-x-6'>

            {links.map(link =>
                <li key={link.href}>  <Link
                    href={link.href} 
                    className={`${link.href === currentPath ? `text-zinc-900` : `text-zinc-500`} hover:text-zinc-800 transition-colors`}>
                    {link.label}</Link> </li>)}
        </ul>
    )
}