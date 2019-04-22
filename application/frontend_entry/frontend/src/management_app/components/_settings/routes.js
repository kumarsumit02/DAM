import React from 'react'
import {Organization} from '../templates/organization'
import {Users} from '../templates/users'
import {Roles} from '../templates/roles'

//for testing

export const routes = [
  { path: '/',
    exact: true,
    main: () => <Users />
  },
  { path: '/users',
    main: () => <Users />
  },
  { path: '/roles', 
    main: () => <Roles />
  },
  { path: '/organizations', 
    main: () => <Organization />
  }
]