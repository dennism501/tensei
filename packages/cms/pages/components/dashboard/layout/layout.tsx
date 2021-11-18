import React from 'react'
import styled from 'styled-components'

import { EuiIcon } from '@tensei/eui/lib/components/icon'
import { EuiText } from '@tensei/eui/lib/components/text'
import { EuiTitle } from '@tensei/eui/lib/components/title'
import { useEuiTheme } from '@tensei/eui/lib/services/theme'
import { EuiSpacer } from '@tensei/eui/lib/components/spacer'
import { EuiButton } from '@tensei/eui/lib/components/button'
import { EuiButtonEmpty } from '@tensei/eui/lib/components/button/button_empty'
import { AvatarContextMenu } from './avatar-context-menu'

const Sidebar = styled.div<{
  bg?: string
}>`
  display: flex;
  flex-direction: column;
  width: 64px;
  height: 100%;
  position: relative;
  border-right: ${({ theme }) => theme.border.thin};
`

const NestedSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100%;
  position: relative;
  border-right: ${({ theme }) => theme.border.thin};
`

const NestedSidebarHeader = styled.div`
  height: 75px;
  padding: 0 1.75rem;
  display: flex;
  align-items: center;
`

const NestedSidebarTitleUnderline = styled.div`
  width: 25%;
  margin: 0 1.75rem;
  ${({ theme }) => `border-bottom: ${theme.border.thin}`}
`

const SidebarWrapper = styled.div`
  display: flex;
  height: 100%;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #fff;
`

const Workspace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  border-bottom: ${({ theme }) => theme.border.thin};
`

const GroupName = styled(EuiText)`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  ${({ theme }) => `color: ${theme.colors.subdued}`}
`

const NestedSidebarGroupName = styled(EuiText)`
  font-size: 11px;
  font-weight: 500;
  padding: 0rem 1.75rem;
  text-transform: uppercase;
  ${({ theme }) => `color: ${theme.colors.subdued}`}
`

const NestedSidebarNavItem = styled.li`
  width: 100%;
`

const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SidebarContainer = styled.div`
  flex-grow: 1;
`

const Footer = styled.div`
  height: 170px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  border-top: ${({ theme }) => theme.border.thin};
`

const NavItem = styled.button<{
  active?: boolean
}>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  ${({ active, theme }) =>
    active
      ? `
    background-color: ${theme.colors.primaryTransparent};
    border-radius: ${theme.border.radius.medium};
    `
      : ``}

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
    ${({ active, theme }) =>
      active
        ? `
    color: ${theme.colors.primaryText};
    `
        : ``}
  }
`

const Logo = styled.img`
  ${({ theme }) => `border-radius: 10px;`}
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const Topbar = styled.div`
  width: 100%;
  padding: 17px 40px;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => theme.border.thin};
`

const Content = styled.div`
  width: 100%;
  padding: 40px;
  margin-bottom: 40px;
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`

const CollapseExpandIcon = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  border: ${({ theme }) => theme.border.thin};

  top: 23.5px;
  right: -14px;
  background-color: ${({ theme }) => theme.colors.ghost};
`

const TitleAndBackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const DashboardLayout: React.FunctionComponent = ({ children }) => {
  const { euiTheme } = useEuiTheme()

  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar>
          <SidebarContainer>
            <Workspace>
              <Logo
                width={40}
                height={40}
                src={
                  'https://res.cloudinary.com/bahdcoder/image/upload/v1630016927/Asset_5_4x_hykfhh.png'
                }
              ></Logo>
            </Workspace>

            <EuiSpacer size="l" />

            <GroupName textAlign="center">Main</GroupName>

            <EuiSpacer size="l" />

            <GroupName textAlign="center">Team</GroupName>
          </SidebarContainer>

          <Footer>
            <NavItem active>
              <EuiIcon type="gear" />
            </NavItem>
            <EuiSpacer size="s" />
            <NavItem>
              <EuiIcon type="help" />
            </NavItem>

            <AvatarContextMenu />
          </Footer>
        </Sidebar>
        <NestedSidebar>
          <CollapseExpandIcon>
            <EuiIcon size="s" type="arrowLeft" />
          </CollapseExpandIcon>
          <NestedSidebarHeader>
            <EuiTitle size="s">
              <h1>Content</h1>
            </EuiTitle>
          </NestedSidebarHeader>
          <NestedSidebarTitleUnderline />

          <EuiSpacer size="l" />

          <Group>
            <NestedSidebarGroupName>Resources</NestedSidebarGroupName>
          </Group>
        </NestedSidebar>
      </SidebarWrapper>
      <Body>
        <Topbar>
          <TitleAndBackButtonContainer>
            <EuiButtonEmpty iconType="arrowLeft" href="/back">
              Back
            </EuiButtonEmpty>
            <EuiTitle size="xs">
              <h3>Content</h3>
            </EuiTitle>
          </TitleAndBackButtonContainer>

          <EuiButton fill color="primary">
            Add new product
          </EuiButton>
        </Topbar>

        <Content>{children}</Content>
      </Body>
    </Wrapper>
  )
}
