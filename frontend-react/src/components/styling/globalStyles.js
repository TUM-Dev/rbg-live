import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  .btn {
      color: ${({ theme }) => theme.button_color};
      border-color: ${({ theme }) => theme.button_border};
  }
  .my-accordion .list-group-item {
      background: ${({ theme }) => theme.accordion_background};
      color: ${({ theme }) => theme.text};
  }
  .fa-bars {
      color: ${({ theme }) => theme.button_color};
  }
  .fa-paperclip {
      color: ${({ theme }) => theme.button_color};
  }
  .nav-link {
      color: ${({ theme }) => theme.button_color}
  }
  #frame {
      background: ${({ theme }) => theme.accordion_background};
  }
  `