import { Spinner } from '@/components'
import { NavLink as RouterLink } from 'react-router'
import './common.scss'

export function Nav() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <RouterLink to='/' className={({ isActive }) => (isActive ? 'active' : '')} viewTransition aria-label='首页'>
            Index
          </RouterLink>
        </li>
        <li>
          <RouterLink to='/home' className={({ isActive }) => (isActive ? 'active' : '')} viewTransition aria-label='主页'>
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink to='/performance' className={({ isActive }) => (isActive ? 'active' : '')} viewTransition aria-label='性能'>
            Performance
          </RouterLink>
        </li>
        <li>
          <RouterLink to='/about' className={({ isActive }) => (isActive ? 'active' : '')} viewTransition aria-label='关于'>
            {({ isPending }) => <span>About {isPending && <Spinner />}</span>}
          </RouterLink>
        </li>
      </ul>
    </nav>
  )
}
