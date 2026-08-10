import { AppColors } from '../AppColors';

export const AppTheme = {
  lightTheme: {
    brightness: 'light',
    fontFamily: 'Averta, sans-serif',
    primaryColor: AppColors.primaryColor,

    scaffoldBackgroundColor: AppColors.lightBackground,
    canvasColor: AppColors.lightBackground,

    cardColor: AppColors.lightSurface,
    dividerColor: AppColors.lightDivider,
    shadowColor: AppColors.lightShadow,
    hintColor: AppColors.lightHint,

    inputDecoration: {
      fillColor: AppColors.lightInputBackground,
      hintColor: AppColors.textHintLight,
    },

    colors: {
      primary: AppColors.primaryColor,
      secondary: AppColors.secondaryColor,
      surface: AppColors.lightSurface,
      onSurface: AppColors.textPrimaryLight,
      onPrimary: AppColors.textOnPrimaryLight,
    },
  },

  darkTheme: {
    brightness: 'dark',
    fontFamily: 'Averta, sans-serif',
    primaryColor: AppColors.primaryColor,

    scaffoldBackgroundColor: AppColors.darkBackground,
    canvasColor: AppColors.darkBackground,

    cardColor: AppColors.darkSurface,
    dividerColor: AppColors.darkDivider,
    shadowColor: AppColors.darkShadow,
    hintColor: AppColors.darkHint,

    inputDecoration: {
      fillColor: AppColors.darkInputBackground,
      hintColor: AppColors.textHintDark,
    },

    colors: {
      primary: AppColors.primaryColor,
      secondary: AppColors.secondaryColor,
      surface: AppColors.darkSurface,
      onSurface: AppColors.textPrimaryDark,
      onPrimary: AppColors.textOnPrimaryDark,
    },
  },
};
