import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  }
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground source={{uri: data.bannerUrl}} style={styles.bannerUrl}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.title}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {data._count.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default GameCard;
