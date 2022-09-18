import { useEffect, useState } from 'react';
import {  Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background, GameCard, GameCardProps, Heading, Loading } from '../../components';

function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  const handleOpenGame = (item: GameCardProps) => {
    navigation.navigate('game', { ...item });
  }

  useEffect(() => {
    const getGames = async () => {
      const response = await fetch('http://10.0.0.208:3333/games/');
      const data = await response.json();
      setGames(data);
    };

    getGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logoImg} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GameCard onPress={(() => handleOpenGame(item))} data={item} />}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Loading />}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}

export default Home;
