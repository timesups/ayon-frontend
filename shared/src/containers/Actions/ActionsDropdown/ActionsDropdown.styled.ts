import { Dropdown } from '@ynput/ayon-react-components'
import styled from 'styled-components'

export const StyledDropdown = styled(Dropdown)`
  height: unset;
  button {
    background-color: var(--md-sys-color-surface-container-highest);
    min-height: 32px;
    & > div {
      padding: 0;
      border: 0;
      padding: 0 6px;
      gap: 0;
    }
    * {
      opacity: 1 !important;
    }

    .icon {
      vertical-align: middle;
    }

    &:hover {
      background-color: var(--md-sys-color-surface-container-highest-hover);
    }
  }

  /* developer mode */
  &.dev {
    button {
      background-color: var(--color-hl-developer-container);
      .icon {
        color: var(--color-hl-developer);
      }

      &:hover {
        background-color: var(--color-hl-developer-container-hover);
      }
    }
  }

  &.loading {
    border-radius: 4px;
  }
`

export const DropdownItem = styled.div`
  display: flex;
  gap: var(--base-gap-large);

  padding: 6px;
  padding-right: 12px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`

export const DropdownHeader = styled.div`
  color: var(--md-sys-color-outline);
  padding: 4px 6px;
`
