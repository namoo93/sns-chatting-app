import {ContactsList} from '../molecules';
import styled from 'styled-components';
import {Icon} from 'components/atom';
import {Dispatch, SetStateAction} from 'react';
import {IContact} from 'modules/contacts/types';

const Container = styled.div`
  margin-bottom: 12px;
`;

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 20px;
  flex-direction: row;
  align-content: stretch;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  p {
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: #bbb;
    span {
      color: #f68722;
    }
  }
`;

export type FeatureContactsListProps = {
  data?: IContact[];
  title?: string;
  toggle?: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

export const FeatureContactsList = ({data, title, setToggle, toggle}) => {
  return (
    <>
      <Container>
        <ListHeader onClick={() => setToggle(!toggle)}>
          <p>
            {title} <span>{data?.length}</span>
          </p>
          {data?.length > 0 && (
            <Icon
              size={12}
              marginLeft={2}
              src={
                toggle
                  ? '/images/icon/ic-fold-12.png'
                  : '/images/icon/ic-open-12.png'
              }
              inline
            />
          )}
        </ListHeader>
        {toggle && <ContactsList data={data} />}
      </Container>
    </>
  );
};
