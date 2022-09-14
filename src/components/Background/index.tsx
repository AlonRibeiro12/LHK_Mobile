import { ImageBackground } from 'react-native';

import imgBackground from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface Props {
  children: React.ReactNode;
}

function Background({ children }: Props) {
  return (
    <ImageBackground
      source={imgBackground}
      defaultSource={imgBackground}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}

export default Background;
