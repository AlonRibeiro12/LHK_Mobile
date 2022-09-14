import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';

import { GAMES } from '../../utils/games';

import imgLogo from '../../assets/logo-nlw-esports.png'
import { GameCard, Heading } from '../../components';

function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={imgLogo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  )
}

export default Home;
