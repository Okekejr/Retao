import { TranslationKeys } from "@/types";

const es: TranslationKeys = {
  home: {
    title: "Inicio",
    searchBar: "Buscar artículos, herramientas, equipos…",
    recently: "Recientemente listados cerca de ti",
    featured: "Destacados",
    location: "Listado en {{location}}",
    categories: "Categorías",
  },
  listedAll: {
    title: "Más de {{amount}} artículos",
  },
  listings: {
    title: "Articulos",
    listBtnTitle: "Lista un artículo",
    listBtnSubTitle: "Es rápido y fácil comenzar",
    listLimitTitle: "Límite de listados alcanzado",
    listLimitSubTitle: "Actualiza tu plan",
    myListings: "Mi Lista de Articulos",
    noListings: "No hay artículos listados aún",
    borrowedListings: "Prestados",
    requests: "Solicitudes",
    myPending: "Mis Solicitudes Pendientes",
    notLoggedIn: {
      title: "Aún no hay Articulos",
      subTitle:
        "Inicia sesión para crear articulos, editar, ver solicitudes y mucho más.",
    },
  },
  selectCategories: {
    title: "¿Qué tipo de artículo estás listando?",
  },
  btnTexts: {
    next: "Siguiente",
    accept: "Aceptar",
    reject: "Rechazar",
    cancel: "Cancelar",
    submit: "Enviar",
    update: "Actualizar",
    selectDate: "Seleccionar fecha de vencimiento",
    delete: "Eliminar",
    save: "Guardar",
    back: "Volver",
    login: "Iniciar sesión",
  },
  wishList: {
    title: "Lista de deseos",
    loadingText: "Cargando favoritos...",
    noFavs: "No hay artículos favoritos disponibles aún.",
    notLoggedIn: {
      title: "Inicia sesión para ver tus listas de deseos",
      subTitle:
        "Puedes ver y editar tu lista de deseos una vez que hayas iniciado sesión",
    },
  },
  messages: {
    title: "Mensajes",
    noMsgs: "No se encontraron conversaciones",
    searchMsg: "Intenta buscar por nombre.",
    notLoggedIn: {
      title: "Inicia sesión para ver mensajes",
      subTitle: "Puedes ver mensajes de personas en la comunidad.",
    },
    deleteAlert: {
      title: "Eliminar conversación",
      message: "¿Estás seguro de que deseas eliminar esta conversación?",
      cancel: "Cancelar",
      confirm: "Eliminar",
    },
  },
  profile: {
    title: "Perfil",
    cardJoined: "Uniste",
    cardBorrow: "Prestados",
    cardRating: "Calificación",
    accountSettings: "Configuración de la cuenta",
    history: "Historial",
    help: "Ayuda y Preguntas Frecuentes",
    privacyPolicy: "Política de Privacidad",
    termsOfUse: "Términos de Uso",
    support: "Contactar Soporte",
    logout: "Cerrar sesión",
    toasts: {
      invalidLink: {
        title: "Enlace inválido",
        message: "No se puede abrir este enlace",
      },
      emailError: {
        title: "No se puede abrir el correo",
        message:
          "No se encontró una aplicación de correo para enviar el correo",
      },
      refreshError: {
        title: "Error",
        message: "Error al actualizar el perfil",
      },
    },
    notLoggedIn: {
      title: "Administrar perfil",
      subTitle: "Inicia sesión para tener más control de tu experiencia.",
      btnText: "Iniciar sesión o registrarse",
      signup: "Regístrate",
    },
  },
  accountSettings: {
    personal: "Información personal",
    login: "Inicio de sesión y seguridad",
    subs: "Gestionar suscripciones",
    language: "Idioma",
    colorScheme: "Cambiar color",
  },
  loginsecurity: {
    passwordTitle: "Contraseña",
    passwordSubtitle: "Cambia tu contraseña",
    deactivateTitle: "Desactivar tu cuenta",
    deactivateSubTitle: "Esto no se puede deshacer",
    deactivating: "Desactivando...",
    deactivate: "Desactivar",
    confirmAlert: {
      title: "Confirmar",
      message: "No hay vuelta atrás, ¿estás seguro?",
      cancel: "Cancelar",
    },
    errors: {
      currentPasswordRequired: "Se requiere la contraseña actual",
      invalidNewPassword:
        "La contraseña debe tener al menos 6 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial",
      passwordsDoNotMatch: "Las contraseñas no coinciden",
    },
  },
  signUp: {
    currentPass: "Contraseña actual",
    newPass: "Nueva contraseña",
    confirmPass: "Confirmar nueva contraseña",
    update: "Actualizar contraseña",
    success: "¡Contraseña actualizada con éxito!",
    heading: "Crear una cuenta",
    button: "Registrarse",
    loginPrompt: "¿Ya tienes una cuenta? Inicia sesión",
    errors: {
      invalidEmail: "Formato de correo electrónico inválido.",
      invalidPassword:
        "La contraseña debe tener al menos 6 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial.",
      passwordsDoNotMatch: "Las contraseñas no coinciden.",
    },
  },
  helperText: {
    heading: "La contraseña debe incluir:",
    rules: [
      "Al menos 6 caracteres",
      "Letras mayúsculas y minúsculas",
      "Un número y un carácter especial",
    ],
  },
  userProfile: {
    name: "Nombre",
    email: "Correo electrónico",
    bio: "Biografía",
    location: "Ubicación",
    handle: "Usuario",
  },
  categories: {
    noItems: "No hay artículos disponibles en esta categoría aún.",
  },
  history: {
    title: "Actividades Pasadas",
    noHistory: "No hay actividades aún.",
  },
  item: {
    shared: "Compartido por",
    borrowers: "Historial de Prestamistas",
    noBorrowers: "No hay prestamistas aún.",
  },
  itemDetails: {
    edit: "Editar artículo",
    returned: "Marcar como Devuelto",
    request: "Solicitar Préstar",
    at: "a las",
    on: "el",
    dueBy: "Devolver antes de",
  },
  editListing: {
    title: "Título",
    header: "Edita tu publicación",
    subHeading: "Actualiza el título y la descripción de tu artículo.",
    descriptionTitle: "Descripción",
    descriptionError: "La descripción debe tener más de 5 palabras",
    imagesTitle: "Imágenes",
    available: "Disponible ahora",
    selectSchedule: "Seleccionar horario",
    currentLoc: "Usar ubicación actual",
    reqTitle: "El título es obligatorio.",
    reqDesc: "La descripción debe tener más de 5 palabras",
    edit: "Editar",
  },
  warnings: {
    titleDel: "Confirmar eliminación",
    descDel: "¿Estás seguro de que deseas eliminar esta publicación?",
  },
  alerts: {
    del: "Eliminado",
    delMsg: "Publicación eliminada exitosamente.",
  },
  listingForm: {
    header: "Crea tu publicación",
    subTitle:
      "Agrega un título claro y una descripción atractiva para generar interés.",
    titleRuleTitle: "El título debe tener",
    titleRules: ["Al menos 2 palabras"],
    description: "Descripción",
    descRuleTitle: "La descripción debe tener",
    descRules: ["Al menos 5 palabras"],
  },
  listingImgSelect: {
    text1: "Imagen demasiado grande",
    message: "Cada imagen debe pesar 5MB o menos.",
    heading: "Agrega fotos de tu artículo",
    subHeading:
      "Sube hasta 3 imágenes claras para que otros vean lo que compartes.",
    selectButton: "Seleccionar imágenes",
  },
  listingIntro: {
    heading: "¡Vamos a ayudarte a publicar tu artículo!",
    getStarted: "Comenzar",
    steps: {
      titleAndAdd: {
        title: "Escribe un Gran Título",
        desc: "Hazlo atractivo y claro con una descripción útil.",
      },
      images: {
        title: "Sube Hasta 3 Fotos",
        desc: "Muestra tu artículo desde diferentes ángulos para generar confianza.",
      },
      finish: {
        title: "Toques Finales y Publicar",
        desc: "Selecciona disponibilidad, revisa la información y publica tu artículo.",
      },
    },
  },
  listingReview: {
    toastLimitTitle: "Límite de publicaciones alcanzado",
    toastLimitMessage:
      "Solo puedes publicar hasta 5 artículos. Mejora tu cuenta para agregar más.",
    toastErrorTitle: "Error al crear la publicación",
    toastErrorMessage: "Algo salió mal.",
    heading: "Revisa tu publicación",
    subHeading:
      "Aquí está todo lo que proporcionaste. ¡Verifica todo y haz clic en enviar cuando estés listo!",
    labels: {
      title: "Título",
      description: "Descripción",
      category: "Categoría",
      availability: "Disponibilidad",
      location: "Ubicación",
    },
    submit: "Enviar",
    submitting: "Publicando...",
  },
  listingSelect: {
    heading: "¿Cuándo y dónde está disponible tu artículo?",
    subHeading:
      "Deja que otros sepan cuándo pueden pedirlo prestado y dónde encontrarlo. Establece un horario o márcalo como disponible ahora, y agrega una ubicación para recogerlo.",
    placeholder: "Ingresa tu ciudad, por ejemplo, Monterrey.",
  },
  listingSuccess: {
    heading: "🎉 ¡Publicación creada!",
    subHeading: "Tu artículo ahora está disponible para rentar o prestar.",
    finish: "Terminar",
  },
  login: {
    heading: "Inicia sesión en {{appName}}",
    subHeading: "Herramientas y servicios compartidos por la comunidad.",
    button: "Iniciar sesión",
    signupPrompt: "¿No tienes una cuenta? Regístrate",
    errors: {
      email: "Por favor, proporciona tu correo electrónico.",
      password: "Por favor, proporciona tu contraseña.",
    },
  },
  introScreen: {
    welcomeHeading: "Bienvenido a {{appName}}",
    welcomeSubheading:
      "Una app impulsada por la comunidad para prestar y pedir prestados artículos cotidianos: herramientas, equipo para acampar, muebles y más.",
    description:
      "En los próximos pasos, configurarás tu perfil para que otros puedan conectarse contigo. Solo te tomará un minuto.",
  },
  onboardingIntro: {
    nameHandle: {
      title: "Tu Nombre y Usuario",
      desc: "Usaremos esto para personalizar tu perfil y facilitar que otros te encuentren.",
    },
    avatar: {
      title: "Agrega una Foto Amigable",
      desc: "Una foto ayuda a que otros confíen en ti. ¡Puede ser una selfie o un avatar divertido!",
    },
    bioLocation: {
      title: "Comparte un Poco Sobre Ti",
      desc: "Dile a la comunidad quién eres y dónde vives. ¡Solo lo suficiente para conectar!",
    },
  },
  signupAvatar: {
    heading: "Agrega una foto de perfil",
    subHeading:
      "Una foto ayuda a que otros confíen en ti. ¡Puede ser una selfie o un avatar divertido!",
  },
  SignUpBioLoc: {
    heading: "Cuéntanos sobre ti",
    subHeading:
      "Dile a la comunidad quién eres y dónde vives. ¡Solo lo suficiente para conectar!",
    placeholders: {
      bio: "Aficionado al bricolaje. Me encanta compartir herramientas y equipo…",
      location: "Ingresa tu ciudad",
    },
    errors: {
      emptyBio: "La biografía no puede estar vacía.",
      emptyLocation: "Debes agregar tu ubicación",
    },
  },
  signUpForm: {
    heading: "Tu Nombre y Usuario",
    subHeading:
      "Usaremos esto para personalizar tu perfil y facilitar que otros te encuentren.",
    errors: {
      name: "Por favor ingresa tu nombre completo (ej. Juan Pérez)",
      handleFormat: "El usuario debe comenzar con @ y no contener espacios",
      handleTaken: "Este usuario ya está en uso.",
    },
  },
  signupReview: {
    heading: "🎉 ¡Todo Listo!",
    subHeading:
      "Dale un vistazo rápido y asegúrate de que todo esté bien antes de continuar.",
  },
  searchModal: {
    heading: "Buscar Listados",
    loading: "Cargando resultados...",
    empty: {
      title: "Sin resultados aún",
      subtitle: "Comienza buscando un listado.",
    },
    placeholder: "Buscar artículos",
  },
  plans: {
    header: "Elige tu plan",
  },
  logout: {
    confirmTitle: "Confirmar",
    confirmMessage: "Estás por cerrar sesión, ¿estás seguro?",
    cancel: "Cancelar",
    signOut: "Cerrar sesión",
  },
  subscription: {
    toast: {
      purchaseFailed: {
        title: "Compra fallida",
        message: "{{error}}",
      },
      restored: {
        title: "Restaurado",
        message: "Tus compras han sido restauradas.",
      },
      restoreFailed: {
        title: "Restauración fallida",
        message: "No se pudieron restaurar las compras.",
      },
      subscriptionActive: {
        title: "Suscripción activa",
        message: "Ahora estás en el plan {{planId}}",
      },
      validationFailed: {
        title: "Validación fallida",
        message: "Plan no reconocido.",
      },
      validationError: {
        title: "Error de validación",
        message: "Ocurrió un error al validar tu compra.",
      },
    },
    restorePurchases: "Restaurar compras",
    currentPlan: "Plan actual",
    subscribe: "Suscribirse",
  },
};

export default es;
