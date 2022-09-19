import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import Heading from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
};

function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);
  const handleCopyUser = async () => {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Copy Successful!');
    setIsCopying(false);
  };

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading title="Let's play" subtitle="Agora é só começar a jogar!" style={styles.headingContent} />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            onPress={handleCopyUser}
            style={styles.discordButton}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

export default DuoMatch;
