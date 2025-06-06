/**
 * Translations for the application
 * 
 * Structure:
 * {
 *   [languageCode]: {
 *     [namespace]: {
 *       [key]: 'translation'
 *     }
 *   }
 * }
 */

const translations = {
  // English translations
  en: {
    common: {
      appName: 'FoodFusion',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      language: 'Language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      seeAll: 'See All',
      viewMore: 'View More',
      goBack: 'Go Back',
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      name: 'Name',
      phoneNumber: 'Phone Number',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
    },
    navigation: {
      home: 'Home',
      restaurants: 'Restaurants',
      orders: 'Orders',
      cart: 'Cart',
      profile: 'Profile',
      settings: 'Settings',
      favorites: 'Favorites',
      offers: 'Offers',
    },
    restaurant: {
      distance: 'Distance',
      rating: 'Rating',
      cuisineType: 'Cuisine Type',
      deliveryTime: 'Delivery Time',
      minOrder: 'Minimum Order',
      deliveryFee: 'Delivery Fee',
      featured: 'Featured',
      popular: 'Popular',
      topRated: 'Top Rated',
      new: 'New',
      open: 'Open',
      closed: 'Closed',
      minutes: 'minutes',
      menu: 'Menu',
      reviews: 'Reviews',
      information: 'Information',
      openingHours: 'Opening Hours',
      address: 'Address',
      call: 'Call',
      directions: 'Directions',
      share: 'Share',
    },
    food: {
      addToCart: 'Add to Cart',
      customize: 'Customize',
      ingredients: 'Ingredients',
      allergies: 'Allergies',
      nutritionInfo: 'Nutrition Info',
      spicyLevel: 'Spicy Level',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      glutenFree: 'Gluten Free',
      popular: 'Popular',
      recommended: 'Recommended',
    },
    cart: {
      myCart: 'My Cart',
      subTotal: 'Subtotal',
      deliveryFee: 'Delivery Fee',
      tax: 'Tax',
      total: 'Total',
      checkout: 'Checkout',
      emptyCart: 'Your cart is empty',
      continueToPayment: 'Continue to Payment',
      addMore: 'Add More Items',
      applyCoupon: 'Apply Coupon',
      couponCode: 'Coupon Code',
      apply: 'Apply',
    },
    order: {
      myOrders: 'My Orders',
      orderDetails: 'Order Details',
      orderNumber: 'Order Number',
      orderDate: 'Order Date',
      orderStatus: 'Order Status',
      orderTotal: 'Order Total',
      trackOrder: 'Track Order',
      reorder: 'Reorder',
      cancelOrder: 'Cancel Order',
      contactSupport: 'Contact Support',
      deliveryAddress: 'Delivery Address',
      paymentMethod: 'Payment Method',
      estimatedDelivery: 'Estimated Delivery',
      preparing: 'Preparing',
      onTheWay: 'On The Way',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    },
    profile: {
      myProfile: 'My Profile',
      personalInformation: 'Personal Information',
      savedAddresses: 'Saved Addresses',
      paymentMethods: 'Payment Methods',
      notifications: 'Notifications',
      preferences: 'Preferences',
      helpSupport: 'Help & Support',
      termsConditions: 'Terms & Conditions',
      privacyPolicy: 'Privacy Policy',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      deleteAccount: 'Delete Account',
    }
  },
  
  // Arabic translations
  ar: {
    common: {
      appName: 'فود فيوجن',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'تم بنجاح',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      language: 'اللغة',
      theme: 'المظهر',
      lightMode: 'الوضع المضيء',
      darkMode: 'الوضع المظلم',
      seeAll: 'عرض الكل',
      viewMore: 'عرض المزيد',
      goBack: 'رجوع',
    },
    auth: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      resetPassword: 'إعادة تعيين كلمة المرور',
      name: 'الاسم',
      phoneNumber: 'رقم الهاتف',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
    },
    navigation: {
      home: 'الرئيسية',
      restaurants: 'المطاعم',
      orders: 'الطلبات',
      cart: 'السلة',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      favorites: 'المفضلة',
      offers: 'العروض',
    },
    restaurant: {
      distance: 'المسافة',
      rating: 'التقييم',
      cuisineType: 'نوع المطبخ',
      deliveryTime: 'وقت التوصيل',
      minOrder: 'الحد الأدنى للطلب',
      deliveryFee: 'رسوم التوصيل',
      featured: 'مميز',
      popular: 'شائع',
      topRated: 'الأعلى تقييماً',
      new: 'جديد',
      open: 'مفتوح',
      closed: 'مغلق',
      minutes: 'دقائق',
      menu: 'القائمة',
      reviews: 'التقييمات',
      information: 'معلومات',
      openingHours: 'ساعات العمل',
      address: 'العنوان',
      call: 'اتصال',
      directions: 'الاتجاهات',
      share: 'مشاركة',
    },
    food: {
      addToCart: 'إضافة إلى السلة',
      customize: 'تخصيص',
      ingredients: 'المكونات',
      allergies: 'الحساسية',
      nutritionInfo: 'معلومات غذائية',
      spicyLevel: 'مستوى الحرارة',
      vegetarian: 'نباتي',
      vegan: 'نباتي صرف',
      glutenFree: 'خالٍ من الغلوتين',
      popular: 'شائع',
      recommended: 'موصى به',
    },
    cart: {
      myCart: 'سلتي',
      subTotal: 'المجموع الفرعي',
      deliveryFee: 'رسوم التوصيل',
      tax: 'الضريبة',
      total: 'الإجمالي',
      checkout: 'إتمام الشراء',
      emptyCart: 'سلتك فارغة',
      continueToPayment: 'المتابعة للدفع',
      addMore: 'إضافة المزيد',
      applyCoupon: 'استخدام كوبون',
      couponCode: 'رمز الكوبون',
      apply: 'تطبيق',
    },
    order: {
      myOrders: 'طلباتي',
      orderDetails: 'تفاصيل الطلب',
      orderNumber: 'رقم الطلب',
      orderDate: 'تاريخ الطلب',
      orderStatus: 'حالة الطلب',
      orderTotal: 'إجمالي الطلب',
      trackOrder: 'تتبع الطلب',
      reorder: 'إعادة الطلب',
      cancelOrder: 'إلغاء الطلب',
      contactSupport: 'الاتصال بالدعم',
      deliveryAddress: 'عنوان التوصيل',
      paymentMethod: 'طريقة الدفع',
      estimatedDelivery: 'وقت التوصيل المتوقع',
      preparing: 'قيد التحضير',
      onTheWay: 'في الطريق',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي',
    },
    profile: {
      myProfile: 'ملفي الشخصي',
      personalInformation: 'المعلومات الشخصية',
      savedAddresses: 'العناوين المحفوظة',
      paymentMethods: 'طرق الدفع',
      notifications: 'الإشعارات',
      preferences: 'التفضيلات',
      helpSupport: 'المساعدة والدعم',
      termsConditions: 'الشروط والأحكام',
      privacyPolicy: 'سياسة الخصوصية',
      aboutUs: 'من نحن',
      contactUs: 'اتصل بنا',
      deleteAccount: 'حذف الحساب',
    }
  },
  
  // French translations
  fr: {
    common: {
      appName: 'FoodFusion',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier',
      language: 'Langue',
      theme: 'Thème',
      lightMode: 'Mode Clair',
      darkMode: 'Mode Sombre',
      seeAll: 'Voir Tout',
      viewMore: 'Voir Plus',
      goBack: 'Retour',
    },
    auth: {
      login: 'Connexion',
      signup: 'Inscription',
      logout: 'Déconnexion',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      resetPassword: 'Réinitialiser le mot de passe',
      name: 'Nom',
      phoneNumber: 'Numéro de téléphone',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      dontHaveAccount: 'Vous n\'avez pas de compte?',
    },
    navigation: {
      home: 'Accueil',
      restaurants: 'Restaurants',
      orders: 'Commandes',
      cart: 'Panier',
      profile: 'Profil',
      settings: 'Paramètres',
      favorites: 'Favoris',
      offers: 'Offres',
    },
    restaurant: {
      distance: 'Distance',
      rating: 'Évaluation',
      cuisineType: 'Type de cuisine',
      deliveryTime: 'Temps de livraison',
      minOrder: 'Commande minimum',
      deliveryFee: 'Frais de livraison',
      featured: 'En vedette',
      popular: 'Populaire',
      topRated: 'Mieux noté',
      new: 'Nouveau',
      open: 'Ouvert',
      closed: 'Fermé',
      minutes: 'minutes',
      menu: 'Menu',
      reviews: 'Avis',
      information: 'Informations',
      openingHours: 'Heures d\'ouverture',
      address: 'Adresse',
      call: 'Appeler',
      directions: 'Directions',
      share: 'Partager',
    },
    food: {
      addToCart: 'Ajouter au panier',
      customize: 'Personnaliser',
      ingredients: 'Ingrédients',
      allergies: 'Allergies',
      nutritionInfo: 'Informations nutritionnelles',
      spicyLevel: 'Niveau épicé',
      vegetarian: 'Végétarien',
      vegan: 'Végétalien',
      glutenFree: 'Sans gluten',
      popular: 'Populaire',
      recommended: 'Recommandé',
    },
    cart: {
      myCart: 'Mon panier',
      subTotal: 'Sous-total',
      deliveryFee: 'Frais de livraison',
      tax: 'Taxe',
      total: 'Total',
      checkout: 'Paiement',
      emptyCart: 'Votre panier est vide',
      continueToPayment: 'Continuer vers le paiement',
      addMore: 'Ajouter plus d\'articles',
      applyCoupon: 'Appliquer un coupon',
      couponCode: 'Code du coupon',
      apply: 'Appliquer',
    },
    order: {
      myOrders: 'Mes commandes',
      orderDetails: 'Détails de la commande',
      orderNumber: 'Numéro de commande',
      orderDate: 'Date de commande',
      orderStatus: 'Statut de la commande',
      orderTotal: 'Total de la commande',
      trackOrder: 'Suivre la commande',
      reorder: 'Commander à nouveau',
      cancelOrder: 'Annuler la commande',
      contactSupport: 'Contacter le support',
      deliveryAddress: 'Adresse de livraison',
      paymentMethod: 'Méthode de paiement',
      estimatedDelivery: 'Livraison estimée',
      preparing: 'En préparation',
      onTheWay: 'En chemin',
      delivered: 'Livré',
      cancelled: 'Annulé',
    },
    profile: {
      myProfile: 'Mon profil',
      personalInformation: 'Informations personnelles',
      savedAddresses: 'Adresses enregistrées',
      paymentMethods: 'Méthodes de paiement',
      notifications: 'Notifications',
      preferences: 'Préférences',
      helpSupport: 'Aide et support',
      termsConditions: 'Conditions générales',
      privacyPolicy: 'Politique de confidentialité',
      aboutUs: 'À propos de nous',
      contactUs: 'Contactez-nous',
      deleteAccount: 'Supprimer le compte',
    }
  }
};

// For debugging
console.log('translations loaded:', !!translations);
console.log('translations keys:', Object.keys(translations));

export default translations; 