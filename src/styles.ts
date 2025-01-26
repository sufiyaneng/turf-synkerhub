import { extendTheme } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-38px)",
};

const theme = extendTheme({
  styles: {
    global: {
      html: {
        height: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      "*": {
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        color: "#202020",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
    },
  },
  colors: {
    brand: {
      50: "#eaf0fa",
      100: "#c0d3f1",
      200: "#96b5e8",
      300: "#6d98df",
      400: "#437bd6",
      500: "#2961bc",
      600: "#204c92",
      700: "#173669",
      800: "#0e203f",
      900: "#0e203f",
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
        size: "sm",
      },
      sizes: {
        sm: {
          fontSize: "13px",
          px: 4,
          py: 2,
        },
      },
      baseStyle: {
        fontSize: "sm",
        fontWeight: "normal",
        borderRadius: "4px",
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              color: "gray.500",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              px: 2,
              transition: "all 0.2s ease-in-out",
              transformOrigin: "left top",
              fontSize: "13px",
            },
          },
        },
      },
    },
    Input: {
      sizes: {
        md: {
          field: {
            h: "48px",
            lineHeight: "48px",
            boxShadow: "none",
            borderRadius: "4px",
          },
        },
      },
      defaultProps: {
        size: "md",
      },
      variants: {
        outline: {
          field: {
            _focus: {
              boxShadow: "none",
              borderColor: "brand.500",
              borderWidth: "2px",
            },
            _hover: {
              boxShadow: "none",
              borderColor: "gray.300",
              borderWidth: "2px",
            },
            _active: {
              boxShadow: "none",
              borderColor: "gray.300",
              borderWidth: "2px",
            },
            borderColor: "gray.200",
            borderWidth: "2px",
          },
        },
      },
      baseStyle: {
        field: {
          fontSize: "13px",
        },
      },
    },
  },
});


export const Tile = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
  &:active {
    background-color: #dcdcdc;
  }
  border: 1px solid #2961bc;
`

export default theme;
