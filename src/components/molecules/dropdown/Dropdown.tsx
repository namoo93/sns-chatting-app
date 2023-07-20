import React from 'react';
import styled, { css } from 'styled-components';
import { COLOR } from 'constants/COLOR';
import {
  MenuButton,
  MenuList,
  MenuItem,
  Dropdown as MenuWrapper,
} from 'react-menu-list';

export type CustomDropdownStyleProps = {
  x?: number;
  y?: number;
  open?: boolean;
  width?: number;
  subPosition?: 'left' | 'right';
};

const StyledWrapper = css`
  background: #fff;
  z-index: 999;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
`;

const StyledMenuItem = css`
  color: ${COLOR.BLACK};

  cursor: pointer;
  font-size: 14px;
  padding: 12px 20px;
  &:hover {
    background: #fcf2e8;
  }
`;

const CustomDropdownWrapper = styled.div<CustomDropdownStyleProps>`
  ${StyledWrapper}
  position:fixed;
  ${({ x, y, open, width }) => {
    return css`
      width: ${width}px;
      top: ${y}px;
      left: ${x}px;
      display: ${open ? 'block' : 'none'};
    `;
  }}
`;

const CustomDropdownMenuList = styled.ul``;

const CustomDropdownMenuItem = styled.li`
  ${StyledMenuItem}
  position:relative;
  > div {
    display: none;
  }
  &:hover {
    > div {
      display: block;
    }
  }
`;

const CustomSubDropdownWrapper = styled.div<CustomDropdownStyleProps>`
  ${StyledWrapper}
  width:${({ width }) => width}px;
  position: absolute;
  top: 10px;
  ${({ subPosition }) => {
    if (subPosition === 'right') {
      return css`
        left: 40px;
      `;
    } else {
      return css`
        right: 40px;
      `;
    }
  }}
`;

export const CustomDropdown: React.FC<
  CustomDropdownStyleProps & {
    menuList: {
      label: string;
      onClick: () => void;
      subMenu?: { label: string; onClick: () => void }[];
    }[];
  }
> = ({ x, y, open, width, menuList, subPosition }) => {
  const options = {
    x,
    y,
    open,
    width,
  };
  return (
    <CustomDropdownWrapper {...options}>
      <CustomDropdownMenuList>
        {' '}
        {menuList.map((menuItem, i) => {
          return (
            <CustomDropdownMenuItem key={i} onClick={menuItem.onClick}>
              {menuItem.label}
              <CustomSubDropdownWrapper width={width} subPosition={subPosition}>
                <CustomDropdownMenuList>
                  {menuItem.subMenu &&
                    menuItem.subMenu.map((subMenuItem, i) => {
                      return (
                        <CustomDropdownMenuItem
                          key={i}
                          onClick={subMenuItem.onClick}>
                          {subMenuItem.label}
                        </CustomDropdownMenuItem>
                      );
                    })}
                </CustomDropdownMenuList>
              </CustomSubDropdownWrapper>
            </CustomDropdownMenuItem>
          );
        })}
      </CustomDropdownMenuList>
    </CustomDropdownWrapper>
  );
};

export interface DropdownStyleProps {
  width: number;
  x?: number;
  y?: number;
}

type DropdownProps = {
  menuList: { label: string; onClick: () => void }[];
  renderButton: () => React.ReactNode;
};

const RestyledDropdownWrapper = styled.div<{ x?: number; y?: number }>`
  ${StyledWrapper}
  > div {
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }
  ${({ x, y }) => {
    return css`
      margin-top: ${y}px;
      margin-left: ${x}px;
    `;
  }}
`;
// @ts-ignore
const RestyledDropdownMenuList = styled(MenuList)``;
// @ts-ignore
const RestyledDropdownMenuItem = styled(MenuItem)<{ width: number }>`
  list-style: none;
  ${StyledMenuItem}
  width: ${({ width }) => width}px;
  height: 42px;
`;

export function Dropdown({
  menuList,
  width,
  x,
  y,
  renderButton,
}: DropdownProps & DropdownStyleProps) {
  return (
    // @ts-ignore
    <MenuButton
      menu={
        <RestyledDropdownWrapper x={x} y={y}>
          {/* @ts-ignore */}
          <MenuWrapper>
            <RestyledDropdownMenuList>
              {menuList.map((menuItem, i) => {
                return (
                  <RestyledDropdownMenuItem
                    key={i}
                    width={width}
                    onItemChosen={menuItem.onClick}>
                    {menuItem.label}
                  </RestyledDropdownMenuItem>
                );
              })}
            </RestyledDropdownMenuList>
          </MenuWrapper>
        </RestyledDropdownWrapper>
      }>
      {renderButton()}
    </MenuButton>
  );
}
