import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationStackParamList = {
    Feed: undefined;
    PostEditor: undefined;
};

export type FeedNavigationProps = NativeStackScreenProps<NavigationStackParamList, 'Feed'>;
export type PostEditorNavigationProps = NativeStackScreenProps<NavigationStackParamList, 'PostEditor'>;