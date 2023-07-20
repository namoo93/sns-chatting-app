import { COLOR } from 'constants/COLOR';
import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  label: string;
  selected: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface TabStyleProps {
  active: boolean;
  onClick: () => void;
}

const TabButton = styled.button<TabStyleProps>`
  align-items: center;
  border-bottom-style: solid;
  display: flex;
  height: 50px;
  justify-content: center;
  width: 100%;

  ${({ active }) =>
    active
      ? `border-bottom-color: ${COLOR.PRIMARY}; border-bottom-width: 2px; color: ${COLOR.PRIMARY};`
      : `border-bottom-color: #ededed; border-bottom-width: 1px; color: ${COLOR.TEXT_GRAY};`}
`;

const ButtonText = styled.span<{ active: boolean }>`
  font-size: 14px;

  ${({ active }) =>
    active
      ? `color: ${COLOR.PRIMARY}; font-weight: 500;`
      : `color: ${COLOR.TEXT_GRAY}; font-weight: normal`}
`;

const Tab = ({ label, selected, value, onChange,className }: TabProps) => (
  <TabButton
    className={className}
    active={value === selected}
    onClick={() => onChange(value)}>
    <ButtonText active={value === selected}>{label}</ButtonText>
  </TabButton>
);

interface MenuProps {
  label: string;
  value: string;
}

interface Props {
  menu?: MenuProps[];
  initialValue?: string;
	length: number;
  className?: string;
  setTabValue?: (value) => void;
}


const TabMenuContainer = styled.div<{length: number}>`
	display: grid; 
	${({length}) => `grid-template-columns: repeat(auto-fit, minmax( calc(100% / ${length}), auto));`} 
`

export const TabMenu = ({ menu = [], initialValue = '', length ,className, setTabValue }: Props) => {
	const [selected, setSelected] = useState(initialValue);

  const handleChange = value => {
    setSelected(value); 
    setTabValue && setTabValue(value);
  };
	
	return (
		<TabMenuContainer length={length} >
			{menu.map(({ label, value }) => (
				<Tab
          className={className}
					key={value}
					label={label}
					selected={selected}
					value={value}
					onChange={handleChange}
				/>
			))}
		</TabMenuContainer>
	);
};
