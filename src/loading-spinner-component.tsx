import { HisafeElement } from './hisafe/hisafe-element.js';
import hisafe from './hisafe/hisafe.js';
import { colors } from './theme.js';

interface LoadingSpinnerState {}
export class LoadingSpinnerComponent extends HisafeElement<LoadingSpinnerState> {
  constructor() {
    super({});
  }

  html(): Node {
    return <div class="lds-dual-ring"></div>
  }

  css = () => {
    return `
    .lds-dual-ring {
      display: inline-block;
      width: 80px;
      height: 80px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid ${colors.primary};
      border-color: ${colors.primary} transparent ${colors.primary} transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }    
    `;
  };
}
