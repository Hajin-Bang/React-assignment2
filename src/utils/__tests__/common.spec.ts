import { debounce, pick } from '../common';

describe('pick 유틸리티 단위 테스트', () => {
  /**
   * 테스트 케이스: 단일 키 선택
   * 설명: `pick` 함수가 단일 키를 받아 해당 키와 값을 포함하는 새 객체를 반환하는지 확인합니다.
   */
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    // Arrange: 테스트할 객체 정의
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    // Act: `pick` 함수 호출

    // Assert: 결과가 예상한 객체와 일치하는지 확인
  });

  /**
   * 테스트 케이스: 다중 키 선택
   * 설명: `pick` 함수가 여러 키를 받아 해당 키들과 값을 포함하는 새 객체를 반환하는지 확인합니다.
   */
  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    // Arrange: 테스트할 객체 정의
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    // Act: `pick` 함수 호출

    // Assert: 결과가 예상한 객체와 일치하는지 확인
  });

  /**
   * 테스트 케이스: 키를 지정하지 않았을 때
   * 설명: `pick` 함수에 키를 지정하지 않으면 빈 객체를 반환하는지 확인합니다.
   */
  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    // Arrange: 테스트할 객체 정의
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    // Act: `pick` 함수 호출 (키 미지정)

    // Assert: 결과가 빈 객체인지 확인
  });

  /**
   * 테스트 케이스: 존재하지 않는 키 선택
   * 설명: `pick` 함수가 객체에 존재하지 않는 키를 선택할 경우 에러를 던지는지 확인합니다.
   */
  it('존재하지 않는 키를 선택하면 에러가 발생한다', () => {
    // Arrange: 테스트할 객체 정의
    const obj = {
      a: 'A',
      b: 'B',
    };

    // Act & Assert: `pick` 함수 호출 시 에러가 발생하는지 확인
  });
});

describe('debounce 유틸리티 단위 테스트', () => {
  // Vitest의 가짜 타이머를 사용하여 시간 기반 동작을 제어합니다.
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * 테스트 케이스: 지정된 시간이 지난 후 함수 호출
   * 설명: debounce 함수가 지정된 딜레이 시간이 지난 후에만 원본 함수를 호출하는지 확인합니다.
   */
  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    // Arrange: 스파이 함수와 debounce 함수 생성
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);

    // Act: debounce 함수 호출 및 시간 진행

    // Assert: 스파이 함수가 호출되었는지 확인
  });

  /**
   * 테스트 케이스: 연이어 호출 시 마지막 호출 기준으로만 함수 호출
   * 설명: debounce 함수가 여러 번 연이어 호출되더라도 마지막 호출 후에만 원본 함수를 호출하는지 확인합니다.
   */
  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    // Arrange: 스파이 함수와 debounce 함수 생성
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);

    // Act: debounce 함수 여러 번 호출 및 시간 진행
    debouncedFn(); // 호출 1

    debouncedFn(); // 호출 2

    debouncedFn(); // 호출 3

    debouncedFn(); // 호출 4

    // Assert: 스파이 함수가 단 한 번만 호출되었는지 확인
  });

  /**
   * 테스트 케이스: 지정된 시간 전에 함수가 호출되지 않는다
   * 설명: debounce 함수가 딜레이 시간이 지나기 전에 원본 함수를 호출하지 않는지 확인합니다.
   */
  it('지정된 시간 전에 함수가 호출되지 않는다.', () => {
    // Arrange: 스파이 함수와 debounce 함수 생성
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);

    // Act: debounce 함수 호출 및 시간 일부 진행

    // Assert: 스파이 함수가 아직 호출되지 않았는지 확인
  });
});
