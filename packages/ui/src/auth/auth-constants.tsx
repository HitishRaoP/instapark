import React from 'react';
import { FaRegUser } from 'react-icons/fa';

export const USER_BUTTON_PUBLIC_ITEMS = [
	{ name: 'Sign Up', link: '/auth?show=signup' },
	{ name: 'Sign In', link: '/auth' },
];

export const USER_BUTTON_DEFAULT_PROTECTED_ITEMS = [
	{
		group: 'Account',
		items: [{ icon: <FaRegUser />, link: '/profile', name: 'Profile' }],
	},
];
