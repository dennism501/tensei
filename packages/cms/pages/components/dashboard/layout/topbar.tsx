import React from 'react'
import styled from 'styled-components'

const Topbar = styled.div`
  width: 100%;
  height: 75px;
  padding: 17px 40px;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => theme.border.thin};
`

export const TopbarMenu: React.FunctionComponent = ({ children }) => {
  return <Topbar>{children}</Topbar>
}
