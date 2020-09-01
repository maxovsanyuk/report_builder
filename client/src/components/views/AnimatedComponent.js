import styled from "styled-components";

export const AnimatedComponent = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  overflow: auto;
  animation: appearingComp 0.3s ease-in-out 0s 1 normal forwards;

  @keyframes appearingComp {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
