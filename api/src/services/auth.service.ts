import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from '../firebase';

interface SignUpData {
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}
class FirebaseAuthService {
  async signUp({ email, password }: SignUpData): Promise<string> {
    if (!email || !password) {
      throw new Error('Email and Password are required');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);

      return 'Verification email sent! User created successfully!';
    } catch {
      throw new Error('An error occurred while registering user');
    }
  }

  async signIn({
    email,
    password,
  }: SignInData): Promise<{ message: string; idToken: string }> {
    if (!email || !password) {
      throw new Error('Email and Password are required');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();

      return { message: 'User logged in successfully', idToken };
    } catch {
      throw new Error('An error occurred while logging in');
    }
  }
}

export default new FirebaseAuthService();
