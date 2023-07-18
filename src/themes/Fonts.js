import styled from 'styled-components'
import Metrics from './Metrics';
import Colors from './Colors';

const type = {
  base: '-apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, Oxygen, Ubuntu, "Open Sans", "Helvetica Neue","Noto Sans TC","微軟正黑體", sans-serif',
}

const Fonts = {
  h1: () => styled.h1`
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 36px;
    font-weight: 600;
    line-height: 38px;
  `,
  h2: () => styled.h2`
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
  `,
  h3: () => styled.h3`
    font-family: ${type.base} ;
    -webkit-font-smoothing: antialiased;
    color: ${Colors.TitleBlack};
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin: 0;
  `,
  h4: () => styled.h4`
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
  `,
  h5: () => styled.h5`
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  `,
  h6: () => styled.h6`
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  `,
  p_R: () => styled.p`    
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  `,
  P_S: () => styled.p`    
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
  `,
  info: () => styled.p`    
    font-family: ${type.base} ;
    color: ${Colors.TitleBlack};
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  p: () => styled.p`
    font-family: ${type.base} ;
    font-size: 20px;
    margin: 0;
    letter-spacing: 1px;
    line-height: 28px;
    @media (max-width: ${Metrics.tablet}){
        font-size: 16px;
        letter-spacing: 0;
        line-height: 22px;
    }
  `,
  p14: () => styled.p`
    font-family: ${type.base} ;
    font-size: 14px;
    margin: 0;
    line-height: 20px;
  `,
  p16: () => styled.p`
    font-family: ${type.base} ;
    font-size: 16px;
    margin: 0;
    line-height: 22px;
  `,
  button: () => styled.button`
    font-family: ${type.base} ;
  `
}

export default Fonts;