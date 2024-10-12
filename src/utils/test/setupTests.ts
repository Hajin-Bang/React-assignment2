import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('firebase/auth', async () => {
  const actualAuth =
    await vi.importActual<typeof import('firebase/auth')>('firebase/auth');

  return {
    ...actualAuth,
    getAuth: () => ({
      signInWithEmailAndPassword: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChanged: vi.fn(),
      createUserWithEmailAndPassword: vi.fn(),
      updateProfile: vi.fn(),
      currentUser: {
        getIdToken: vi.fn(),
        uid: 'mocked-uid',
        email: 'test@example.com',
        displayName: '홍길동',
      },
    }),
  };
});

vi.mock('firebase/firestore', async () => {
  const actualFirestore =
    await vi.importActual<typeof import('firebase/firestore')>(
      'firebase/firestore'
    );

  return {
    ...actualFirestore,
    collection: vi.fn(),
    doc: vi.fn(),
    runTransaction: vi.fn(),
    serverTimestamp: vi.fn(() => 'mocked-timestamp'),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
  };
});

vi.mock('zustand');

vi.mock(import('js-cookie'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  };
});

vi.mock('@/firebase', async () => {
  const actualFirebase = await vi.importActual('@/firebase');
  return {
    ...actualFirebase,
    auth: require('firebase/auth'),
    db: {},
  };
});

vi.mock('@/lib/product/hooks/useFetchProducts', () => ({
  useFetchProducts: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
