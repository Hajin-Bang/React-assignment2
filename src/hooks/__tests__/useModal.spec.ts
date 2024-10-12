import { renderHook, act } from '@testing-library/react';
import { useModal } from '../useModal';

describe('useModal Hook', () => {
  it('호출 시 initialState 인자를 지정하지 않는 경우 isOpen 상태가 false로 설정된다.', () => {
    // Arrange: 초기 상태를 지정하지 않고 useModal 훅을 렌더링
    const { result } = renderHook(() => useModal());

    // Assert: isOpen 상태가 false인지 확인
  });

  it('호출 시 initialState 인자를 boolean 값으로 지정하는 경우 해당 값으로 isOpen 상태가 설정된다.', () => {
    // Arrange: initialState를 true로 설정하여 useModal 훅을 렌더링
    const { result } = renderHook(() => useModal(true));

    // Assert: isOpen 상태가 true인지 확인
  });

  it('toggleModal 함수를 호출하면 isOpen 상태가 토글된다.', () => {
    // Arrange: 초기 상태를 false로 설정하여 useModal 훅을 렌더링
    const { result } = renderHook(() => useModal());

    // Act: toggleModal 함수를 호출하여 isOpen 상태를 토글

    // Assert: isOpen 상태가 true로 변경되었는지 확인

    // Act: toggleModal 함수를 다시 호출하여 isOpen 상태를 다시 토글

    // Assert: isOpen 상태가 false로 변경되었는지 확인
  });

  it('openModal 함수를 호출하면 isOpen 상태가 true로 설정된다.', () => {
    // Arrange: 초기 상태를 false로 설정하여 useModal 훅을 렌더링
    const { result } = renderHook(() => useModal());

    // Act: openModal 함수를 호출하여 isOpen 상태를 true로 설정

    // Assert: isOpen 상태가 true로 변경되었는지 확인
  });

  it('closeModal 함수를 호출하면 isOpen 상태가 false로 설정된다.', () => {
    // Arrange: 초기 상태를 true로 설정하여 useModal 훅을 렌더링
    const { result } = renderHook(() => useModal(true));

    // Act: closeModal 함수를 호출하여 isOpen 상태를 false로 설정

    // Assert: isOpen 상태가 false로 변경되었는지 확인
  });
});
