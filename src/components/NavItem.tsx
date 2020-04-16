/** @jsx jsx */
import { jsx, css } from '@emotion/core';

interface Props {
  iconName: string;
  text: string;
}

const NavItem: React.FunctionComponent<Props> = ({ iconName, text }) => (
  <li
    css={css`
      padding-top: .2em;
      padding-bottom: .2em;
      display: flex;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
    `}
  >
    <i className={`im im-${iconName}`} css={css`
      font-size: 1em;
      display: block;
      width: 1.2em;
      color: var(--nord8);
      position: relative;
      bottom: -2px;
    `}/>
    <span css={css`
      display: block;
      margin-left: .75rem;
      color: var(--nord4);
      font-weight: 700;
      transition: all ease .2s;
      position: relative;
      left: 0;
      :hover {
        left: -.2em;
      }
    `}>
      { text }
    </span>
  </li>
);

export default NavItem;
