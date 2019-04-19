import React from 'react'
import {Organization} from '../templates/organization'
import {Users} from '../templates/users'
import {Roles} from '../templates/roles'

//for testing

export const routes = [
  { path: '/',
    exact: true,
    main: () => <h1>Dashboard</h1>
  },
  { path: '/users',
    main: () => <Users />
  },
  { path: '/roles', 
    main: () => <Roles />
  },
  { path: '/organizations', 
    main: () => <Organization />
  },
  {
    path: '/settings',
    main: () => <h3>Settings</h3>
  }
]