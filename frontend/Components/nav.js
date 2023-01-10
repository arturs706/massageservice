//create a nav component 
import ChocolateNavButton from './hamburger';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
    return (
        <nav>
            <div className='navItems'>
                <ChocolateNavButton/>
                <Image src='/logo.svg' alt='logo' width={120} height={120} />
            </div>
            <div className='navItemsTwo'>
                <Link href='/'>Home</Link>
                <Link href='/about'>About</Link>
                <Link href='/contact'>Contact</Link>
                <Link href='/gallery'>Account</Link>
            <div className='social'></div>
            </div>
        </nav>
    )
}

export default Nav;