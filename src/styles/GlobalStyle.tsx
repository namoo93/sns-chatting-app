import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --toastify-color-success:#15979e;
  --toastify-color-error:#ff0000;
  --toastify-color-warning:#E78326;
  --toastify-color-info:#007aff;

  html, body {
    margin: 0;
    padding: 0;
    height:100vh;
  }
 
  #root{
    height:100%;
    overflow: hidden;
  }
}

/**
 * ==============================================
 * Dot Pulse (Loading for SwrContainer)
 * ==============================================
 */

.dot-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
  margin: 0 -5%;
  overflow: hidden;
}
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ccc;
  color: #ccc;
  box-shadow: 9999px 0 0 -5px #ccc;
  animation: dotPulse 1.5s infinite linear;
  animation-delay: 0.25s;
}

.dot-pulse::before,
.dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ccc;
  color: #ccc;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #ccc;
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #ccc;
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: 0.5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px #ccc;
  }
  30% {
    box-shadow: 9984px 0 0 2px #ccc;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #ccc;
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px #ccc;
  }
  30% {
    box-shadow: 9999px 0 0 2px #ccc;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px #ccc;
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px #ccc;
  }
  30% {
    box-shadow: 10014px 0 0 2px #ccc;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #ccc;
  }
}

`;

export default GlobalStyle;
