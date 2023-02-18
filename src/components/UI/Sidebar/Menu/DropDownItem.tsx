import { useState } from 'react'
import {
  Box, ListItem, ListItemIcon, ListItemButton, Typography, styled
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { MenuItemTS } from '@utils/types'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

interface DropDownItemProps {
  item: MenuItemTS
}

const ListWrapper = styled(Box)(({ theme }) => ({
  width: '100%',

}))

const SListItemButton = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '5px',
  fontSize: '14px',
  color: theme.palette.white,
  svg: {
    fill: theme.palette.white
  }
}))

const SListItem = styled(ListItem)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
}))

const LinkItem = styled(Link)(({ theme }) => ({
  textAlign: 'start',
  width: '100%',
  p: {
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '14px',
    color: theme.palette.white
}}))

const SListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
}))

export const DropDownItem = ({ item }: DropDownItemProps) => {
  const { pathname } = useLocation()
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const currentIcon = isDropDownOpen ? <ArrowDropUp /> : <ArrowDropDown />
  const isActivePage = pathname === item.href

  if (item.items) {
    return (
      <ListWrapper>
        <SListItemButton onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
          {item.label}
          <SListItemIcon sx={{ marginLeft: 'auto' }}>{currentIcon}</SListItemIcon>
        </SListItemButton>
        {isDropDownOpen &&
          item.items.map((child, index) => (
            <SListItem key={index}>
              <DropDownItem item={child} />
            </SListItem>
          ))}
      </ListWrapper>
    )
  } else {
    return (
      <LinkItem to={item.href || '#'}>
        <Typography sx={isActivePage ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}>
          {item.label}
        </Typography>
      </LinkItem>
    )
  }
}
