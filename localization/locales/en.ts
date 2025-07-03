import { TranslationKeys } from "@/types";

const en: TranslationKeys = {
  home: {
    title: "Home",
    searchBar: "Search items, tools, equipment…",
    recently: "Recently Listed Near You",
    featured: "Featured",
    location: "Listed in {{location}}",
    categories: "Categories",
  },
  listedAll: {
    title: "Over {{amount}} items",
  },
  listings: {
    title: "Listings",
    listBtnTitle: "List an item",
    listBtnSubTitle: "Its fast and easy to get started",
    listLimitTitle: "Listing limit reached",
    listLimitSubTitle: "Upgrade your plan",
    myListings: "My Listings",
    noListings: "No listed items yet",
    borrowedListings: "Borrowed",
    requests: "Requests",
    myPending: "My Pending Requests",
    notLoggedIn: {
      title: "No Listings yet",
      subTitle: "Login to create listings, edit, view request and many more.",
    },
  },
  selectCategories: {
    title: "What type of item are you listing?",
  },
  btnTexts: {
    next: "Next",
    accept: "Accept",
    reject: "Reject",
    cancel: "Cancel",
    submit: "Submit",
    update: "Update",
    selectDate: "Select Due Date",
    delete: "Delete",
    back: "Back",
    save: "Save",
    login: "Log in",
  },
  wishList: {
    title: "Wishlist",
    loadingText: "Loading favorites...",
    noFavs: "No favorited items available yet.",
    notLoggedIn: {
      title: "Log in to view your wishlists",
      subTitle: "You can view and edit your wishlist once you have logged in",
    },
  },
  messages: {
    title: "Messages",
    noMsgs: "No conversations found",
    searchMsg: "Try searching by name.",
    notLoggedIn: {
      title: "Log in to see messages",
      subTitle: "You can view messages from people in the community.",
    },
  },
  profile: {
    title: "Profile",
    cardJoined: "Joined",
    cardBorrow: "Borrowing",
    cardRating: "Rating",
    accountSettings: "Account Settings",
    history: "History",
    help: "Help & FAQs",
    support: "Contact Support",
    logout: "Log Out",
    toasts: {
      invalidLink: {
        title: "Link invalid",
        message: "Can't open this link",
      },
      emailError: {
        title: "Cant open Email",
        message: "No email app found to send the email",
      },
      refreshError: {
        title: "Error",
        message: "Error refreshing profile",
      },
    },
    notLoggedIn: {
      title: "Manage profile",
      subTitle: "Login to take more control of your experience.",
      btnText: "Log in or sign up",
      signup: "Sign up",
    },
  },
  accountSettings: {
    personal: "Personal information",
    login: "Login & Security",
    subs: "Manage Subscriptions",
    language: "Language",
    colorScheme: "Color Scheme",
  },
  loginsecurity: {
    passwordTitle: "Password",
    passwordSubtitle: "Change your password",
    deactivateTitle: "Deactivate your account",
    deactivateSubTitle: "This cannot be undone",
    deactivating: "Deactivating..",
    deactivate: "Deactivate",
    confirmAlert: {
      title: "Confirm",
      message: "There's no going back, Are you sure?",
      cancel: "Cancel",
    },
    errors: {
      currentPasswordRequired: "Current password is required",
      invalidNewPassword:
        "Password must be at least 6 characters, include uppercase, lowercase, a number and a special character",
      passwordsDoNotMatch: "Passwords do not match",
    },
  },
  signUp: {
    currentPass: "Current password",
    newPass: "New password",
    confirmPass: "Confirm New Password",
    update: "Update Password",
    success: "Password updated successfully!",
    heading: "Create an account",
    button: "Sign Up",
    loginPrompt: "Have an account? Log in",
    errors: {
      invalidEmail: "Invalid email format.",
      invalidPassword:
        "Password must be at least 6 characters long, include uppercase, lowercase, a number, and a special character.",
      passwordsDoNotMatch: "Passwords do not match.",
    },
  },
  helperText: {
    heading: "Password must include:",
    rules: [
      "At least 6 characters",
      "Uppercase and lowercase letters",
      "A number and a special character",
    ],
  },
  userProfile: {
    name: "Name",
    email: "Email",
    bio: "Bio",
    location: "Location",
    handle: "Handle",
  },
  categories: {
    noItems: "No items available in this category yet.",
  },
  history: {
    title: "Past Activities",
    noHistory: "No activities yet.",
  },
  item: {
    shared: "Shared by",
    borrowers: "Borrowers History",
    noBorrowers: "No borrowers yet.",
  },
  itemDetails: {
    edit: "Edit Listing",
    returned: "Mark as Returned",
    request: "Request to Borrow",
    at: "at",
    on: "on",
    dueBy: "DUE by",
  },
  editListing: {
    title: "Title",
    header: "Edit Your Listing",
    subHeading: "Update the title and description of your item.",
    descriptionTitle: "Description",
    descriptionError: "Description must be more than 5 words long",
    imagesTitle: "Images",
    available: "Available Now",
    selectSchedule: "Select Schedule",
    currentLoc: "Use Current Location",
    reqTitle: "Title is required.",
    reqDesc: "Description must be more than 5 words long",
    edit: "Edit",
  },
  warnings: {
    titleDel: "Confirm Delete",
    descDel: "Are you sure you want to delete this listing?",
  },
  alerts: {
    del: "Deleted",
    delMsg: "Listing successfully removed.",
  },
  listingForm: {
    header: "Create Your Listing",
    subTitle:
      "Add a clear title and a compelling description to attract interest.",
    titleRuleTitle: "Title must be",
    titleRules: ["At least 2 words"],
    description: "Description",
    descRuleTitle: "Description must be",
    descRules: ["At least 5 words"],
  },
  listingImgSelect: {
    text1: "Image too large",
    message: "Each image must be 5MB or smaller.",
    heading: "Add Photos of Your Item",
    subHeading:
      "Upload up to 3 clear images to help others see what you’re sharing.",
    selectButton: "Select Images",
  },
  listingIntro: {
    heading: "Let’s help you list your item!",
    getStarted: "Get Started",
    steps: {
      titleAndAdd: {
        title: "Write a Great Title",
        desc: "Make it catchy and clear with a helpful description.",
      },
      images: {
        title: "Upload Up to 3 Photos",
        desc: "Show your item from different angles to build trust.",
      },
      finish: {
        title: "Finishing Touches & Publish",
        desc: "Pick availability, review info, and list your item.",
      },
    },
  },
  listingReview: {
    toastLimitTitle: "Listing limit reached",
    toastLimitMessage: "You can only list up to 5 items. Upgrade to add more.",
    toastErrorTitle: "Failed to create listing",
    toastErrorMessage: "Something went wrong.",
    heading: "Review Your Listing",
    subHeading:
      "Here's everything you provided. Double-check and hit submit when you're ready!",
    labels: {
      title: "Title",
      description: "Description",
      category: "Category",
      availability: "Availability",
      location: "Location",
    },
    submit: "Submit",
    submitting: "Listing...",
  },
  listingSelect: {
    heading: "When and Where is Your Item Available?",
    subHeading:
      "Let others know when they can borrow it and where to find it. Set a schedule or mark it as available now, and add a pickup location.",
    placeholder: "Enter your city e.g Monterrey",
  },
  listingSuccess: {
    heading: "🎉 Listing Created!",
    subHeading: "Your item is now available for renting or lending.",
    finish: "Finish",
  },
  login: {
    heading: "Log in to {{appName}}",
    subHeading: "Tools and services, shared by the community.",
    button: "Log in",
    signupPrompt: "Don't have an account? Sign up",
    errors: {
      email: "Please provide your email.",
      password: "Please provide your password.",
    },
  },
  introScreen: {
    welcomeHeading: "Welcome to {{appName}}",
    welcomeSubheading:
      "A community-powered app for lending and borrowing everyday items — tools, camping gear, furniture and more.",
    description:
      "In the next few steps, you’ll set up your profile so others can connect with you. It only takes a minute.",
  },
  onboardingIntro: {
    nameHandle: {
      title: "Your Name & Handle",
      desc: "We’ll use this to personalize your profile and make it easier for others to find you.",
    },
    avatar: {
      title: "Add a Friendly Photo",
      desc: "A picture helps others trust you. It can be a selfie or a fun avatar!",
    },
    bioLocation: {
      title: "Share a Little About You",
      desc: "Tell the community who you are and where you're based. Just enough to connect!",
    },
  },
  signupAvatar: {
    heading: "Add a profile photo",
    subHeading:
      "A picture helps others trust you. It can be a selfie or a fun avatar!",
  },
  SignUpBioLoc: {
    heading: "Tell us about yourself",
    subHeading:
      "Tell the community who you are and where you're based. Just enough to connect!",
    placeholders: {
      bio: "DIY enthusiast. I love sharing tools and gear…",
      location: "Enter your city",
    },
    errors: {
      emptyBio: "Bio can't be empty.",
      emptyLocation: "Must add location",
    },
  },
  signUpForm: {
    heading: "Your Name & Handle",
    subHeading:
      "We’ll use this to personalize your profile and make it easier for others to find you.",
    errors: {
      name: "Please enter your full name (e.g. John Doe)",
      handleFormat: "Handle must start with @ and contain no spaces",
      handleTaken: "This handle is already taken.",
    },
  },
  signupReview: {
    heading: "🎉 All Set!",
    subHeading:
      "Take a quick look and make sure everything looks good before you continue.",
  },
  searchModal: {
    heading: "Search Listings",
    loading: "Loading results...",
    empty: {
      title: "No results yet",
      subtitle: "Start by searching for a listing.",
    },
    placeholder: "Search for items",
  },
  plans: {
    header: "Choose Your Plan",
  },
  logout: {
    confirmTitle: "Confirm",
    confirmMessage: "You are signing out, Are you sure?",
    cancel: "Cancel",
    signOut: "Sign Out",
  },
};

export default en;
