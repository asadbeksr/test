import { Box, MenuItem, MenuList, styled } from '@mui/material'
import { DropDownItem } from '@components/UI/Sidebar/Menu/DropDownItem'

const menuData = {
  items: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      items: [
        {
          label: 'Company',
          href: '/about/company',
        },
        {
          label: 'Team',
          href: '/about/main-team',
        },
      ],
    },
  ],
}
const MenuWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderTop: `1px solid ${theme.palette.bgr}`,
  padding: '20px 0',
}))

const SMenuList = styled(MenuList)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '6px',

}))

const SMenuItem = styled(MenuItem)(({ theme }) => ({
  width: '100%',
  padding: 0,
  margin: 0,
}))


export const Menu = () => {
  const { items } = menuData

  return (
    <MenuWrapper data-testid="sidebar-menu">
      <SMenuList>
        {items.map((item, index) => (
          <SMenuItem
            as='ul'
            key={index}
          >
            <DropDownItem item={item} />
          </SMenuItem>
        ))}
      </SMenuList>
    </MenuWrapper>
  )
}
