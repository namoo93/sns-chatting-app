import {css} from 'styled-components';
import {COLOR} from 'constants/COLOR';

export const IsMe = css`
  &::before {
    content: 'Me';
    display: block;
    color: #fff;
    position: absolute;
    top: 5px;
    left: 5px;
    background: ${COLOR.PRIMARY};
    border-radius: 8px;
    font-size: 12px;
    line-height: 16px;
    width: 24px;
    text-align: center;
    z-index: 99;
  }
`;
