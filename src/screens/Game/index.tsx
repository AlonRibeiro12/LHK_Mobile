import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameParams } from '../../@types/navigation';

import { THEME } from '../../theme';
import { styles } from './styles';

import { Background, DuoCard, DuoCardProps, Heading, DuoMatch } from '../../components';

function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordUser, setDiscordUser] = useState('');
  const isModalOpen = discordUser.length > 0;
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const handleGoBack = () => {
    navigation.goBack();
  }

  const getDiscordUser = async (adsId: string) => {
    const response = await fetch(`http://10.0.0.208:3333/ads/${adsId}/discord`);
    const data = await response.json();
    setDiscordUser(data.discord);
  }

  useEffect(() => {
    const getGames = async () => {
      const response = await fetch(`http://10.0.0.208:3333/games/${game.id}/ads`);
      const data = await response.json();
      console.log(data);
    };

    getGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.headerRight} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={duos.length ? styles.contentList : styles.emptyListContent}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>Não há anúncios publicados ainda.</Text>
          )}
        />

        <DuoMatch visible={isModalOpen} discord={discordUser} onClose={() => setDiscordUser('')} />
      </SafeAreaView>
    </Background>
  );
}

export default Game;
