export type RootStackParamList = {
    LoginScreen: undefined;
    HomeScreen: { userId: number; name: string };
    SettingsScreen: { userId: number };
    CreateAccountScreen: undefined;
    PreAgendamentoScreen: { userId: number; name: string; email?: string };
};
